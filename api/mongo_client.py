from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongo")
MONGO_PORT = os.getenv("MONGO_PORT")
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")

mongo_client = MongoClient(
    host=MONGO_URL,
    port=int(MONGO_PORT),
    username=MONGO_USER,
    password=MONGO_PASS,
)
