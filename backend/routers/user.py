from fastapi import APIRouter, HTTPException
from ..database.queries import db_user
from ..schemas import user

router = APIRouter()


@router.post("/users")
async def create_user(user: user.userCreate):
    new_user = user.model_dump()
    user_id = db_user.new_user(new_user)
    
    return {
        "id": user_id,
        **new_user
    }

@router.get("/users")
async def get_users():
    data = db_user.get_users()

    if not data:
        raise HTTPException(status_code=404, detail="No users found")
    return data

@router.get("/users/{user_id}")
async def get_user(user_id: int):
    data = db_user.get_user(user_id)

    return data

@router.patch("/users/{user_id}")
async def patch_user(user_id: int, user_input: user.userUpdate):
    input = user_input.model_dump()

    name = input['name']
    password = input['password']

    data = db_user.patch_user(user_id, name, password)
    return data