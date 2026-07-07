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
        