from ..database import get_conn
from ...schemas import expense

def create_expense(expense):

    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (title, amount, category_id)
        VALUES (?, ?, ?)
""", (
        expense['title'],
        expense['amount'],
        expense['category_id'],
))
    
    conn.commit()
    
    expense_id = cursor.lastrowid

    conn.close()

    return expense_id

def get_xpenses():
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, title, amount, category, expense_date FROM expenses LIMIT 10;
""")
    
    rows = cursor.fetchall()    
    
    conn.close()

    return rows
    
def get_xpense(id: int):
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses WHERE id = ?;", (id,))

    row = cursor.fetchone()

    conn.close()

    return dict(row) if row else None

def patch_xpense(id: int, title: str | None = None, amount: float | None = None, category_id: int | None = None):
    conn = get_conn()
    cursor = conn.cursor()

    query = """
        UPDATE expenses
        SET 
            title = COALESCE(?, title),
            amount = COALESCE(?, amount),
            category = COALESCE(?, category_id)
        WHERE id = ?;
"""

    cursor.execute(query, (title, amount, category_id, id))
    conn.commit()

    cursor.execute("SELECT * FROM expenses WHERE id = ?;", (id,))
    updated_row = cursor.fetchone()

    conn.close()

    return dict(updated_row) if updated_row else None