from pydantic import BaseModel

class MediaUpload(BaseModel):
    title: str
    caption: str
    location: str
    people: list[str]

class Comment(BaseModel):
    media_id: str
    user: str
    comment: str

class Rating(BaseModel):
    media_id: str
    user: str
    rating: int

