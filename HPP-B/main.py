"""
FastAPI backend for house price prediction.

To run the server:
uvicorn main:app --reload

The API will be available at http://localhost:8000
API documentation at http://localhost:8000/docs
"""
from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from models.prediction import HouseFeatures, PredictionResponse, predictor
from database import (
    Base, engine, get_db,
    User, Prediction,
    hash_password, verify_password, create_access_token,
    get_current_user,
    UserRegister, UserLogin, Token, UserResponse, PredictionHistory
)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting house prices using Linear Regression on California Housing dataset",
    version="1.0.0"
)



# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "House Price Prediction API",
        "version": "1.0.0",
        "endpoints": {
            "register": "/register (POST)",
            "login": "/login (POST)",
            "me": "/me (GET)",
            "predict": "/predict (POST) - Requires Auth",
            "history": "/predictions/history (GET) - Requires Auth",
            "docs": "/docs",
            "health": "/health"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "model_loaded": predictor.model_data is not None}

@app.post("/register", response_model=UserResponse)
async def register(request: Request, user: UserRegister, db: Session = Depends(get_db)):
    """Register a new user"""
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = User(
        username=user.username,
        email=user.email,
        name=user.name,
        hashed_password=hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/login", response_model=Token)
async def login(request: Request, user: UserLogin, db: Session = Depends(get_db)):
    """Login and get JWT token"""
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@app.get("/predictions/history")
async def get_prediction_history(
    request: Request,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's prediction history"""
    predictions = db.query(Prediction).filter(
        Prediction.user_id == current_user.id
    ).order_by(Prediction.created_at.desc()).limit(50).all()
    return {"predictions": predictions, "total": len(predictions)}

@app.post("/predict", response_model=PredictionResponse)
async def predict_house_price(
    request: Request,
    features: HouseFeatures,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Predict house price based on features.
    
    Features (California Housing dataset):
    - MedInc: Median income in block group
    - HouseAge: Median house age in block group  
    - AveRooms: Average number of rooms per household
    - AveBedrms: Average number of bedrooms per household
    - Population: Block group population
    - AveOccup: Average number of household members
    - Latitude: Block group latitude
    - Longitude: Block group longitude
    """
    try:
        prediction = predictor.predict(features)
        
        # Store prediction in database
        db_prediction = Prediction(
            user_id=current_user.id,
            med_inc=str(features.MedInc),
            house_age=str(features.HouseAge),
            ave_rooms=str(features.AveRooms),
            ave_bedrms=str(features.AveBedrms),
            population=str(features.Population),
            ave_occup=str(features.AveOccup),
            latitude=str(features.Latitude),
            longitude=str(features.Longitude),
            predicted_price=str(prediction.predicted_price)
        )
        db.add(db_prediction)
        db.commit()
        
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)