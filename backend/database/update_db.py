from database import get_conn

conn = get_conn()
cursor = conn.cursor()

query = """
    CREATE TABLE IF NOT EXISTS income(
        income_id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        date_created DATE DEFAULT CURRENT_DATE,
        user_id INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )
"""

cursor.execute(query)

conn.commit()
conn.close()