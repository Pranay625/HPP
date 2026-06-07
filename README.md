# 🏠 House Price Prediction App

Full-stack application for predicting house prices using Machine Learning with user authentication.

## 🚀 Features

- **ML Prediction**: Linear Regression model trained on California Housing dataset
- **User Authentication**: JWT-based auth with secure password hashing
- **Database Storage**: All predictions stored with user data
- **Modern UI**: Beautiful Next.js frontend with Framer Motion animations
- **RESTful API**: FastAPI backend with automatic documentation

## 📁 Project Structure

```
├── HPP-B/          # Backend (FastAPI)
│   ├── database/   # Auth & DB models
│   ├── models/     # ML prediction logic
│   └── main.py     # API endpoints
│
└── HPP-F/          # Frontend (Next.js)
    └── frontend/
        ├── app/    # Pages (login, register, predict)
        └── lib/    # Auth context
```

## 🛠️ Tech Stack

**Backend:**
- FastAPI
- SQLAlchemy (SQLite)
- Scikit-learn
- JWT Authentication
- Python 3.12

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

## 📦 Installation

### Backend Setup
```bash
cd HPP-B
pip install -r requirements.txt
python init_db.py
python train.py  # Optional - trains model
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd HPP-F/frontend
npm install
npm run dev
```

## 🌐 Usage

1. Visit `http://localhost:3000`
2. Register a new account
3. Login with credentials
4. Enter house features
5. Get instant price prediction
6. View prediction history

## 📊 API Endpoints

- `POST /register` - Create new user
- `POST /login` - Get JWT token
- `GET /me` - Get user info
- `POST /predict` - Predict house price (auth required)
- `GET /predictions/history` - View history (auth required)
- `GET /docs` - API documentation

## ⚠️ Note

This is a **development/portfolio project**. For production deployment:
- Change SECRET_KEY
- Use PostgreSQL instead of SQLite
- Implement proper password hashing (bcrypt)
- Add HTTPS
- Restrict CORS origins
- Add rate limiting

## 📝 License

MIT

## 👤 Author

Pranay Rajesh
---

⭐ Star this repo if you found it helpful!
