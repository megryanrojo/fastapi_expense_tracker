from ..database import get_conn
from ...schemas import user


def new_user(user):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = "INSERT INTO users (name, password, date_created) VALUES (?, ?, ?);"
        params = (
            user['name'],
            user['password'],
            user['date_created'],
        )

        cursor.execute(query, params)
        conn.commit()
    
        user_id = cursor.lastrowid
        return user_id
    finally:
        conn.close()

def get_users():
    conn = get_conn()

    try:
        cursor = conn.cursor()
        query = "SELECT * FROM users;"
        cursor.execute(query)
        
        rows = cursor.fetchall()
        return rows

    finally:
        conn.close()

def get_user(user_id: int):
    conn = get_conn()

    try:
        cursor = conn.cursor()
        query = "SELECT * FROM users WHERE user_id = ?;"

        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        return user

    finally:
        conn.close()

def patch_user(user_id: int, name: str | None = None, password: str | None = None):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
        UPDATE users
        SET
            name = COALESCE(?, name),
            password = COALESCE(?, password)
        WHERE user_id = ?;
        """

        cursor.execute(query, (name, password, user_id))
        cursor.commit()

        cursor.execute("SELECT * FROM users WHERE user_id =?;", (user_id,))
        return cursor.fetchone()
        
    finally:
        conn.close()