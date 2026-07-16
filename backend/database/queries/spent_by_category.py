from ..database import get_conn

def get_total_spent_by_category(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
        SELECT
            c.name,
                COALESCE(SUM(e.amount), 0) AS total_amount
            FROM expenses e
            INNER JOIN category c ON e.category_id = c.category_id
            WHERE e.user_id = ?
            GROUP BY c.name;
        """

        cursor.execute(query, (user_id,))

        rows = cursor.fetchall()

        return rows

    finally:  
        conn.close()

