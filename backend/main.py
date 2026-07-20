from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import xpense_router
from backend.routers import user_router
from backend.routers import auth_router
from backend.routers import income_router

prefix = "/api/v1"

app = FastAPI()
app.include_router(xpense_router, prefix=prefix)
app.include_router(user_router, prefix=prefix)
app.include_router(auth_router, prefix=prefix)
app.include_router(income_router, prefix=prefix)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
