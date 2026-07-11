from ..database import get_conn

def get_net_balance(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT  (
                (SELECT COALESCE(SUM(amount), 0) FROM income WHERE user_id = ?) - 
                (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE user_id = ?)
            ) AS net_balance;
        """

        cursor.execute(query, (user_id, user_id,))

        row = cursor.fetchone()

        return row["net_balance"] or 0

    finally:
        conn.close()