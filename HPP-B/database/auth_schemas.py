"""Authentication schemas"""
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    name: str
    created_at: datetime

class PredictionHistory(BaseModel):
    id: int
    predicted_price: str
    med_inc: str
    house_age: str
    created_at: datetime
