"""User database model"""
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .config import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Prediction(Base):
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    med_inc = Column(String)
    house_age = Column(String)
    ave_rooms = Column(String)
    ave_bedrms = Column(String)
    population = Column(String)
    ave_occup = Column(String)
    latitude = Column(String)
    longitude = Column(String)
    predicted_price = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
