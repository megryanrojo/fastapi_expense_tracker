from fastapi import FastAPI
from backend.routers import xpense_router

app = FastAPI()
app.include_router(xpense_router, prefix="/api/v1")