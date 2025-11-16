# OceanGuard Setup Guide

This guide will help you set up both the frontend and backend of the OceanGuard application.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd oceanbackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `oceanbackend` directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/oceanguard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Make sure MongoDB is running. If you don't have MongoDB installed:
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud) and update the MONGODB_URI

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd OceanFrontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

## Testing the Application

1. Start MongoDB (if running locally)
2. Start the backend server (`npm run dev` in `oceanbackend`)
3. Start the frontend server (`npm run dev` in `OceanFrontend`)
4. Open your browser to the frontend URL
5. Try signing up a new account
6. Login with your credentials
7. Navigate to the Map page and try reporting a hazard

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Hazard Reports (requires authentication)
- `GET /api/hazards` - Get all reports
- `POST /api/hazards` - Create report
- `GET /api/hazards/:id` - Get specific report
- `PUT /api/hazards/:id` - Update report
- `DELETE /api/hazards/:id` - Delete report

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create news article

### Analytics
- `GET /api/analytics` - Get analytics data

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify the MONGODB_URI in `.env` is correct
- Check if port 3000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS settings in backend
- Verify API_BASE_URL in `src/utils/api.ts`

### Authentication issues
- Check JWT_SECRET in backend `.env`
- Clear browser localStorage and try again
- Verify token is being sent in request headers

## Project Structure

```
OceanGaurd/
├── OceanFrontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── utils/          # API utilities
│   │   └── types.ts        # TypeScript types
│   └── package.json
│
└── oceanbackend/           # Express + TypeScript backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/          # MongoDB models
    │   ├── routes/          # API routes
    │   ├── middleware/      # Auth middleware
    │   └── config/          # Database config
    └── package.json
```

