"""Test authentication and prediction flow"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_auth_flow():
    print("=== Testing Authentication Flow ===\n")
    
    # 1. Register
    print("1. Registering new user...")
    register_data = {
        "username": "testuser",
        "email": "test@example.com",
        "name": "Test User",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/register", json=register_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 2. Login
    print("2. Logging in...")
    login_data = {
        "username": "testuser",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    token_data = response.json()
    token = token_data["access_token"]
    print(f"Status: {response.status_code}")
    print(f"Token received: {token[:50]}...\n")
    
    # 3. Get user info
    print("3. Getting user info...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/me", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"User: {response.json()}\n")
    
    # 4. Make prediction
    print("4. Making prediction...")
    prediction_data = {
        "MedInc": 8.3252,
        "HouseAge": 41.0,
        "AveRooms": 6.984,
        "AveBedrms": 1.023,
        "Population": 322.0,
        "AveOccup": 2.555,
        "Latitude": 37.88,
        "Longitude": -122.23
    }
    response = requests.post(f"{BASE_URL}/predict", json=prediction_data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Prediction: {response.json()}\n")
    
    # 5. Get prediction history
    print("5. Getting prediction history...")
    response = requests.get(f"{BASE_URL}/predictions/history", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"History: {response.json()}\n")
    
    print("=== All tests completed! ===")

if __name__ == "__main__":
    try:
        test_auth_flow()
    except Exception as e:
        print(f"Error: {e}")
        print("\nMake sure the server is running: uvicorn main:app --reload")
