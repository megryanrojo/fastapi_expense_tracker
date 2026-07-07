from pydantic import BaseModel
from decimal import Decimal
from datetime import date

class IncomeCreate(BaseModel):
    title: str
    amount: float
    date_created: date
    user_id: int

class Income(IncomeCreate):
    id: int
    