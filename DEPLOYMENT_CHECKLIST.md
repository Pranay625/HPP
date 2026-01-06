# Deployment Checklist

## ❌ CRITICAL - Must Fix Before Deployment:

### 1. Change SECRET_KEY
```bash
# Generate secure key:
openssl rand -hex 32

# Add to .env file:
SECRET_KEY=your_generated_key_here
```

### 2. Fix Password Hashing
Replace SHA256 with bcrypt or argon2:
```bash
pip install bcrypt
```

### 3. Switch to PostgreSQL
```bash
# Install
pip install psycopg2-binary

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://user:password@host/dbname
```

### 4. Restrict CORS
```python
allow_origins=["https://your-frontend-domain.com"]
```

### 5. Add Rate Limiting
```bash
pip install slowapi
```

### 6. Use Environment Variables
```bash
pip install python-dotenv
```

### 7. Enable HTTPS
- Use Nginx/Caddy as reverse proxy
- Get SSL certificate (Let's Encrypt)

### 8. Add Logging
```python
import logging
logging.basicConfig(level=logging.INFO)
```

## 🟡 Recommended:

- [ ] Add password strength validation (min 8 chars, uppercase, number)
- [ ] Add email verification
- [ ] Set up monitoring (Sentry, DataDog)
- [ ] Add database backups
- [ ] Add health checks
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation
- [ ] Add tests

## Deployment Platforms:

**Backend:**
- Railway.app (easiest)
- Render.com
- AWS EC2
- DigitalOcean

**Frontend:**
- Vercel (easiest for Next.js)
- Netlify
- AWS Amplify

**Database:**
- Railway PostgreSQL
- Supabase
- AWS RDS

## Current Status: 🔴 NOT READY

Fix critical issues first!
