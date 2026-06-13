from pydantic import BaseModel
from datetime import date

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category_id: int
    user_id: int
    expense_date: date

class ExpenseUpdate(BaseModel):
    title: str | None = None
    amount: float | None = None
    category_id: int | None = None

class Expense(ExpenseCreate):
    id: int

    