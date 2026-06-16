from ..database import get_conn
from ...schemas import auth

def login_user(name: str, password: str):
    conn = get_conn()

    try: 
        cursor = conn.cursor()

        query = """
            SELECT user_id, name
            FROM users
            WHERE name = ?
            AND password = ?;
        """

        param = (
            name,
            password,
        )

        cursor.execute(query, param)

        return cursor.fetchone()

    finally:
        conn.close()