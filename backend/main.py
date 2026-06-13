from fastapi import FastAPI
from backend.routers import xpense_router
from backend.routers import user_router

app = FastAPI()
app.include_router(xpense_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")