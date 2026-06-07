from ..schemas import expense as e
from fastapi import APIRouter, HTTPException
from ..database.queries import db
from typing import Any


router = APIRouter()

@router.post("/expenses", response_model=e.Expense)
async def add_expense(expense_input: e.ExpenseCreate):
    new_expense = expense_input.model_dump()
    expense_id = db.create_expense(new_expense)

    return {
        "id": expense_id,
        **new_expense
    }

@router.get("/expenses")
async def get_all_expenses():
    data = db.get_xpenses()

    if not data:
        raise HTTPException(status_code=404, detail="No expense record found")
    return data

@router.get("/expenses/{expense_id}", response_model=e.Expense)
async def get_xpense(expense_id: int):
    data = db.get_xpense(expense_id)
    
    if data is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return data
    
@router.patch("expenses/{expense_id}", response_model=e.Expense)
async def patch_expense(expense_id: int, input_expense: e.ExpenseUpdate):
    pass