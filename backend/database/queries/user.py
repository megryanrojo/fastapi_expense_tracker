from ..database import get_conn
from ...schemas import user
import bcrypt


def new_user(user_input: user.userCreate):
    conn = get_conn()

    try:
        cursor = conn.cursor()

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user_input.password.encode('utf-8'), salt)

        query = "INSERT INTO users (name, password, date_created) VALUES (?, ?, ?);"
        params = (
            user_input.name,
            hashed_password,
            user_input.date_created,
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
        conn.commit()

        cursor.execute("SELECT * FROM users WHERE user_id =?;", (user_id,))
        return cursor.fetchone()
        
    finally:
        conn.close()