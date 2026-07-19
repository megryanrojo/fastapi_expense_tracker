from ..schemas import income as inc
from fastapi import APIRouter, HTTPException, Depends
from ..database.queries import db_income, db_cash_flow
from ..core.dependencies import get_current_user
from typing import Optional

router = APIRouter()

@router.post("/income")
async def create_income(income_input: inc.IncomeCreate, user=Depends(get_current_user)):
    current_user = user

    new_income = income_input.model_dump()
    new_income["user_id"] = current_user["user_id"]
    income_id = db_income.create_income(new_income)

    return {
        "id": income_id,
        **new_income
    }

@router.get("/income/total")
def get_total_income(user=Depends(get_current_user)):
    user_id = user["user_id"]

    total_income = db_income.get_total_income(user_id)                                                                                                                                 
    
    if total_income is None:
        raise HTTPException(
            status_code=404,                                        
            detail="No Income found"                        
        )
    return {
        "total_income": total_income
    }

@router.get("/income", response_model=inc.GetAllIncome)
async def get_all_income(
    user=Depends(get_current_user), 
    minAmount: Optional[int] = None,
    maxAmount: Optional[int] = None,
    startDate: Optional[str] = None,                                                            
    endDate: Optional[str] = None
    ):

    current_user = user
    user_id = current_user["user_id"]
    income_data = db_income.get_all_income(user_id, minAmount, maxAmount, startDate, endDate)

    if income_data is None:
        raise HTTPException(
            status_code=404,
            detail="Error no income data found"
        )
    return income_data

@router.get("/income/cash-flow")
async def get_income_cash_flow(user=Depends(get_current_user)):
    user_id = user["user_id"]

    data = db_cash_flow.income_cash_flow(user_id)

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="No Income data found"
        )

    return data

@router.patch("/income/{income_id}", response_model=inc.Income)
async def update_income():
    pass
    
    
