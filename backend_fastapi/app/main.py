# # fastapi-backend/app/main.py
# from fastapi import FastAPI
# from app.routes import auth

# app = FastAPI()

# app.include_router(auth.router)
# main.py
# from fastapi import FastAPI, HTTPException, Depends
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from pydantic import BaseModel
# from passlib.context import CryptContext
# from typing import Optional
# from jose import JWTError, jwt
# from datetime import datetime, timedelta
# from pymongo import MongoClient

# MongoDB setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client['db']
# users_collection = db['users_collection']
# JWT settings
#f secret key haka tjibou mn openssl rand -hex 32
# SECRET_KEY = "9f2ea099369e46df035d313c70280eaafec8415c76b42c6de8d2e86061a1fabf"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60
# main.py
###########################################################################################
# SECRET_KEY="9f2ea099369e46df035d313c70280eaafec8415c76b42c6de8d2e86061a1fabf"
# MONGO_URI="mongodb://localhost:27017/"

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv()

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client['db']
users_collection = db['users_collection']

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    full_name: str
    email: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str):
    user_data = users_collection.find_one({"username": username})
    if user_data:
        return UserInDB(**user_data)

def create_user(username: str, full_name: str, password: str, email: Optional[str] = None):
    hashed_password = get_password_hash(password)
    user_data = {
        "username": username,
        "full_name": full_name,
        "email": email,
        "hashed_password": hashed_password,
        "disabled": False
    }
    users_collection.insert_one(user_data)
    return UserInDB(**user_data)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

app = FastAPI()

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

class UserCreate(BaseModel):
    username: str
    full_name: str
    password: str
    email: Optional[str] = None

@app.post("/users", response_model=User)
async def create_new_user(user: UserCreate):
    existing_user = get_user(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    new_user = create_user(user.username, user.full_name, user.password, user.email)
    return new_user

# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from pydantic import BaseModel
# from pymongo import MongoClient
# from passlib.context import CryptContext
# from jose import JWTError, jwt
# from datetime import datetime, timedelta
# import os
# from dotenv import load_dotenv
# from typing import Optional

# # Load environment variables
# load_dotenv()

# # MongoDB Setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client['db']
# users_collection = db['users_collection']

# # JWT Configuration
# #f secret key haka tjibou mn openssl rand -hex 32
# SECRET_KEY = "9f2ea099369e46df035d313c70280eaafec8415c76b42c6de8d2e86061a1fabf"
# # SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # Password hashing
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Optional[str] = None

# class User(BaseModel):
#     username: str
#     full_name: str
#     email: Optional[str] = None
#     disabled: Optional[bool] = None

# class UserInDB(User):
#     hashed_password: str

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

# def get_user(username: str):
#     user_data = users_collection.find_one({"username": username})
#     if user_data:
#         return UserInDB(**user_data)

# def create_user(username: str, full_name: str, password: str, email: Optional[str] = None):
#     hashed_password = get_password_hash(password)
#     user_data = {
#         "username": username,
#         "full_name": full_name,
#         "email": email,
#         "hashed_password": hashed_password,
#         "disabled": False
#     }
#     users_collection.insert_one(user_data)
#     return UserInDB(**user_data)

# def authenticate_user(username: str, password: str):
#     user = get_user(username)
#     if not user or not verify_password(password, user.hashed_password):
#         return False
#     return user

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# async def get_current_active_user(current_user: User = Depends(get_current_user)):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user

# app = FastAPI()

# @app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = authenticate_user(form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

# @app.get("/users/me", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user

# class UserCreate(BaseModel):
#     username: str
#     full_name: str
#     password: str
#     email: Optional[str] = None

# @app.post("/users", response_model=User)
# async def create_new_user(user: UserCreate):
#     existing_user = get_user(user.username)
#     if existing_user:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     new_user = create_user(user.username, user.full_name, user.password, user.email)
#     return new_user
# app = FastAPI()

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     username: Optional[str] = None

# class User(BaseModel):
#     username: str
#     email: str
#     full_name: Optional[str] = None
#     disabled: Optional[bool] = None

# class UserInDB(User):
#     hashed_password: str

# async def get_user(username: str):
#     user = await users_collection.find_one({"username": username})
#     if user:
#         return UserInDB(**user)

# async def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# async def authenticate_user(username: str, password: str):
#     user = await get_user(username)
#     if not user or not await verify_password(password, user.hashed_password):
#         return False
#     return user

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = await get_user(username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# async def get_current_active_user(current_user: User = Depends(get_current_user)):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user

# @app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = await authenticate_user(form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(status_code=401, detail="Incorrect username or password")
#     access_token = create_access_token(data={"sub": user.username}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     return {"access_token": access_token, "token_type": "bearer"}

# @app.get("/users/me", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user

# @app.post("/register", response_model=User)
# async def register_user(user: UserInDB):
#     hashed_password = pwd_context.hash(user.hashed_password)
#     user_data = user.dict()
#     user_data["hashed_password"] = hashed_password
#     await users_collection.insert_one(user_data)
#     return user

# # Test Route to Validate Authentication
# @app.get("/protected-route")
# async def protected_route(current_user: User = Depends(get_current_active_user)):
#     return {"message": f"Hello, {current_user.username}"}
