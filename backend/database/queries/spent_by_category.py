from ..database import get_conn

def get_total_spent_by_category():
    conn = get_conn()

    try:
        cursor = conn.cursor()

        query = """
            
        """

    finally:  
        conn.close()