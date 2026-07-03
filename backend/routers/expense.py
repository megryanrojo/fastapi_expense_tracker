from ..schemas import expense as e
from fastapi import APIRouter, HTTPException, Depends
from ..database.queries import db_expenses
from ..core.dependencies import get_current_user
from typing import Optional


router = APIRouter()

@router.post("/expenses", response_model=e.Expense)
async def add_expense(expense_input: e.ExpenseCreate, user=Depends(get_current_user)):
    new_expense = expense_input.model_dump()
    new_expense["user_id"] = user["user_id"]
    expense_id = db_expenses.create_expense(new_expense)

    return {
        "id": expense_id,
        **new_expense
    }

@router.get("/expenses")
async def get_all_expenses(
    user=Depends(get_current_user),
    min_amount: Optional[float] = None,
    max_amount: Optional[float] = None,
    category: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
    ):
    
    user_id = user["user_id"]
    data = db_expenses.get_xpenses(user_id, min_amount, max_amount, category, start_date, end_date)

    if not data:
        raise HTTPException(status_code=404, detail="No expense record found")
    return data

@router.get("/expenses/{expense_id}", response_model=e.get_Expense)
async def get_xpense(expense_id: int, user=Depends(get_current_user)):
    user_id = user["user_id"]
    data = db_expenses.get_xpense(expense_id, user_id)
    
    if data is None:
        raise HTTPException(
            status_code=404, 
            detail="Expense not found"
        )
    return data

@router.get("/expenses/categories/{category_id}")
async def get_expenses_by_category(category_id: int, user=Depends(get_current_user)):
    user_id = user["user_id"]
    data = db_expenses.get_xpense_category(user_id, category_id)

    if not data:
        raise HTTPException(
            status_code=404,
            detail="No Expense found with this category"
        )
    return data
    
@router.patch("/expenses/{expense_id}")
async def patch_expense(expense_id: int, input_expense: e.ExpenseUpdate, user=Depends(get_current_user)):
    input = input_expense.model_dump()
    user_id = user["user_id"]

    title = input["title"]
    amount = input["amount"]
    category = input["category_id"]

    data = db_expenses.patch_xpense(expense_id, user_id, title, amount, category)

    if not data:
        raise HTTPException(
            status_code=404,
            detail=f"Expense with id {expense_id} not found"
        )
    return data

#TODO GET TOTAL EXPENSES AMOUNT
@router.get("/expenses/")
async def get_total_xpense():
    pass