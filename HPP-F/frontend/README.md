# House Price Prediction Frontend

A modern Next.js 14+ frontend application for predicting house prices using a FastAPI backend.

## Features

- Built with Next.js 14+ (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Axios for API calls
- Responsive design
- Loading states and error handling

## Prerequisites

- Node.js 18+ installed
- Backend API running (FastAPI)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Update the backend URL in `.env.local` if needed:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Configuration

### Backend URL

The backend URL is configured using environment variables:

- **Development**: Set `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- **Production**: Set the environment variable in your deployment platform

#### Examples:

**Local Development:**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Production (Vercel, Netlify, etc.):**
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
```

### Updating Backend URL for Deployment

1. **Vercel**: Add environment variable in Project Settings → Environment Variables
2. **Netlify**: Add in Site Settings → Environment Variables
3. **Docker**: Pass as environment variable in docker-compose or Dockerfile
4. **Other platforms**: Refer to their documentation for setting environment variables

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page with prediction form
├── .env.local               # Environment variables (not in git)
├── .env.example             # Example environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## API Integration

The frontend expects the backend to have a POST endpoint at `/predict`:

**Request:**
```json
{
  "MedInc": 3.5,
  "HouseAge": 15.0,
  "AveRooms": 5.0,
  "AveBedrms": 1.0,
  "Population": 1000,
  "AveOccup": 3.0,
  "Latitude": 37.5,
  "Longitude": -122.0
}
```

**Response:**
```json
{
  "predicted_price": 250000.00,
  "features_used": {...}
}
```

## Features Explained

The form includes 8 housing features based on the California Housing dataset:

1. **MedInc**: Median income in block group
2. **HouseAge**: Median house age in block group
3. **AveRooms**: Average number of rooms per household
4. **AveBedrms**: Average number of bedrooms per household
5. **Population**: Block group population
6. **AveOccup**: Average number of household members
7. **Latitude**: Block group latitude
8. **Longitude**: Block group longitude

## Troubleshooting

### Backend Connection Issues

If you see "Failed to get prediction" error:

1. Ensure the backend is running
2. Check the backend URL in `.env.local`
3. Verify CORS is enabled on the backend
4. Check browser console for detailed errors

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

## License

MIT
