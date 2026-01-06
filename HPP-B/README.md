# House Price Prediction API

FastAPI backend for predicting house prices using Linear Regression on the California Housing dataset with JWT authentication.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Initialize database:
```bash
python init_db.py
```

3. Train the model (optional - will auto-train on first API call):
```bash
python train.py
```

4. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

## Authentication

### Register a new user:
```bash
curl -X POST "http://localhost:8000/register" \
     -H "Content-Type: application/json" \
     -d '{
       "username": "john_doe",
       "email": "john@example.com",
       "name": "John Doe",
       "password": "securepassword123"
     }'
```

### Login to get JWT token:
```bash
curl -X POST "http://localhost:8000/login" \
     -H "Content-Type: application/json" \
     -d '{
       "username": "john_doe",
       "password": "securepassword123"
     }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## API Endpoints

- **POST /register** - Register new user
- **POST /login** - Login and get JWT token
- **GET /me** - Get current user info (requires auth)
- **POST /predict** - Predict house price (requires auth)
- **GET /predictions/history** - Get prediction history (requires auth)
- **GET /** - API information
- **GET /health** - Health check

## Example Prediction Request

```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
     -d '{
       "MedInc": 8.3252,
       "HouseAge": 41.0,
       "AveRooms": 6.984,
       "AveBedrms": 1.023,
       "Population": 322.0,
       "AveOccup": 2.555,
       "Latitude": 37.88,
       "Longitude": -122.23
     }'
```

## Rate Limits

- **Register**: 5 requests/minute
- **Login**: 10 requests/minute
- **Predictions (authenticated)**: 100 requests/minute

## Features

- **MedInc**: Median income in block group
- **HouseAge**: Median house age in block group
- **AveRooms**: Average number of rooms per household
- **AveBedrms**: Average number of bedrooms per household
- **Population**: Block group population
- **AveOccup**: Average number of household members
- **Latitude**: Block group latitude
- **Longitude**: Block group longitude

## API Documentation

Visit http://localhost:8000/docs for interactive API documentation.