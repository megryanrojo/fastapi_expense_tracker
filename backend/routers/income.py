from ..schemas import income as inc
from fastapi import APIRouter, HTTPException, Depends
from ..database.queries import db_income
from ..core.dependencies import get_current_user
from typing import Optional

router = APIRouter()

@router.post("/income")
async def create_income(income_input: inc.IncomeCreate, user=Depends(get_current_user)):
    current_user = await user

    new_income = income_input.model_dump()
    new_income["user_id"] = current_user["user_id"]
    income_id = await db_income.create_income(new_income)

    return {
        "id": income_id,
        **new_income
    }

@router.get("/income", response_model=inc.GetAllIncome)
async def get_all_income(
    user=Depends(get_current_user), 
    minAmount: Optional[int] = None,
    maxAmount: Optional[int] = None,
    startDate: Optional[str] = None,
    endDate: Optional[str] = None
    ):

    current_user = await user
    user_id = current_user["user_id"]
    income_data = await db_income.get_all_income(user_id, minAmount, maxAmount, startDate, endDate)

    if income_data is None:
        raise HTTPException(
            status_code=404,
            detail="Error no income data found"
        )
    return income_data

    
    
    
