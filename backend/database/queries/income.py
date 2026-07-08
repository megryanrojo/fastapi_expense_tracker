from ..database import get_conn
from ...schemas import income
from typing import Optional

def create_income(data: income.IncomeCreate):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            INSERT INTO income(title, amount, date_created, user_id, id)
            VALUES(?, ?, ?, ?, ?)
        """

        params = [
            data['title'],
            data['amount'],
            data['date_created'],
            data['user_id'],
            data['id']
        ]
        
        cursor.execute(query, tuple(params))
        conn.commit()

    finally:
        conn.close()
        
def get_all_income(
    user_id: int, 
    minAmount: Optional[float] = None,
    maxAmount: Optional[float] = None,
    startDate: Optional[str] = None,
    endDate: Optional[str] = None 
    ):

    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT 
                income.id,
                income.title,
                income.amount,
                income.date_created
            FROM income
            WHERE income.user_id = ?
        """

        params = [user_id]

        if minAmount is not None:
            query += " AND income.amount >= ?"
            params.append(minAmount)

        if maxAmount is not None:
            query += " AND income.amount <= ?"
            params.append(maxAmount)

        if startDate is not None:
            query += " AND income.date_created >= ?"
            params.append(startDate)

        if endDate is not None:
            query += " AND income.date_created <= ?"
            params.append(endDate)

        query += " LIMIT 20;"

        cursor.execute(query, tuple(params))
        rows = cursor.fetchall()

        return [dict(row) for row in rows]

    finally:
        conn.close()