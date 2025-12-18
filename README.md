# 🌊 OceanGuard

### *Protecting Our Oceans Through Real-Time Hazard Monitoring & Community-Driven Reporting*

**OceanGuard** is a cutting-edge full-stack web application that empowers citizens and authorities to collaboratively monitor, report, and respond to ocean hazards in real-time. From oil spills to marine debris, OceanGuard creates a safer, more sustainable ocean environment through technology and community engagement.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [📱 Usage Guide](#-usage-guide)
- [🔌 API Documentation](#-api-documentation)
- [🔐 Authentication](#-authentication)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🌍 Real-Time Hazard Monitoring
- **Interactive Map Visualization** - View hazards on a live, interactive map powered by Leaflet and React Leaflet
- **WebSocket Notifications** - Instant real-time alerts when new hazards are reported using Socket.io
- **Geolocation Support** - Automatic location detection and nearby hazard discovery

### 📊 Comprehensive Reporting System
- **Multi-Step Report Wizard** - User-friendly interface to report ocean hazards (oil spills, debris, pollution, etc.)
- **Image Upload** - Attach visual evidence to hazard reports with Multer file handling
- **Severity Classification** - Rate hazards on a scale of 1-10 for priority response
- **Verification System** - Admin and AI-based verification to ensure report credibility

### 👥 User Management & Authentication
- **Secure JWT Authentication** - Stateless, token-based authentication system
- **Role-Based Access Control (RBAC)** - User and admin roles with different permissions
- **User Profiles** - Customizable profiles with geolocation and contact information
- **Account Security** - bcrypt password hashing with 12 salt rounds

### 🎛️ Admin Dashboard
- **Report Management** - Verify, decline, or delete hazard reports
- **User Administration** - Manage users, change roles, and monitor activity
- **Analytics & Insights** - Comprehensive statistics, charts, and geographic hotspots
- **Email Notifications** - Automated alerts to ocean authorities via Nodemailer

### 📰 News & Social Integration
- **Curated News Feed** - RSS feed aggregation from ocean conservation sources
- **Social Media Integration** - Reddit API integration for community discussions
- **Government Alerts** - Official warnings and announcements for ocean safety
- **Sentiment Analysis** - AI-powered sentiment analysis on news articles

### 📈 Advanced Analytics
- **Data Visualization** - Interactive charts using Recharts library
- **Geographic Hotspots** - Identify areas with highest hazard concentration
- **Trend Analysis** - Track hazards over time (daily, weekly, monthly)
- **Report Statistics** - Total reports, verified reports, severity distribution

### 🌤️ Weather Integration
- **Ocean Weather Data** - Real-time weather conditions using OpenWeather API
- **Wave Height & Wind Speed** - Marine-specific weather metrics
- **Location-Based Forecasts** - Weather data for specific coordinates

---

## 🛠️ Tech Stack

### Frontend (OceanFrontend)
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 19.2.0 |
| **TypeScript** | Type-safe JavaScript | 5.9.3 |
| **Vite** | Build tool & dev server | 7.2.2 |
| **React Router** | Client-side routing | 7.10.0 |
| **Leaflet** | Interactive maps | 1.9.4 |
| **React Leaflet** | React bindings for Leaflet | 5.0.0 |
| **Recharts** | Data visualization | 3.4.1 |
| **Tailwind CSS** | Utility-first CSS | 4.1.17 |
| **Socket.io Client** | Real-time WebSocket | 4.8.1 |

### Backend (oceanbackend)
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | - |
| **Express.js** | Web framework | 4.18.2 |
| **TypeScript** | Type-safe JavaScript | 5.3.3 |
| **MongoDB** | NoSQL database | - |
| **Mongoose** | MongoDB ODM | 8.0.3 |
| **Socket.io** | Real-time WebSocket server | 4.8.1 |
| **JWT** | Authentication tokens | 9.0.2 |
| **bcryptjs** | Password hashing | 2.4.3 |
| **Nodemailer** | Email service | 7.0.10 |
| **Multer** | File upload handling | 2.0.2 |
| **Zod** | Schema validation | 4.1.13 |
| **Axios** | HTTP client | 1.13.2 |
| **RSS Parser** | RSS feed aggregation | 3.13.0 |
| **Sentiment** | Text sentiment analysis | 5.0.2 |

### External APIs & Services
- **MongoDB Atlas** - Cloud-hosted MongoDB database
- **OpenWeather API** - Weather data and marine forecasts
- **Nominatim (OpenStreetMap)** - Reverse geocoding
- **Reddit API** - Social media integration
- **RSS Feeds** - Ocean conservation news sources
- **Gmail SMTP** - Email delivery via Nodemailer

---

## 📁 Project Structure

```
ocean/
├── OceanFrontend/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── HomePage.tsx
│   │   │   ├── MapPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ReportHazardWizard.tsx
│   │   │   ├── NewsFeedPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useGeolocation.ts
│   │   │   └── useNotifications.ts
│   │   ├── utils/          # Utility functions
│   │   │   └── api.ts      # API client
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── types.ts        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── oceanbackend/           # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── hazardController.ts
│   │   │   ├── adminController.ts
│   │   │   ├── newsController.ts
│   │   │   └── analyticsController.ts
│   │   ├── models/         # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── HazardReport.ts
│   │   │   ├── NewsArticle.ts
│   │   │   └── EmailNotification.ts
│   │   ├── routes/         # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── hazardRoutes.ts
│   │   │   ├── adminRoutes.ts
│   │   │   └── ...
│   │   ├── middleware/     # Express middleware
│   │   │   ├── auth.ts     # JWT authentication
│   │   │   ├── isAdmin.ts  # Admin authorization
│   │   │   ├── validate.ts # Input validation
│   │   │   └── upload.ts   # File upload (Multer)
│   │   ├── services/       # Business logic
│   │   │   ├── emailService.ts
│   │   │   ├── notificationService.ts
│   │   │   ├── rssFeedService.ts
│   │   │   └── socialMediaService.ts
│   │   ├── validators/     # Zod schemas
│   │   │   └── auth.ts
│   │   ├── config/         # Configuration
│   │   │   └── database.ts
│   │   ├── scripts/        # Utility scripts
│   │   │   ├── seedData.ts
│   │   │   └── createAdmin.ts
│   │   └── index.ts        # Entry point
│   ├── uploads/            # Uploaded files
│   ├── package.json
│   └── tsconfig.json
│
├── DEPLOYMENT.md           # Deployment guide
├── BACKEND_PRESENTATION_NOTES.md  # Technical documentation
├── build.bat               # Build script (Windows)
├── start.bat               # Start script (Windows)
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** - [Local installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kartik-py12/ocean.git
   cd ocean
   ```

2. **Install Backend Dependencies**
   ```bash
   cd oceanbackend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../OceanFrontend
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the `oceanbackend` directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/oceanguard
   # or use MongoDB Atlas connection string
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/oceanguard

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-in-production

   # Email Service (Gmail)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password

   # SMS Service (Twilio - Optional)
   TWILIO_ACCOUNT_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-token
   TWILIO_PHONE_NUMBER=your-twilio-phone

   # External APIs
   OPENWEATHER_API_KEY=your-openweather-api-key

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173

   # Server Port
   PORT=3000

   # Environment
   NODE_ENV=development
   ```

   Create a `.env` file in the `OceanFrontend` directory (optional for production):
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_SOCKET_URL=http://localhost:3000
   ```

5. **Seed Database (Optional)**

   Populate the database with sample data:
   ```bash
   cd oceanbackend
   npm run seed
   ```

6. **Create Admin User (Optional)**

   Create an admin account:
   ```bash
   npm run create-admin
   ```

### Running the Application

#### Development Mode

**Option 1: Run Backend and Frontend Separately**

Terminal 1 - Backend:
```bash
cd oceanbackend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd OceanFrontend
npm run dev
```

**Option 2: Use Batch Scripts (Windows)**

From the project root:
```bash
# Build both frontend and backend
build.bat

# Start both servers
start.bat
```

#### Production Mode

1. **Build the Application**
   ```bash
   cd oceanbackend
   npm run build
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

The application will be available at:
- **Frontend**: http://localhost:5173 (dev) or http://localhost:3000 (production)
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

---

## ⚙️ Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod --dbpath /path/to/data/directory
   ```
3. Use connection string: `mongodb://localhost:27017/oceanguard`

**Option 2: MongoDB Atlas (Recommended for Production)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP to the IP whitelist (or allow all: `0.0.0.0/0`)
4. Create a database user
5. Get your connection string and add it to `.env`

### Email Configuration (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security
   - Under "Signing in to Google", select "App passwords"
   - Generate a password for "Mail"
3. Add the email and app password to `.env`

### OpenWeather API

1. Sign up at [OpenWeather](https://openweathermap.org/api)
2. Generate a free API key
3. Add the key to `.env` as `OPENWEATHER_API_KEY`

---

## 📱 Usage Guide

### For Regular Users

1. **Create an Account**
   - Navigate to the signup page
   - Provide name, email, and password (min 6 characters)
   - Optionally add phone number and location

2. **Report a Hazard**
   - Click "Report Hazard" button
   - Select hazard type (Oil Spill, Debris, Pollution, etc.)
   - Choose location on map or use current location
   - Set severity level (1-10)
   - Add description and upload image (optional)
   - Submit report

3. **View Hazards on Map**
   - Navigate to Map page
   - View all verified hazards
   - Click markers for details
   - Filter by hazard type or severity

4. **Check News & Alerts**
   - View curated ocean conservation news
   - Read government alerts and warnings
   - Access social media discussions

5. **Monitor Analytics**
   - View platform-wide statistics
   - See geographic hotspots
   - Analyze trends over time

### For Administrators

1. **Access Admin Dashboard**
   - Login with admin credentials
   - Navigate to Admin Dashboard

2. **Manage Hazard Reports**
   - Review pending reports
   - Verify or decline reports
   - Add decline reasons (sent via email)
   - Delete inappropriate reports

3. **Manage Users**
   - View all registered users
   - Change user roles (user ↔ admin)
   - Suspend or activate accounts
   - Delete user accounts

4. **Post Government Alerts**
   - Create official alerts and warnings
   - Broadcast to all users via Socket.io
   - Track alert engagement

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "location": {
    "type": "Point",
    "coordinates": [-120.5, 35.2]
  }
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST `/auth/login`
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Hazard Report Endpoints

#### POST `/hazards` (Protected)
Create a new hazard report.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `type`: String (Oil Spill, Debris, Pollution, Other)
- `location[lat]`: Number
- `location[lng]`: Number
- `severity`: Number (1-10)
- `description`: String (optional)
- `image`: File (optional)

**Response (201):**
```json
{
  "message": "Hazard report created successfully",
  "data": {
    "_id": "64xyz789",
    "type": "Oil Spill",
    "location": { "lat": 35.2, "lng": -120.5 },
    "severity": 8,
    "verificationStatus": "unverified",
    "reportedBy": "64abc123",
    "createdAt": "2025-12-18T10:30:00Z"
  }
}
```

#### GET `/hazards`
Get all verified hazard reports.

**Query Parameters:**
- `type`: Filter by hazard type
- `verified`: Boolean (filter by verification status)

**Response (200):**
```json
{
  "message": "Hazards retrieved successfully",
  "data": [
    {
      "_id": "64xyz789",
      "type": "Oil Spill",
      "location": { "lat": 35.2, "lng": -120.5 },
      "severity": 8,
      "verificationStatus": "admin-verified",
      "createdAt": "2025-12-18T10:30:00Z"
    }
  ]
}
```

### Admin Endpoints

#### GET `/admin/dashboard/stats` (Admin Only)
Get dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{
  "message": "Dashboard statistics retrieved",
  "data": {
    "totalReports": 245,
    "verifiedReports": 198,
    "pendingReports": 47,
    "totalUsers": 1523,
    "activeUsers": 1401,
    "reportsByType": {
      "Oil Spill": 89,
      "Debris": 67,
      "Pollution": 54
    }
  }
}
```

#### PUT `/admin/reports/:id/verify` (Admin Only)
Verify a hazard report.

**Response (200):**
```json
{
  "message": "Report verified successfully",
  "data": { ... }
}
```

#### PUT `/admin/reports/:id/decline` (Admin Only)
Decline and delete a report.

**Request Body:**
```json
{
  "reason": "Insufficient evidence or duplicate report"
}
```

**Response (200):**
```json
{
  "message": "Report declined and user notified"
}
```

### Analytics Endpoints

#### GET `/analytics`
Get comprehensive platform analytics.

**Response (200):**
```json
{
  "message": "Analytics retrieved successfully",
  "data": {
    "totalReports": 245,
    "verifiedReports": 198,
    "avgSeverity": 6.3,
    "reportsByType": [...],
    "severityDistribution": [...],
    "reportsOverTime": [...],
    "geographicHotspots": [...]
  }
}
```

### Real-Time Events (Socket.io)

**Connect:**
```javascript
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
```

**Events:**
- `hazard-reported` - New hazard created
- `hazard-verified` - Hazard verified by admin
- `government-alert` - New government alert posted

**Example:**
```javascript
socket.on('hazard-reported', (data) => {
  console.log('New hazard:', data);
  // Update UI
});
```

---

## 🔐 Authentication

### JWT Token Authentication

OceanGuard uses **stateless JWT authentication**:

1. **User Login** → Server generates JWT token
2. **Token Storage** → Client stores token in localStorage
3. **Authenticated Requests** → Client sends token in Authorization header
4. **Token Verification** → Server verifies signature and extracts user data

**Token Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiration:** 7 days

### Password Security

- **Hashing Algorithm:** bcrypt with 12 salt rounds
- **Minimum Length:** 6 characters
- **Storage:** Hashed passwords only, never plain text
- **Comparison:** Secure timing-safe comparison

### Role-Based Access Control (RBAC)

| Route | User | Admin |
|-------|------|-------|
| View hazards | ✅ | ✅ |
| Report hazard | ✅ | ✅ |
| Verify reports | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| Delete reports | ❌ | ✅ |
| Admin dashboard | ❌ | ✅ |

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Setup:**
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

**Important Notes:**
- Vercel serverless functions don't support persistent WebSocket connections
- Socket.io will fallback to HTTP polling (less efficient)
- Consider deploying backend separately on Railway/Render

### Railway Deployment (Backend)

```bash
cd oceanbackend
railway login
railway init
railway up
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure MongoDB Atlas with IP whitelist
- [ ] Set up Gmail app password for emails
- [ ] Configure CORS with specific frontend URL
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry)
- [ ] Implement rate limiting
- [ ] Use cloud storage for uploads (Cloudinary/S3)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs** - Open an issue with detailed steps to reproduce
2. **Suggest Features** - Share your ideas for new features
3. **Submit Pull Requests** - Fix bugs or add features
4. **Improve Documentation** - Help make docs clearer
5. **Write Tests** - Increase code coverage

### Development Workflow

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/ocean.git
   cd ocean
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   # Backend
   cd oceanbackend
   npm run build
   npm run dev

   # Frontend
   cd OceanFrontend
   npm run build
   npm run dev
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Use **meaningful variable names**
- Write **self-documenting code**
- Add **comments** for complex logic
- Keep functions **small and focused**
- Use **async/await** over callbacks

---

## 📄 License

This project is licensed under the **ISC License**.

```
Copyright (c) 2025 OceanGuard

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 🙏 Acknowledgments

- **OpenStreetMap & Nominatim** - Geocoding services
- **OpenWeather** - Weather data API
- **React** - UI framework
- **Node.js & Express** - Backend infrastructure
- **MongoDB** - Database
- **Socket.io** - Real-time communication
- **Leaflet** - Interactive maps
- **All Contributors** - Thank you for making OceanGuard better!

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/kartik-py12/ocean/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kartik-py12/ocean/discussions)

---

## 🌟 Star This Repository!

If you find OceanGuard useful, please consider giving it a ⭐ on GitHub. It helps us reach more people and makes the project more visible!

---

<div align="center">

**Made with ❤️ for the Oceans**

*Together, we can make a difference in ocean conservation*

</div>
