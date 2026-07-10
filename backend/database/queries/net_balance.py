from ..database import get_conn

def get_net_balance(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            SELECT
                e.amount AS expense_amount,
                i.amount AS income_amount,
                (i.amount - e.amount) AS net_balance
            FROM income AS i
            INNER JOIN expenses AS e ON i.user_id = e.user_id
            WHERE i.user_id = ?
        """

        cursor.execute(query, (user_id,))

        row = cursor.fetchone()

        return row["net_balance"] or 0

    finally:
        conn.close()