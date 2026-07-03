from fastapi import APIRouter, HTTPException, status
from ..schemas import auth
from ..database import db_auth
from ..core.jwt_handler import create_access_token


router = APIRouter()

@router.post("/auth/login", response_model= auth.LoginResponse)
def login_user(user_credentials: auth.LoginRequest):
    user = db_auth.login_user(user_credentials.name, user_credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials"
        )

    token = create_access_token(
        data={
            "user_id": user["id"],
            "name": user["name"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": user['name'],
    }