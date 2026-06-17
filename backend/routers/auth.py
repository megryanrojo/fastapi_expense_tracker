from fastapi import APIRouter, HTTPException, status
from ..schemas import auth
from ..database import db_auth


router = APIRouter()

@router.post("/auth/login")
def login_user(user_credentials: auth.LoginRequest):
    user = db_auth.login_user(user_credentials.name, user_credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )

    # TODO: JWT Token!

    return {
        "name": user['name'],
        "message": "Successful authentication!"
    }