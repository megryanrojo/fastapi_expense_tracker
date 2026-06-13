from pydantic import BaseModel
from datetime import date

class userCreate(BaseModel):
    name: str
    password: str
    date_created: date

class user(userCreate):
    id: int

class userUpdate(BaseModel):
    name: str | None = None
    password: str | None = None
 
