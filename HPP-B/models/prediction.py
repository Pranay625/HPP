"""
Prediction models and logic for house price prediction.
"""
import joblib
import numpy as np
from pydantic import BaseModel
from typing import Optional
import os

class HouseFeatures(BaseModel):
    """Pydantic model for California Housing dataset features"""
    MedInc: float  # Median income in block group
    HouseAge: float  # Median house age in block group
    AveRooms: float  # Average number of rooms per household
    AveBedrms: float  # Average number of bedrooms per household
    Population: float  # Block group population
    AveOccup: float  # Average number of household members
    Latitude: float  # Block group latitude
    Longitude: float  # Block group longitude

class PredictionResponse(BaseModel):
    """Response model for predictions"""
    predicted_price: float
    features_used: dict

class HousePricePredictor:
    def __init__(self):
        self.model_data = None
        self.load_model()
    
    def load_model(self):
        """Load the trained model and scaler"""
        if os.path.exists('model.joblib'):
            self.model_data = joblib.load('model.joblib')
        else:
            # Train model if it doesn't exist
            print("Model not found. Training new model...")
            from train import train_model
            train_model()
            self.model_data = joblib.load('model.joblib')
    
    def predict(self, features: HouseFeatures) -> PredictionResponse:
        """Make prediction using the trained model"""
        # Convert features to array in correct order
        feature_array = np.array([[
            features.MedInc,
            features.HouseAge,
            features.AveRooms,
            features.AveBedrms,
            features.Population,
            features.AveOccup,
            features.Latitude,
            features.Longitude
        ]])
        
        # Scale features
        scaled_features = self.model_data['scaler'].transform(feature_array)
        
        # Make prediction
        prediction = self.model_data['model'].predict(scaled_features)[0]
        
        return PredictionResponse(
            predicted_price=round(prediction * 100000, 2),  # Convert to dollars
            features_used=features.dict()
        )

# Global predictor instance
predictor = HousePricePredictor()