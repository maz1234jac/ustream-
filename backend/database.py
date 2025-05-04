from pymongo import MongoClient

client = MongoClient("mongodb+srv://<your_connection_string>")
db = client["media_app"]
media_collection = db["media"]
comment_collection = db["comments"]
