from ..database import get_conn

def expense_cash_flow(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT 
                strftime('%Y-%m', e.expense_date) AS month,
                SUM(e.amount) AS total_amount
            FROM expenses e
            WHERE e.user_id = ?
            GROUP BY month
            ORDER BY month ASC;
        """

        rows = cursor.execute(query, (user_id,))
        
        return [dict(row) for row in rows]

    finally:
        conn.close()

def income_cash_flow(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT 
                strftime('%Y-%m', i.date_created) AS month,
                SUM(i.amount) AS total_amount
            FROM income i
            WHERE i.user_id = ?
            GROUP BY month
            ORDER BY month ASC;
        """

        rows = cursor.execute(query, (user_id,))
        
        return [dict(row) for row in rows]

    finally:
        conn.close()