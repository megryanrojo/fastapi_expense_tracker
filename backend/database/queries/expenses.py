from database.database import get_conn

def create_expense(expense):
    conn = get_conn()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (title, amount, category, expense_date)
        VALUES (?, ?, ?, ?, ?)
""", (
        expense['title'],
        expense['amount'],
        expense['category'],
        expense['expense_date']
))
    
    conn.commit()
    
    expense_id = cursor.lastrowid

    conn.close()

    return expense_id