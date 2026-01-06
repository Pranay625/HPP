"""
Train a Linear Regression model on California Housing dataset and save it.
Run this script first to generate the model.joblib file.
"""
import joblib
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def train_model():
    # Load California Housing dataset
    housing = fetch_california_housing()
    X, y = housing.data, housing.target
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = LinearRegression()
    model.fit(X_train_scaled, y_train)
    
    # Save model and scaler
    joblib.dump({'model': model, 'scaler': scaler, 'feature_names': housing.feature_names}, 'model.joblib')
    
    # Print accuracy
    score = model.score(X_test_scaled, y_test)
    print(f"Model trained successfully! R² score: {score:.4f}")
    print("Model saved as model.joblib")

if __name__ == "__main__":
    train_model()