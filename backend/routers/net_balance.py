from ..database import db_net_balance
from fastapi import APIRouter,  HTTPException, Depends
from ..core.dependencies import get_current_user

router = APIRouter()

@router.get("/net_balance")
def get_net_balance(user=Depends(get_current_user)):
    user_id = user["user_id"]

    net_balance = db_net_balance.get_net_balance(user_id)

    if net_balance is None:
        raise HTTPException(
            status_code=404,
            detail="Net balance cannot be calculated or is None"
        )
    
    return net_bala