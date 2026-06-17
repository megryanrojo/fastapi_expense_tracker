from ..database import get_conn
import bcrypt

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
        user_record = cursor.fetchone()

        if not user_record:
            return None
        
        stored_hashed_password = user_record['password']

        is_password_correct = bcrypt.checkpw(
            password.encode('utf-8'),
            stored_hashed_password.encode('utf-8')
        )

    finally:
        conn.close()