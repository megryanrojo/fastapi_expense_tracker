from ..database import get_conn
from ...schemas import expense
from typing import Optional

def create_expense(expense: expense.ExpenseCreate):

    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (title, amount, category_id, user_id)
        VALUES (?, ?, ?, ?)
    """, (
        expense['title'],
        expense['amount'],
        expense['category_id'],
        expense['user_id']
    ))
    
    conn.commit()
    
    expense_id = cursor.lastrowid

    conn.close()

    return expense_id

def get_xpenses(
        user_id: int, 
        min_amount: Optional[int]=None, 
        max_amount: Optional[int]=None, 
        category: Optional[str]=None, 
        start_date: Optional[str]=None, 
        end_date: Optional[str]=None
        ):
    
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT 
                expenses.id, 
                expenses.title,
                expenses.amount, 
                expenses.expense_date,
                category.name AS category_name
            FROM expenses
            JOIN category ON expenses.category_id = category.category_id
            WHERE expenses.user_id = ?
        """

        params = [user_id]

        if min_amount is not None:
            query += " AND expenses.amount >= ?"
            params.append(min_amount)

        if max_amount is not None:
            query += " AND expenses.amount <= ?"
            params.append(max_amount)

        if category is not None:
            query += " AND category.name = ?"
            params.append(category)

        if start_date is not None:
            query += " AND expenses.expense_date >= ?"
            params.append(start_date)

        if end_date is not None:
            query += " AND expenses.expense_date <= ?"
            params.append(start_date)

        query += " LIMIT 10;"

        cursor.execute(query, tuple(params))
        rows = cursor.fetchall()

        return [dict(row) for row in rows]
    
    finally:
        conn.close()

#TODO Filter and Query params!

def get_xpense_category(user_id: int, expense_category: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()
        
        query = """
            SELECT
                expenses.id,
                expenses.title,
                expenses.amount,
                category.name AS category_name
            FROM expenses
            JOIN category ON expenses.category_id = category.category_id
            WHERE expenses.user_id = ? AND expenses.category_id = ?
            LIMIT 10;
        """
        params = (user_id, expense_category)

        cursor.execute(query, params)
        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    finally:
        conn.close()

def get_expense_min(user_id: int, min_amount: float):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT 
                expenses.id,
                expenses.title,
                expenses.amount,
                category.name as category_name
            FROM expenses
            JOIN category ON expenses.category_id = category.category_id
            WHERE expenses.user_id = ?
            ORDER BY expenses.amount ASC
            LIMIT 10;
        """

        cursor.execute(query, (user_id,))

        rows = cursor.fetchall()

        return [dict(row) for row in rows]
    
    finally:
        conn.close()

def get_xpense(expense_id: int, user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                expenses.id,
                expenses.title,
                expenses.amount, 
                expenses.expense_date,
                category.name AS category_name,
                users.name AS user_name
            FROM expenses
            JOIN category ON expenses.category_id = category.category_id
            JOIN users ON expenses.user_id = users.user_id
            WHERE expenses.id = ? AND expenses.user_id = ?;
        """, (expense_id, user_id))

        row = cursor.fetchone()
        return dict(row) if row else None
        
    finally:
        conn.close()

def patch_xpense(id: int, user_id: int, title: str | None = None, amount: float | None = None, category_id: int | None = None):
    conn = get_conn()
    cursor = conn.cursor()

    query = """
        UPDATE expenses
        SET 
            title = COALESCE(?, title),
            amount = COALESCE(?, amount),
            category_id = COALESCE(?, category_id)
        WHERE id = ? 
            AND user_id = (SELECT user_id FROM users WHERE user_id = ?);
    """

    cursor.execute(query, (title, amount, category_id, id, user_id))
    conn.commit()

    cursor.execute("SELECT * FROM expenses WHERE id = ?;", (id,))
    updated_row = cursor.fetchone()

    conn.close()

    return dict(updated_row) if updated_row else None

def delete_xpense(id: int):
    conn = get_conn()
    cursor = conn.cursor()

    query = """
        DELETE FROM expenses WHERE id = ?;
"""

    cursor.execute(query, (id))

    conn.commit()
    conn.close()
