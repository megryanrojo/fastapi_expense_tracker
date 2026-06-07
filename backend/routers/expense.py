from ..schemas import expense as e
from fastapi import APIRouter, HTTPException
from ..database import create_expense
from ..database import get_xpenses
from typing import List

router = APIRouter()

@router.post("/expenses", response_model=e.Expense)
async def add_expense(expense_input: e.ExpenseCreate):
    new_expense = expense_input.model_dump()
    expense_id = create_expense(new_expense)

    return {
        "id": expense_id,
        **new_expense
    }

@router.get("/expenses")
async def get_all_expenses():
    data = get_xpenses()

    if not data:
        raise HTTPException(status_code=404, detail="No expense record found")
    return data