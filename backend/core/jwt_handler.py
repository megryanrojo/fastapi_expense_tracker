from jose import jwt, JWTError
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone

import os 

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
TOKEN_EXPIRY_MINUTES = 30

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is missing in environment variables")

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRY_MINUTES)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None