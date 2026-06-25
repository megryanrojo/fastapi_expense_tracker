from pydantic import BaseModel
from decimal import Decimal
from datetime import date

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category_id: int
    user_id: int
    expense_date: date

class get_Expense(BaseModel):
    id: int
    title: str
    amount: float
    expense_date: date
    category_name: str
    user_name: str
    

class ExpenseUpdate(BaseModel):
    title: str | None = None
    amount: float | None = None
    category_id: int | None = None

class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: Decimal 
    expense_date: date   
    category_name: str    

    class Config:
        from_attributes = True

class Expense(ExpenseCreate):
    id: int

    