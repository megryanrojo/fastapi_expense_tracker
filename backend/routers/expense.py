from ..schemas import expense as e
from fastapi import APIRouter, HTTPException
from ..database.queries import db_expenses


router = APIRouter()

@router.post("/expenses", response_model=e.Expense)
async def add_expense(expense_input: e.ExpenseCreate):
    new_expense = expense_input.model_dump()
    expense_id = db_expenses.create_expense(new_expense)

    return {
        "id": expense_id,
        **new_expense
    }
    
@router.get("/expenses")
async def get_all_expenses():
    data = db_expenses.get_xpenses()

    if not data:
        raise HTTPException(status_code=404, detail="No expense record found")
    return data

@router.get("/expenses/{expense_id}", response_model=e.Expense)
async def get_xpense(expense_id: int):
    data = db_expenses.get_xpense(expense_id)
    
    if data is None:
        raise HTTPException(
            status_code=404, 
            detail="Expense not found"
        )
    return data
    
@router.patch("expenses/{expense_id}")
async def patch_expense(expense_id: int, input_expense: e.ExpenseUpdate):
    input = input_expense.model_dump()

    title = input["title"]
    amount = input["amount"]
    category = input["category"]

    data = db_expenses.patch_xpense(expense_id, title, amount, category)

    if not data:
        raise HTTPException(
            status_code=404,
            detail=f"Expense with id {expense_id} not found"
        )
    return data