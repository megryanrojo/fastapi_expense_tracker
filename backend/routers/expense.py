from schemas import expense as e
from fastapi import APIRouter
from database.queries.expenses import create_expense

router = APIRouter()

@router.post("/expenses", response_model=e.Expense)
async def add_expense(expense_input = e.ExpenseCreate):
    new_expense = expense_input.model_dump()
    expense_id = create_expense(new_expense)

    return {
        "id": expense_id,
        **new_expense
    }