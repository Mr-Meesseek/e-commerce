
# fastapi-backend/app/config.py
# from pymongo import MongoClient
# from bson.objectid import ObjectId
# from pymongo import TEXT  # Optional, in case of need

# class Settings:
#     """General settings for the FastAPI app"""
#     ACCESS_TOKEN_EXPIRE_MINUTES = 60

# class MongoSettings:
#     """Settings specific to MongoDB connection"""
#     MONGO_HOST = "localhost"
#     MONGO_PORT = 27017
#     DATABASE_NAME = "dataset"
#     COLLECTION_NAME = "client"

#     client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}")
#     db = client[DATABASE_NAME]
#     collection = db[COLLECTION_NAME]

# Creating instances of the settings classes to be used across the app
# settings = Settings()
# mongo_settings = MongoSettings()
from pymongo import MongoClient
conn = MongoClient("mongodb://localhost:27017/db")