from ..database import get_conn
from ...schemas import expense

def create_expense(expense):

    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (title, amount, category)
        VALUES (?, ?, ?)
""", (
        expense['title'],
        expense['amount'],
        expense['category'],
))
    
    conn.commit()
    
    expense_id = cursor.lastrowid

    conn.close()

    return expense_id

def get_xpenses():
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, title, amount, category, expense_date FROM expenses LIMIT 10;
""")
    
    rows = cursor.fetchall()    
    
    conn.close()

    return rows
    
def get_xpense(id: int):
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses WHERE id = ?;", (id,))

    row = cursor.fetchone()

    conn.close()

    return dict(row) if row else None