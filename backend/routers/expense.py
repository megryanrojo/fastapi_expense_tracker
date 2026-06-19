from ..schemas import expense as e
from fastapi import APIRouter, HTTPException, Depends
from ..database.queries import db_expenses
from ..core.dependencies import get_current_user


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
async def get_all_expenses(user=Depends(get_current_user)):
    user_id = user["user_id"]
    data = db_expenses.get_xpenses(user_id)

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
    
@router.patch("expenses/{expense_id}")
async def patch_expense(expense_id: int, input_expense: e.ExpenseUpdate, user=Depends(get_current_user)):
    input = input_expense.model_dump()
    user_id = user["user_id"]

    title = input["title"]
    amount = input["amount"]
    category = input["category"]

    data = db_expenses.patch_xpense(expense_id, user_id, title, amount, category)

    if not data:
        raise HTTPException(
            status_code=404,
            detail=f"Expense with id {expense_id} not found"
        )
    return data