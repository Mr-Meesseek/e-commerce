# fastapi-backend/app/models.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    # email: str
    hashed_password: str


class UserInDB(User):
    id: Optional[str] = None

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
