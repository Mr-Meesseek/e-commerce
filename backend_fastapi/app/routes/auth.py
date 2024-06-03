# fastapi-backend/app/routes/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import timedelta
from pydantic import EmailStr
from core.config import settings
from core.security import get_password_hash, verify_password, create_access_token
from app.models import UserCreate, Token, UserInDB, User
from typing import Optional

router = APIRouter()

client = AsyncIOMotorClient(settings.MONGO_DETAILS)
db = client.my_database
users_collection = db.users

ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

async def get_user_by_username(username: str) -> Optional[UserInDB]:
    user = await users_collection.find_one({"username": username})
    if user:
        return UserInDB(**user)
    return None

# async def get_user_by_email(email: str) -> Optional[UserInDB]:
#     user = await users_collection.find_one({"email": email})
#     if user:
#         return UserInDB(**user)
#     return None

async def create_user(user: UserCreate) -> UserInDB:
    hashed_password = get_password_hash(user.password)
    user_data = {
        "username": user.username,
        # "email": user.email,
        "hashed_password": hashed_password,
    }
    await users_collection.insert_one(user_data)
    return UserInDB(**user_data)

async def authenticate_user(username: str, password: str) -> Optional[UserInDB]:
    user = await get_user_by_username(username)
    if user and verify_password(password, user.hashed_password):
        return user
    return None

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    if await get_user_by_username(user.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken")
    # if await get_user_by_email(user.email):
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    return await create_user(user)

@router.post("/login", response_model=Token)
async def login(username: str, password: str):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
