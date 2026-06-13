from database import get_conn

conn = get_conn()
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS category(
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL               
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    expense_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created DATE DEFAULT CURRENT_DATE
)
""")

query = "INSERT INTO category (name) VALUES (?);"

default_categories = [
    ("Entertainment",),
    ("Groceries",),
    ("Fast Food",),
    ("Rent",),
    ("Transport",),
    ("Gas",)
]

cursor.executemany(query, default_categories)

conn.commit()
conn.close()