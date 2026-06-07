from pydantic import BaseModel
from datetime import date

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    expense_date: date

class ExpenseUpdate(BaseModel):
    title: str | None = None
    amount: float | None = None
    category: str | None = None

class Expense(ExpenseCreate):
    id: int
