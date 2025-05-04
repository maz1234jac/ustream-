from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from azure.storage.blob import BlobServiceClient
from database import media_collection, comment_collection
import uuid
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

blob_service_client = BlobServiceClient.from_connection_string("<your_blob_conn_str>")
container = blob_service_client.get_container_client("media")

@app.post("/upload")
async def upload_file(
    title: str = Form(...),
    caption: str = Form(...),
    location: str = Form(...),
    people: str = Form(...),
    file: UploadFile = File(...)
):
    file_id = str(uuid.uuid4())
    blob_client = container.get_blob_client(file_id + "-" + file.filename)
    blob_client.upload_blob(file.file, overwrite=True)
    url = blob_client.url

    media = {
        "title": title,
        "caption": caption,
        "location": location,
        "people": people.split(","),
        "url": url,
    }
    media_collection.insert_one(media)
    return {"status": "uploaded", "url": url}

@app.get("/media")
def get_media():
    return list(media_collection.find({}, {"_id": 0}))

@app.post("/comment")
def post_comment(data: dict):
    comment_collection.insert_one(data)
    return {"status": "commented"}

@app.get("/comments/{media_id}")
def get_comments(media_id: str):
    return list(comment_collection.find({"media_id": media_id}, {"_id": 0}))
