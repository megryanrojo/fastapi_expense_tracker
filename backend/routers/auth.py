from fastapi import APIRouter
from ..schemas import auth
from ..database import db_auth

router = APIRouter()

@router.post("/auth/login")
def login_user(user_credentials: auth.LoginRequest):
    auth = db_auth.login_user(user_credentials.name, user_credentials.password)
    
    return {
        auth['name']
    }