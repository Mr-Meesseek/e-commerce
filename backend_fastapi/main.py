
from fastapi import FastAPI, Depends, HTTPException, status ,APIRouter,Form,Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import openpyxl
from openpyxl import Workbook
import os
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse
from typing import List
from fastapi.encoders import jsonable_encoder
from nlp_processing import preprocess, find_similar_responses
from final import  search, topReponses, read_documents
from pymongo.errors import PyMongoError
import logging
from typing import Dict, Any
 
  
# Charger les variables d'environnement
load_dotenv()
logging.basicConfig(level=logging.INFO)

# Configuration MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client['db']
users_collection = db['users_collection']
forms_collection = db['forms']
# forms_collection.insert_one({"fullName": "Test", "phoneNumber": "12345678", "email": "test@test.com", "residence": "Test Ville"})

# Configuration JWT
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Hachage de mots de passe
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class FormData(BaseModel):
    fullName: str
    # emaill: str
    fulladd: Optional[str] = None
    email: Optional[str] = None
    residence: Optional[str] = None
    phoneNumber: Optional[int] = None
    seniorityy: Optional[int] = None
    situation: Optional[str] = None
    profession: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None
    mablegh: Optional[float] = None
    why: Optional[str] = None
    madkhoull: Optional[float] = None
    charik1bank: Optional[str] = None
    salaire: Optional[float] = None
    loanType: Optional[str] = None


    
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
    role: Optional[str] = None  # Make role optional

class UserInDB(User):
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    full_name: str
    password: str
    email: Optional[str] = None
    role: str = 'client'  # Default role is 'client', change if necessary

    
def get_user(username: str):
    user_data = users_collection.find_one({"username": username})
    if user_data:
        user_data.setdefault('role', 'default_role')  # Provide a default role if missing
        return UserInDB(**user_data)
    return None

def get_password_hash(password):
    return pwd_context.hash(password)


def create_user(username: str, full_name: str, password: str, email: Optional[str] = None, role: str = 'client'):
    hashed_password = get_password_hash(password)
    user_data = {
        "username": username,
        "full_name": full_name,
        "email": email,
        "hashed_password": hashed_password,
        "role": role  # Default role is 'client'
    }
    users_collection.insert_one(user_data)
    return UserInDB(**user_data)

def create_admin_user():
    username = "easybank"
    full_name = "easy bank"
    password = "easybank@2023"  # You should change this to a more secure one
    email = "contact@easybank.tn"
    role = "admin"
    if not get_user(username):
        hashed_password = get_password_hash(password)
        user_data = {
            "username": username,
            "full_name": full_name,
            "email": email,
            "hashed_password": hashed_password,
            "disabled": False,
            "role": role
        }
        users_collection.insert_one(user_data)
        print("Admin user created successfully")
    else:
        print("Admin user already exists")

create_admin_user()
        
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
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
default_origin = "http://localhost:4200"
allowed_origins = os.getenv("ALLOWED_ORIGINS", default_origin).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def save_to_excel(data: FormData, filename="form_data.xlsx"):
    if os.path.exists(filename):
        wb = openpyxl.load_workbook(filename)
        ws = wb.active
    else:
        wb = Workbook()
        ws = wb.active
        # Header row for all fields
        ws.append(["Full Name", "Residence", "Phone Number", "State", "Full Address",
                   "Profession", "Country", "Whatsapp Number", "Contracts",
                   "Seniority Years", "Seniority Months", "Contract Years", "Contract Months"])

    # Append data row for all fields
    ws.append([
        data.fullName, data.residence, data.phoneNumber, data.state, data.fullAddress,
        data.profession, data.country, data.whatsappNumber, data.contracts,
        data.seniorityy, data.senioritym, data.contracty, data.contractm
    ])
    wb.save(filename)
messages = ["مرحبا بك ،كيف يمكنني مساعدتك"]

class Message(BaseModel):
    message: str

discussions = []

@app.on_event("startup")
async def startup_event():
    # Perform admin user creation
    create_admin_user()
    print("Admin user checked or created.")

    # Load discussions from a JSON file
    global discussions
    file_path = './res.json'  # Specify the correct path to your data file
    discussions = read_documents(file_path)
    print("Discussions data loaded successfully.")
    
@app.post("/create-admin")
async def create_admin_endpoint():
    create_admin_user()
    return {"message": "Admin check or creation attempted"}

@app.get("/messages")
async def get_messages():
    return messages

# @app.post("/chat")
# async def post_message(message: Message):
#     user_message = message.message
#     # Here you should implement the logic to generate a bot response
#     bot_response = process_user_message(user_message)
#     messages.append(f"You: {user_message}")
#     messages.append(f"Bot: {bot_response}")
#     return {"reply": bot_response}
class ChatRequest(BaseModel):
    text: str
    
# discussions = []
# @app.on_event("startup")
# def load_data():
#     global discussions
#     file_path = './res.json'  # Specify the correct path to your data file
#     discussions = read_documents(file_path)
   
# @app.post("/chat/")
# async def post_message(message: Message):
#     try:
#         print(f"Received message: {message.message}") 
#         # Preprocess the message using the imported NLP function
#         processed_query = preprocess(message.message)
        
#         # Find similar responses based on the processed query
#         # Assume 'discussions' is a preloaded dataset or similar
#         responses = find_similar_responses(processed_query, discussions)
        
#         # Prepare the chat response, assuming responses[0] is the most suitable response
#         # Here, we just select the first response as the bot's reply
#         bot_response = responses[0] if responses else "Sorry, I couldn't find a relevant response."

#         # Logging the conversation in a simpler form
#         # For example, appending to a list is not ideal for production; you would rather use a database or a more persistent storage
#         messages.append(f"You: {message.message}")
#         messages.append(f"Bot: {bot_response}")

#         return {"reply": bot_response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
@app.post("/chat/")
async def post_message(message: Message):
    processed_query = preprocess(message.message)
    responses = find_similar_responses(processed_query)
    bot_response = responses[0] if responses else "Sorry, I couldn't find a relevant response."
    return {"reply": bot_response}

def process_user_message(text: str) -> str:
    # Implement your chatbot's response logic here
    return "This is a placeholder response to '" + text + "'"

temp_storage = {}


@app.post("/save-form")
async def save_form(data: FormData):
    logging.info(f"Received form data: {data}")
    try:
        logging.info(f"Checking for existing email: {data.email}")
        existing_entry = forms_collection.find_one({"email": data.email})
        logging.info(f"Existing entry: {existing_entry}")
        if existing_entry:
            logging.warning(f"Email {data.email} already exists.")
            return {"message": "Email already exists."}
        forms_collection.insert_one(data.dict())
        logging.info(f"Data saved for email: {data.email}")
        return {"message": "Data saved successfully"}
    except Exception as e:
        logging.error(f"Error saving data: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


    
 # Endpoint pour confirmer le formulaire
@app.post("/confirm-form/")
async def confirm_form():
     permanent_storage = temp_storage.get("form_data", None)
     if not permanent_storage:
         raise HTTPException(status_code=404, detail="No data to save.")
     try:
         forms_collection.insert_one(permanent_storage)
         logging.info("Data saved permanently.")
         return {"message": "Data saved permanently."}
     except Exception as e:
         logging.error(f"Error saving data permanently: {e}")
     raise HTTPException(status_code=500, detail="Internal Server Error")

# # Endpoint pour sauvegarder le formulaire
# temp_storage: Dict[str, Any] = {}

# # Endpoint pour sauvegarder le formulaire
# @app.post("/save-form")
# async def save_form(data: FormData):
#     logging.info(f"Received form data: {data}")
#     try:
#         existing_entry = next((item for item in forms_collection if item["email"] == data.email), None)
#         if existing_entry:
#             logging.warning(f"Email {data.email} already exists.")
#             return {"message": "Email already exists."}
#         forms_collection.append(data.dict())
#         logging.info(f"Data saved for email: {data.email}")
#         return {"message": "Data saved successfully"}
#     except Exception as e:
#         logging.error(f"Error saving data: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")

# # Endpoint pour soumettre le formulaire
# @app.post("/submit-form/")
# async def submit_form(request: Request):
#     try:
#         data = await request.json()
#         if not data:
#             logging.error("Empty data received.")
#             raise HTTPException(status_code=400, detail="No data provided.")
#         logging.info(f"Temporary data stored: {data}")
#         temp_storage["form_data"] = data
#         return {"message": "Data stored temporarily. Click close to save permanently."}
#     except Exception as e:
#         logging.error(f"Error storing temporary data: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")

# # Endpoint pour confirmer la sauvegarde du formulaire
# @app.post("/confirm-form/")
# async def confirm_form():
#     try:
#         permanent_storage = temp_storage.get("form_data", None)
#         if not permanent_storage:
#             logging.error("No data to save.")
#             raise HTTPException(status_code=404, detail="No data to save.")
#         forms_collection.append(permanent_storage)
#         logging.info(f"Data saved permanently: {permanent_storage}")
#         return {"message": "Data saved permanently."}
#     except Exception as e:
#         logging.error(f"Error confirming data: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"})
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}



@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/users", response_model=List[User])
async def read_users(current_user: User = Depends(get_current_active_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    users = list(users_collection.find({}, {"_id": 0, "id": 1, "username": 1, "email": 1, "role": 1}))
    return users


@app.post("/users", response_model=User)
async def create_new_user(user: UserCreate):
    existing_user = get_user(user.username)
    if existing_user is None:
        # Handle the case where no existing user is found.
        # For example, proceed to create a new user:
        new_user = create_user(user.username, user.full_name, user.password, user.email, user.role)
        return new_user
    else:
        # If the user does exist, you can check for the role or other properties
        if 'role' not in existing_user.dict():  # Make sure to use .dict() if existing_user is a Pydantic model
            raise HTTPException(status_code=400, detail="Existing user lacks 'role' information")
        # If the user exists and has a role, handle as necessary:
        raise HTTPException(status_code=400, detail="Username already registered")



@app.get("/download-excel/")
def download_excel_file():
    file_path = "data.xlsx"
    return FileResponse(path=file_path, filename=file_path)

#

#     # Save to Excel
#     df = pd.DataFrame([form_data.dict()])
#     df.to_excel('form_data.xlsx', index=False)

    return {"message": "Form data saved successfully"}
class MsgData(BaseModel):
    text: str
    
@app.post("/chatbot")
async def submit_chatbot(msg: MsgData):
    try:
        # 
        q = "" # question envoyé msg.text
        r = "" # predict
        return JSONResponse(status_code=200, content={"message": r})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
router = APIRouter()

@app.get("/admin", response_model=List[User])
async def get_admin_dashboard_data(current_user: User = Depends(get_current_active_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access forbidden")
    users = list(users_collection.find({}, {'_id': 0, 'username': 1, 'email': 1, 'role': 1}))
    return users