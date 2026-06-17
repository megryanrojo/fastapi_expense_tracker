from ..database import get_conn

def login_user(name: str, password: str):
    conn = get_conn()

    try: 
        cursor = conn.cursor()

        query = """
            SELECT user_id, name, password
            FROM users
            WHERE name = ?;
        """

        cursor.execute(query, (name,))
        user_record = cursor.fetchone()

        if not user_record:
            return None
        
        return {
            "id": user_record['user_id'],
            "name": user_record['name']
        }


    finally:
        conn.close()