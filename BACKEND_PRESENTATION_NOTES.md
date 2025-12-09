# OceanGuard Backend - Complete Technical Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Why TypeScript Over JavaScript](#why-typescript)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [Tech Stack & Libraries](#tech-stack--libraries)
5. [Authentication & Session Management](#authentication--session-management)
6. [REST API Design](#rest-api-design)
7. [Database & Models](#database--models)
8. [Middleware Explained](#middleware-explained)
9. [Real-time Communication](#real-time-communication)
10. [External API Integrations](#external-api-integrations)
11. [Security Implementations](#security-implementations)
12. [Error Handling](#error-handling)
13. [Interview Q&A Preparation](#interview-qa-preparation)

---

## 🎯 Project Overview

**OceanGuard** is a real-time ocean hazard monitoring and reporting system. Users can:
- Report ocean hazards (oil spills, debris, pollution, etc.)
- View hazards on an interactive map
- Receive real-time notifications
- Read curated news about ocean disasters
- Get government alerts and weather data

**Your Role:** Backend API development, database design, authentication, real-time notifications

---

## 🔷 Why TypeScript Over JavaScript

### What is TypeScript?
TypeScript is a **superset of JavaScript** that adds **static typing**. Every valid JavaScript code is valid TypeScript, but TypeScript adds type checking at compile time.

### Key Differences:

| Feature | JavaScript | TypeScript |
|---------|-----------|-----------|
| **Type System** | Dynamic (runtime) | Static (compile-time) |
| **Error Detection** | Runtime errors | Compile-time errors |
| **IDE Support** | Limited autocomplete | Rich IntelliSense |
| **Refactoring** | Risky, manual | Safe, automated |
| **Documentation** | Comments only | Types serve as docs |

### Why We Chose TypeScript:

1. **Type Safety**
   ```typescript
   // TypeScript catches this BEFORE running:
   function addNumbers(a: number, b: number): number {
       return a + b;
   }
   addNumbers("5", "10"); // ❌ Compile Error: string is not assignable to number
   ```

2. **Better Code Completion**
   - When you type `req.`, IDE shows all Request properties
   - When you type `user.`, IDE shows name, email, password, etc.

3. **Early Bug Detection**
   ```typescript
   interface User {
       name: string;
       email: string;
   }
   
   const user: User = {
       nam: "John",  // ❌ Error: Did you mean 'name'?
       email: "john@example.com"
   };
   ```

4. **Easier Refactoring**
   - Rename a property across entire codebase safely
   - Change function signature and TypeScript shows all places that need updating

5. **Self-Documenting Code**
   ```typescript
   // TypeScript
   function createUser(data: { name: string; email: string; password: string }): Promise<IUser>
   
   // JavaScript - Need to read docs or code to know what to pass
   function createUser(data) { ... }
   ```

### TypeScript Concepts Used in Our Project:

1. **Interfaces** - Define object shapes
   ```typescript
   export interface IUser extends Document {
       name: string;
       email: string;
       password: string;
       role: 'user' | 'admin';
   }
   ```

2. **Types** - Custom type definitions
   ```typescript
   type UserRole = 'user' | 'admin';
   type AuthRequest = Request & { user?: IUser };
   ```

3. **Generics** - Reusable type parameters
   ```typescript
   Promise<IUser>  // Promise that resolves to IUser
   Array<string>   // Array of strings
   ```

4. **Enums** (not used much, but good to know)
   ```typescript
   enum HazardType {
       OilSpill = "Oil Spill",
       Debris = "Debris"
   }
   ```

---

## 🏗️ Architecture & Design Patterns

### MVC Pattern (Model-View-Controller)

We use a variation called **Model-Routes-Controller-Services**:

```
┌─────────────┐
│   Client    │ (Frontend - React)
└──────┬──────┘
       │ HTTP Request
       ↓
┌─────────────────────────────────────┐
│         ROUTES (Router)              │  ← Define endpoints
│  /api/auth, /api/hazards, etc.      │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│      MIDDLEWARE (Guards)             │  ← Auth, Validation
│  authenticate(), validate()          │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│    CONTROLLERS (Business Logic)      │  ← Handle requests
│  authController, hazardController    │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│    SERVICES (Reusable Logic)         │  ← Email, SMS, etc.
│  emailService, notificationService   │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│      MODELS (Data Layer)             │  ← Database schemas
│  User, HazardReport, NewsArticle    │
└──────┬──────────────────────────────┘
       │
       ↓
┌─────────────┐
│  MongoDB    │
└─────────────┘
```

### Directory Structure:
```
src/
├── index.ts              # Entry point - Express app setup
├── config/
│   └── database.ts       # MongoDB connection
├── models/              # Database schemas (Mongoose)
│   ├── User.ts
│   ├── HazardReport.ts
│   ├── NewsArticle.ts
│   └── EmailNotification.ts
├── controllers/         # Business logic (handle requests)
│   ├── authController.ts
│   ├── hazardController.ts
│   ├── adminController.ts
│   └── analyticsController.ts
├── routes/             # API endpoints definition
│   ├── authRoutes.ts
│   ├── hazardRoutes.ts
│   └── adminRoutes.ts
├── middleware/         # Request interceptors
│   ├── auth.ts         # JWT verification
│   ├── isAdmin.ts      # Admin role check
│   ├── validate.ts     # Input validation
│   └── upload.ts       # File upload (multer)
├── services/          # Reusable business logic
│   ├── emailService.ts
│   ├── notificationService.ts
│   ├── rssFeedService.ts
│   └── oceanWeatherService.ts
├── validators/        # Validation schemas (Zod)
│   └── auth.ts
└── scripts/          # Utility scripts
    ├── createAdmin.ts
    └── seedData.ts
```

---

## 📚 Tech Stack & Libraries

### Core Dependencies:

#### 1. **Express.js** - Web Framework
```typescript
import express from 'express';
const app = express();
```
**What it does:** 
- Handles HTTP requests/responses
- Routing (GET, POST, PUT, DELETE)
- Middleware pipeline
- Creates RESTful APIs

**Why we use it:**
- Most popular Node.js framework
- Minimalist and flexible
- Large ecosystem of middleware

#### 2. **Mongoose** - MongoDB ODM (Object Document Mapper)
```typescript
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI);
```
**What it does:**
- Provides schemas for MongoDB (which is schema-less)
- Data validation before saving
- Query builder
- Middleware hooks (pre/post save)

**Example:**
```typescript
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
});
```

#### 3. **bcryptjs** - Password Hashing
```typescript
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 12);
const isMatch = await bcrypt.compare(inputPassword, storedHash);
```
**What it does:**
- Hashes passwords before storing in database
- Verifies passwords during login
- Uses salt rounds (12) for security

**Why not store plain passwords?**
- If database is hacked, attackers can't read passwords
- Even admin can't see user's actual password

#### 4. **jsonwebtoken (JWT)** - Authentication
```typescript
import jwt from 'jsonwebtoken';
const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' });
const decoded = jwt.verify(token, SECRET);
```
**What it does:**
- Creates encrypted tokens containing user data
- Used for stateless authentication
- No need to store sessions in database

**How it works:**
```
Login → Generate JWT → Send to client → Client stores in localStorage
↓
Every Request → Client sends JWT in header → Server verifies → Allow/Deny
```

#### 5. **Nodemailer** - Email Service
```typescript
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransporter({ /* config */ });
await transporter.sendMail({ from, to, subject, html });
```
**What it does:**
- Sends emails (hazard notifications, decline reasons)
- Works with Gmail, SMTP servers

**Used for:**
- Email notifications to ocean authorities
- User notifications (report declined)

#### 6. **Socket.io** - Real-time Communication
```typescript
import { Server } from 'socket.io';
const io = new Server(httpServer);
io.emit('hazard-reported', data); // Broadcast to all clients
```
**What it does:**
- WebSocket connection for real-time updates
- Push notifications from server to client
- Bidirectional communication

**Used for:**
- Real-time hazard alerts on map
- Live notifications

#### 7. **Multer** - File Upload
```typescript
import multer from 'multer';
const upload = multer({ dest: 'uploads/hazards/' });
router.post('/upload', upload.single('image'), handler);
```
**What it does:**
- Handles multipart/form-data (file uploads)
- Saves uploaded images to disk
- Configures file size limits, file types

**Used for:**
- Uploading hazard report images

#### 8. **express-validator / Zod** - Input Validation
```typescript
import { z } from 'zod';
const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
});
```
**What it does:**
- Validates request body before processing
- Prevents invalid data from entering database
- Returns validation errors to client

#### 9. **CORS** - Cross-Origin Resource Sharing
```typescript
import cors from 'cors';
app.use(cors()); // Allow frontend (different origin) to call API
```
**What it does:**
- Allows React frontend (localhost:5173) to call Express backend (localhost:3000)
- Without CORS: browsers block requests to different domains

#### 10. **dotenv** - Environment Variables
```typescript
import dotenv from 'dotenv';
dotenv.config(); // Loads .env file into process.env
console.log(process.env.MONGO_URI);
```
**What it does:**
- Reads `.env` file and makes variables available
- Keeps secrets out of code (API keys, passwords)

#### 11. **Axios** - HTTP Client
```typescript
import axios from 'axios';
const response = await axios.get('https://api.openweathermap.org/data/2.5/weather');
```
**What it does:**
- Makes HTTP requests to external APIs
- Used for OpenWeather API, Reddit API, etc.

#### 12. **RSS Parser** - Feed Reader
```typescript
import Parser from 'rss-parser';
const feed = await parser.parseURL('https://example.com/rss');
```
**What it does:**
- Reads RSS feeds from news websites
- Parses XML into JavaScript objects

---

## 🔐 Authentication & Session Management

### JWT-Based Authentication (Stateless)

#### Traditional Session-Based Auth (OLD WAY):
```
1. User logs in
2. Server creates session, stores in database/memory
3. Server sends session ID cookie to client
4. Client sends cookie on every request
5. Server looks up session in database

❌ Problems:
- Server must store sessions (memory/database)
- Hard to scale (load balancers need sticky sessions)
- Database query on every request
```

#### JWT-Based Auth (OUR WAY):
```
1. User logs in
2. Server creates JWT token (encrypted JSON with user data)
3. Server sends token to client
4. Client stores token (localStorage)
5. Client sends token in Authorization header
6. Server verifies token signature (no database lookup!)

✅ Benefits:
- No server-side storage needed
- Easy to scale (any server can verify token)
- Fast (no database queries)
```

### How Our Auth Works:

#### 1. **Signup Flow**
```typescript
// authController.ts
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user (password auto-hashed in pre-save hook)
    const user = await User.create({ name, email, password });
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    
    // Send token to client
    res.status(201).json({ token, user: { id, name, email, role } });
};
```

#### 2. **Login Flow**
```typescript
export const login = async (req, res) => {
    const { email, password } = req.body;
    
    // Find user (include password field - normally excluded)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare password with hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    
    res.json({ token, user: { id, name, email, role } });
};
```

#### 3. **Password Hashing (Automatic)**
```typescript
// User.ts model
UserSchema.pre('save', async function(next) {
    // Only hash if password is modified
    if (!this.isModified('password')) return next();
    
    // Hash with 12 salt rounds
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare method
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
```

#### 4. **Protected Routes (Middleware)**
```typescript
// middleware/auth.ts
export const authenticate = async (req, res, next) => {
    // Extract token from header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // Attach user to request object
        req.user = user;
        next(); // Proceed to controller
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
```

#### 5. **Admin-Only Routes**
```typescript
// middleware/isAdmin.ts
export const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    // Check if user is admin and active
    if (user.role !== 'admin' || !user.isActive) {
        return res.status(403).json({ message: 'Access denied' });
    }
    
    req.user = user;
    next();
};
```

### Frontend Integration:
```typescript
// Login request
const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
const { token } = await response.json();

// Store token
localStorage.setItem('token', token);

// Use token in subsequent requests
fetch('/api/hazards', {
    headers: { 
        'Authorization': `Bearer ${token}` 
    }
});
```

### Session Management:
- **No server-side sessions** - JWT is self-contained
- **Token Expiration**: 7 days (configured in JWT sign)
- **Logout**: Client deletes token from localStorage
- **Token Refresh**: Not implemented (user must re-login after 7 days)

---

## 🌐 REST API Design

### What is REST?
**REST** (Representational State Transfer) is an architectural style for APIs.

### REST Principles:

1. **Resource-Based** - Everything is a "resource" (user, hazard, article)
2. **HTTP Methods** - Use standard HTTP verbs
3. **Stateless** - Each request is independent
4. **JSON Format** - Data sent as JSON

### HTTP Methods Used:

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | `GET /api/hazards` - Get all hazards |
| **POST** | Create new resource | `POST /api/auth/signup` - Create user |
| **PUT** | Update entire resource | `PUT /api/admin/reports/:id/verify` |
| **PATCH** | Update part of resource | `PATCH /api/user/profile` |
| **DELETE** | Delete resource | `DELETE /api/admin/reports/:id` |

### Our API Endpoints:

#### **Authentication Routes** (`/api/auth`)
```typescript
POST   /api/auth/signup          # Create new user
POST   /api/auth/login           # Login user
GET    /api/auth/verify-token    # Check if token is valid
```

#### **Hazard Routes** (`/api/hazards`)
```typescript
POST   /api/hazards              # Create hazard report (authenticated)
GET    /api/hazards              # Get all hazards (public)
GET    /api/hazards/:id          # Get single hazard
PUT    /api/hazards/:id          # Update hazard (owner only)
DELETE /api/hazards/:id          # Delete hazard (owner only)
GET    /api/hazards/nearby       # Get hazards near location
```

#### **Admin Routes** (`/api/admin`)
```typescript
GET    /api/admin/dashboard/stats       # Dashboard statistics
GET    /api/admin/reports               # All reports with filters
PUT    /api/admin/reports/:id/verify    # Verify report
PUT    /api/admin/reports/:id/decline   # Decline & delete report
DELETE /api/admin/reports/:id           # Delete report
GET    /api/admin/users                 # All users
PUT    /api/admin/users/:id/role        # Change user role
PUT    /api/admin/users/:id/toggle-status  # Activate/suspend user
DELETE /api/admin/users/:id             # Delete user
```

#### **User Routes** (`/api/user`)
```typescript
GET    /api/user/profile         # Get current user profile
PATCH  /api/user/profile         # Update profile
GET    /api/user/reports         # User's hazard reports
```

#### **News Routes** (`/api/news`)
```typescript
GET    /api/news                 # Get curated news
GET    /api/news/fetch           # Fetch from RSS feeds
```

#### **Analytics Routes** (`/api/analytics`)
```typescript
GET    /api/analytics            # Complete platform statistics
// Returns: totalReports, verifiedReports, avgSeverity, 
//          reportsByType, severityDistribution, 
//          reportsOverTime, geographicHotspots
```

#### **Geocoding Routes** (`/api/geocode`)
```typescript
GET    /api/geocode/reverse      # Reverse geocode coordinates to location name
// Query params: ?lat=31.33&lon=75.58
// Returns: { display_name: "Jalandhar, Punjab, India, ..." }
// Note: Proxies Nominatim API to avoid CORS issues
```

### API Response Format:

**Success Response:**
```json
{
    "message": "Hazard report created successfully",
    "data": {
        "_id": "abc123",
        "type": "Oil Spill",
        "location": { "lat": 30.5, "lng": -120.3 },
        "severity": 8,
        "createdAt": "2025-12-08T10:30:00Z"
    }
}
```

**Error Response:**
```json
{
    "message": "Authentication required",
    "errors": [
        { "field": "email", "message": "Invalid email format" }
    ]
}
```

### Status Codes Used:

| Code | Meaning | When Used |
|------|---------|-----------|
| **200** | OK | Successful GET/PUT/DELETE |
| **201** | Created | Successful POST (resource created) |
| **400** | Bad Request | Validation errors, invalid input |
| **401** | Unauthorized | Missing or invalid token |
| **403** | Forbidden | Valid token but insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Unexpected server errors |

---

## 💾 Database & Models

### MongoDB Choice:
**Why MongoDB (NoSQL) instead of MySQL (SQL)?**

| Feature | MongoDB | MySQL |
|---------|---------|-------|
| **Schema** | Flexible (documents can vary) | Rigid (fixed columns) |
| **Data Format** | JSON-like (BSON) | Tables with rows |
| **Relationships** | Embedded or referenced | Foreign keys, joins |
| **Scaling** | Horizontal (add servers) | Vertical (bigger server) |
| **Use Case** | Rapidly changing schema | Fixed, complex relationships |

**Our choice:** MongoDB because:
1. Hazard reports have varying properties
2. Easy to add new fields without migrations
3. JSON format matches JavaScript/TypeScript
4. Good for geospatial queries (finding nearby hazards)

### Mongoose Models:

#### 1. **User Model**
```typescript
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: 'user' | 'admin';
    isActive: boolean;
    location?: {
        type: 'Point';
        coordinates: [number, number]; // [lng, lat]
    };
    createdAt: Date;
}

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,  // Creates index for fast lookups
        lowercase: true,
        match: /^\S+@\S+\.\S+$/  // Email validation regex
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6,
        select: false  // Don't include in queries by default
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'],  // Only these values allowed
        default: 'user' 
    },
    location: {
        type: { type: String, enum: ['Point'] },
        coordinates: [Number]  // GeoJSON format
    }
});

// Geospatial index for location queries
UserSchema.index({ location: '2dsphere' });

// Pre-save hook to hash password
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
```

**Key Concepts:**
- **`select: false`** - Password never returned in queries (must explicitly include with `.select('+password')`)
- **`unique: true`** - Creates unique index, prevents duplicate emails
- **Pre-save hook** - Runs before document is saved (auto-hash password)
- **Instance methods** - Functions available on each document
- **GeoJSON** - Standard format for geographic data

#### 2. **HazardReport Model**
```typescript
interface IHazardReport extends Document {
    type: string;
    location: { lat: number; lng: number };
    severity: number; // 1-10
    description?: string;
    imageUrl?: string;
    verificationStatus: 'unverified' | 'admin-verified' | 'ai-verified';
    reportedBy: mongoose.Types.ObjectId;  // Reference to User
    verifiedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
}

const HazardReportSchema = new Schema({
    type: { 
        type: String, 
        required: true,
        enum: ['Oil Spill', 'Debris', 'Pollution', 'Other']
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    severity: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 10 
    },
    reportedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  // Reference to User collection
        required: true 
    },
    verificationStatus: {
        type: String,
        enum: ['unverified', 'admin-verified', 'ai-verified'],
        default: 'unverified'
    }
}, {
    timestamps: true  // Auto-creates createdAt and updatedAt
});
```

**Key Concepts:**
- **`ref: 'User'`** - Creates relationship to User model
- **`timestamps: true`** - Auto-adds createdAt, updatedAt fields
- **Enums** - Restrict values to specific options
- **Min/Max validation** - Ensure severity is 1-10

#### 3. **NewsArticle Model**
```typescript
const NewsArticleSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    imageUrl: String,
    category: String,
    date: { type: Date, default: Date.now },
    source: String,  // 'rss-feed' or 'hazard-report'
    verificationStatus: {
        type: String,
        enum: ['unverified', 'verified'],
        default: 'unverified'
    },
    hazardReportId: { 
        type: Schema.Types.ObjectId, 
        ref: 'HazardReport' 
    }
});
```

#### 4. **EmailNotification Model**
```typescript
const EmailNotificationSchema = new Schema({
    reportId: { type: Schema.Types.ObjectId, ref: 'HazardReport' },
    type: String,
    location: { lat: Number, lng: Number },
    emailSent: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now }
});
```

### Database Queries Examples:

```typescript
// Find all hazards
const hazards = await HazardReport.find();

// Find with filter
const oilSpills = await HazardReport.find({ type: 'Oil Spill' });

// Find with population (join)
const hazard = await HazardReport.findById(id)
    .populate('reportedBy', 'name email'); // Include user's name and email

// Find nearby hazards (geospatial query)
const nearby = await HazardReport.find({
    'location.lat': { $gte: lat - 0.5, $lte: lat + 0.5 },
    'location.lng': { $gte: lng - 0.5, $lte: lng + 0.5 }
});

// Aggregation (count by type)
const stats = await HazardReport.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } }
]);

// Complex aggregation (Geographic Hotspots)
const geographicHotspots = await HazardReport.aggregate([
    // Stage 1: Filter out reports without location
    { $match: { location: { $exists: true } } },
    
    // Stage 2: Create location string from coordinates
    {
        $addFields: {
            locationString: {
                $concat: [
                    { $toString: { $round: ['$location.lat', 2] } },
                    '°, ',
                    { $toString: { $round: ['$location.lng', 2] } },
                    '°'
                ]
            }
        }
    },
    
    // Stage 3: Group by location and calculate stats
    {
        $group: {
            _id: '$locationString',
            count: { $sum: 1 },                    // Total reports
            avgSeverity: { $avg: '$severity' },    // Average severity
            verified: { $sum: { $cond: ['$verified', 1, 0] } }, // Count verified
            lat: { $first: '$location.lat' },      // Keep coordinates
            lng: { $first: '$location.lng' }
        }
    },
    
    // Stage 4: Sort by count (descending)
    { $sort: { count: -1 } },
    
    // Stage 5: Limit to top 10
    { $limit: 10 },
    
    // Stage 6: Format output
    {
        $project: {
            location: '$_id',
            count: 1,
            avgSeverity: { $round: ['$avgSeverity', 1] },
            verified: 1,
            lat: 1,
            lng: 1,
            _id: 0
        }
    }
]);
```

### Real-World Analytics Controller Example:

```typescript
// controllers/analyticsController.ts
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Basic counts
    const totalReports = await HazardReport.countDocuments();
    const verifiedReports = await HazardReport.countDocuments({ verified: true });
    
    // Average severity
    const avgSeverity = await HazardReport.aggregate([
      { $group: { _id: null, avgSeverity: { $avg: '$severity' } } }
    ]);
    
    // Reports by type (Oil Spill, Debris, etc.)
    const reportsByType = await HazardReport.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    // Severity distribution (buckets: 0-3, 4-6, 7-9, 10+)
    const severityDistribution = await HazardReport.aggregate([
      {
        $bucket: {
          groupBy: '$severity',
          boundaries: [0, 4, 7, 9, 11],
          default: 'other',
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    
    // Reports over time (last 28 days)
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    
    const reportsOverTime = await HazardReport.aggregate([
      { $match: { createdAt: { $gte: fourWeeksAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Geographic hotspots (top 10 locations)
    const geographicHotspots = await HazardReport.aggregate([
      { $match: { location: { $exists: true } } },
      {
        $addFields: {
          locationString: {
            $concat: [
              { $toString: { $round: ['$location.lat', 2] } },
              '°, ',
              { $toString: { $round: ['$location.lng', 2] } },
              '°'
            ]
          }
        }
      },
      {
        $group: {
          _id: '$locationString',
          count: { $sum: 1 },
          avgSeverity: { $avg: '$severity' },
          verified: { $sum: { $cond: ['$verified', 1, 0] } },
          lat: { $first: '$location.lat' },
          lng: { $first: '$location.lng' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          location: '$_id',
          count: 1,
          avgSeverity: { $round: ['$avgSeverity', 1] },
          verified: 1,
          lat: 1,
          lng: 1,
          _id: 0
        }
      }
    ]);
    
    res.status(200).json({
      message: 'Analytics retrieved successfully',
      data: {
        totalReports,
        verifiedReports,
        avgSeverity: avgSeverity[0]?.avgSeverity || 0,
        reportsByType,
        severityDistribution,
        reportsOverTime,
        geographicHotspots
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: error.message || 'Error retrieving analytics' 
    });
  }
};
```

**Key Aggregation Concepts:**
- **`$group`** - Groups documents by specified field
- **`$sum`** - Counts or sums values
- **`$avg`** - Calculates average
- **`$bucket`** - Creates ranges/buckets
- **`$dateToString`** - Formats dates
- **`$match`** - Filters documents (like WHERE in SQL)
- **`$sort`** - Sorts results
- **`$limit`** - Limits number of results
- **`$project`** - Selects which fields to return
- **`$addFields`** - Adds computed fields
- **`$concat`** - Combines strings
- **`$round`** - Rounds numbers

---

## 🛡️ Middleware Explained

Middleware are functions that run **between** receiving a request and sending a response.

### Request Pipeline:
```
Request → Middleware 1 → Middleware 2 → Controller → Response
                ↓               ↓
            (CORS)        (Authentication)
```

### 1. **Built-in Express Middleware**
```typescript
// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Enable CORS (cross-origin requests)
app.use(cors());
```

### 2. **Authentication Middleware**
```typescript
// middleware/auth.ts
export const authenticate = async (req, res, next) => {
    // 1. Extract token from header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Get user from database
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        // 4. Attach user to request
        req.user = user;
        
        // 5. Continue to next middleware/controller
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Usage in routes:
router.get('/profile', authenticate, getProfile);
//                     ↑ Runs before getProfile
```

### 3. **Admin Authorization Middleware**
```typescript
// middleware/isAdmin.ts
export const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (user.role !== 'admin' || !user.isActive) {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    req.user = user;
    next();
};

// Usage:
router.delete('/reports/:id', isAdmin, deleteReport);
//                             ↑ Only admins can delete
```

### 4. **Validation Middleware (Zod)**
```typescript
// validators/auth.ts
import { z } from 'zod';

export const signupSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })
});

// middleware/validate.ts
export const validate = (schema: any) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req);
            next();
        } catch (error) {
            res.status(400).json({ 
                message: 'Validation failed', 
                errors: error.errors 
            });
        }
    };
};

// Usage:
router.post('/signup', validate(signupSchema), signup);
//                     ↑ Validates request body first
```

### 5. **File Upload Middleware (Multer)**
```typescript
// middleware/upload.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/hazards/');  // Save location
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files allowed'), false);
    }
};

export const upload = multer({ 
    storage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Usage:
router.post('/hazards', upload.single('image'), createHazard);
//                      ↑ Handles file upload
```

### 6. **Error Handling Middleware**
```typescript
// index.ts
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!', 
        error: err.message 
    });
});
```

### Middleware Execution Order:
```typescript
// This order matters!
app.use(cors());                    // 1. Enable CORS first
app.use(express.json());            // 2. Parse JSON
app.use('/uploads', express.static('uploads')); // 3. Serve files

app.use('/api/auth', authRoutes);   // 4. Public routes
app.use('/api/hazards', authenticate, hazardRoutes); // 5. Protected routes

app.use(errorHandler);              // 6. Error handler (last!)
```

---

## 🔴 Real-time Communication (Socket.io)

### What is Socket.io?
Socket.io enables **real-time, bidirectional** communication between client and server using **WebSockets**.

### WebSocket vs HTTP:

| HTTP | WebSocket |
|------|-----------|
| Request-response only | Full-duplex (both can send anytime) |
| Client must ask for updates | Server pushes updates |
| New connection each request | Single persistent connection |
| Good for: APIs, loading pages | Good for: Chat, live updates, notifications |

### Our Socket.io Setup:

#### Server-Side (Backend):
```typescript
// index.ts
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);

// Initialize Socket.io
export const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || '*',
        methods: ['GET', 'POST']
    }
});

// Connection event
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Use httpServer instead of app
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

#### Emitting Events from Controllers:
```typescript
// hazardController.ts
import { io } from '../index';

export const createHazardReport = async (req, res) => {
    // ... create hazard in database ...
    
    // Broadcast to all connected clients
    io.emit('hazard-reported', {
        id: hazard._id,
        type: hazard.type,
        location: hazard.location,
        severity: hazard.severity,
        createdAt: hazard.createdAt
    });
    
    console.log('Socket.io event emitted');
    res.status(201).json({ message: 'Hazard created', data: hazard });
};
```

#### Client-Side (Frontend):
```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Listen for hazard events
socket.on('hazard-reported', (data) => {
    console.log('New hazard:', data);
    // Update map, show notification, etc.
});

// Disconnect on cleanup
socket.disconnect();
```

### Events We Emit:
- **`hazard-reported`** - When new hazard is created
- **`hazard-verified`** - When admin verifies hazard
- **`government-alert`** - New government alert posted

---

## 🌍 External API Integrations

### 1. **OpenStreetMap Nominatim (Geocoding)**

**Purpose:** Convert coordinates to location names

```typescript
// index.ts
app.get('/api/geocode/reverse', async (req, res) => {
    const { lat, lon } = req.query;
    
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
            headers: {
                'User-Agent': 'OceanGuard/1.0',
                'Accept': 'application/json'
            }
        }
    );
    
    const data = await response.json();
    res.json(data);
});
```

**Why we proxy it:** 
- Nominatim requires User-Agent header
- Frontend can't set custom headers (CORS)
- Backend acts as proxy to add headers

### 2. **OpenWeather API**

**Purpose:** Get ocean weather conditions

```typescript
// services/oceanWeatherService.ts
import axios from 'axios';

export const getOceanWeather = async (lat: number, lon: number) => {
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric'
            }
        }
    );
    
    return {
        temperature: response.data.main.temp,
        windSpeed: response.data.wind.speed,
        waveHeight: response.data.waves?.height || 'N/A'
    };
};
```

### 3. **RSS Feeds (News Aggregation)**

**Purpose:** Fetch ocean-related news

```typescript
// services/rssFeedService.ts
import Parser from 'rss-parser';

const parser = new Parser();

export const fetchOceanNews = async () => {
    const feeds = [
        'https://oceanconservancy.org/feed/',
        'https://www.noaa.gov/rss/feed.xml'
    ];
    
    const articles = [];
    
    for (const feedUrl of feeds) {
        try {
            const feed = await parser.parseURL(feedUrl);
            
            feed.items.forEach(item => {
                articles.push({
                    title: item.title,
                    summary: item.contentSnippet,
                    link: item.link,
                    date: new Date(item.pubDate),
                    source: feed.title
                });
            });
        } catch (error) {
            console.error(`Failed to fetch ${feedUrl}:`, error);
        }
    }
    
    return articles;
};
```

### 4. **Reddit API (Social Media Integration)**

**Purpose:** Fetch ocean-related posts from Reddit

```typescript
// services/socialMediaService.ts
import axios from 'axios';

export const fetchRedditPosts = async () => {
    const subreddits = ['ocean', 'oceanography', 'MarineBiology'];
    const posts = [];
    
    for (const subreddit of subreddits) {
        const response = await axios.get(
            `https://www.reddit.com/r/${subreddit}/hot.json`,
            { params: { limit: 10 } }
        );
        
        response.data.data.children.forEach(post => {
            posts.push({
                title: post.data.title,
                content: post.data.selftext,
                url: `https://reddit.com${post.data.permalink}`,
                upvotes: post.data.ups,
                author: post.data.author,
                created: new Date(post.data.created_utc * 1000)
            });
        });
    }
    
    return posts;
};
```

**Reddit API:**
- **No API key needed** for public data
- Uses JSON endpoint: `/r/{subreddit}/hot.json`
- Rate limited (don't spam requests)

---

## 🔒 Security Implementations

### 1. **Password Security**
```typescript
// Hashing with bcrypt (12 salt rounds)
const hashedPassword = await bcrypt.hash(password, 12);

// Never store plain passwords
// Never log passwords
// Never send passwords in responses
```

### 2. **JWT Security**
```typescript
// Use strong secret (in .env)
JWT_SECRET=your-super-secret-random-string-change-in-production

// Set expiration
jwt.sign({ userId }, SECRET, { expiresIn: '7d' });

// Verify on every protected route
jwt.verify(token, SECRET);
```

### 3. **Input Validation**
```typescript
// Validate ALL user inputs
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

// Prevent SQL injection (not an issue with MongoDB, but good practice)
// Prevent XSS (cross-site scripting)
```

### 4. **CORS Configuration**
```typescript
// Only allow specific origins
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
```

### 5. **Environment Variables**
```typescript
// Never commit .env file
// Add .env to .gitignore
// Use different .env for dev/production
```

### 6. **Rate Limiting** (Not implemented but should be)
```typescript
// Prevent brute-force attacks
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per IP
});

app.use('/api/auth', limiter);
```

### 7. **File Upload Security**
```typescript
// Validate file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images allowed'), false);
    }
};

// Limit file size
limits: { fileSize: 5 * 1024 * 1024 } // 5MB
```

---

## 🚨 Error Handling

### 1. **Try-Catch in Controllers**
```typescript
export const createHazard = async (req, res) => {
    try {
        // ... business logic ...
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: error.message || 'Server error' 
        });
    }
};
```

### 2. **Validation Errors**
```typescript
// Zod validation
try {
    await schema.parseAsync(req);
    next();
} catch (error) {
    res.status(400).json({ 
        message: 'Validation failed',
        errors: error.errors 
    });
}
```

### 3. **Authentication Errors**
```typescript
if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
}

if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
}
```

### 4. **Not Found Errors**
```typescript
const hazard = await HazardReport.findById(id);
if (!hazard) {
    return res.status(404).json({ message: 'Hazard not found' });
}
```

### 5. **Global Error Handler**
```typescript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
```

---

## 📝 Interview Q&A Preparation

### General Backend Questions:

**Q: What is the difference between SQL and NoSQL databases?**
A: SQL (like MySQL) uses structured tables with fixed schemas and relationships via foreign keys. NoSQL (like MongoDB) uses flexible document structure (JSON-like), better for rapidly changing schemas and horizontal scaling. We use MongoDB because hazard reports can have varying properties and we need geospatial queries.

**Q: What is REST API?**
A: REST is an architectural style for APIs using HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources. Each resource has a unique URL (like `/api/hazards`), requests are stateless, and data is exchanged in JSON format.

**Q: What is middleware in Express?**
A: Middleware are functions that execute between receiving a request and sending a response. They have access to req, res, and next(). Examples: authentication, validation, logging, CORS. They form a pipeline: Request → Middleware 1 → Middleware 2 → Controller → Response.

**Q: Explain JWT authentication.**
A: JWT (JSON Web Token) is a stateless authentication method. When a user logs in, the server creates an encrypted token containing user data, signs it with a secret, and sends it to the client. The client includes this token in the Authorization header for subsequent requests. The server verifies the signature to authenticate without database lookups.

**Q: What is CORS and why do we need it?**
A: CORS (Cross-Origin Resource Sharing) is a security feature that browsers enforce. It prevents websites from making requests to different domains. Since our frontend (localhost:5173) and backend (localhost:3000) are different origins, we need to enable CORS to allow requests.

### TypeScript Specific:

**Q: Why use TypeScript over JavaScript?**
A: TypeScript adds static type checking, catching errors at compile-time instead of runtime. It provides better IDE support with autocomplete, makes refactoring safer, and serves as documentation. For example, defining `interface IUser` documents exactly what properties a user object has.

**Q: What are interfaces in TypeScript?**
A: Interfaces define the shape/structure of objects. Example:
```typescript
interface IUser {
    name: string;
    email: string;
}
```
This ensures any object typed as IUser must have these properties with correct types.

**Q: What is the difference between `any` and `unknown` types?**
A: `any` disables type checking (avoid it!). `unknown` is type-safe - you must check the type before using it. Example:
```typescript
let x: any = 5;
x.toUpperCase(); // Compiles but crashes at runtime

let y: unknown = 5;
if (typeof y === 'string') {
    y.toUpperCase(); // TypeScript forces you to check
}
```

### Database/Mongoose:

**Q: What is Mongoose and why use it with MongoDB?**
A: Mongoose is an ODM (Object Document Mapper) that provides structure to MongoDB (which is schema-less). It offers schemas, validation, middleware hooks, and a query builder. Example: we can validate email format, hash passwords automatically, and ensure required fields.

**Q: What is the difference between `find()` and `findOne()`?**
A: `find()` returns an array of all matching documents. `findOne()` returns the first matching document or null. Example:
```typescript
await User.find({ role: 'admin' }); // [admin1, admin2, ...]
await User.findOne({ email: 'test@example.com' }); // { _id, name, email }
```

**Q: What is populate() in Mongoose?**
A: Populate performs a join-like operation, replacing ObjectId references with actual documents. Example:
```typescript
// Without populate:
{ reportedBy: "abc123" }

// With populate:
await HazardReport.findById(id).populate('reportedBy', 'name email');
{ reportedBy: { _id: "abc123", name: "John", email: "john@example.com" } }
```

### Authentication & Security:

**Q: How do you store passwords securely?**
A: Never store plain passwords. We use bcrypt to hash passwords with salt. When a user signs up, bcrypt hashes the password (12 salt rounds). During login, we use `bcrypt.compare()` to check if the input matches the stored hash. Even if the database is compromised, attackers can't read passwords.

**Q: What is the difference between authentication and authorization?**
A: 
- **Authentication**: Verifying identity (who you are) - e.g., login with email/password
- **Authorization**: Verifying permissions (what you can do) - e.g., checking if user is admin

We use JWT for authentication and role-based checks for authorization.

**Q: What is a salt in password hashing?**
A: A salt is random data added to passwords before hashing to prevent rainbow table attacks. Even if two users have the same password, their hashes will be different. bcrypt automatically generates and stores the salt.

### Real-time Communication:

**Q: What is the difference between Socket.io and WebSockets?**
A: WebSocket is a protocol for bidirectional communication. Socket.io is a library that uses WebSockets but adds features like automatic reconnection, fallback to polling, rooms, and broadcasting. Socket.io is easier to use and more reliable.

**Q: How does Socket.io work in your project?**
A: When a user creates a hazard report, the backend emits a 'hazard-reported' event to all connected clients. The frontend listens for this event and updates the map in real-time without refreshing. This provides instant notifications to all users.

### External APIs:

**Q: Why do you proxy the Nominatim API instead of calling it directly from frontend?**
A: Nominatim requires a custom User-Agent header. Frontend JavaScript cannot set custom headers due to CORS restrictions. Our backend acts as a proxy, adding the required headers and forwarding the request.

**Q: How do you handle rate limiting with external APIs?**
A: We implement caching (store recent results), debouncing (delay requests), and error handling (retry with exponential backoff). For production, we'd track request counts and respect API limits.

### Error Handling:

**Q: What are HTTP status codes and which ones do you use?**
A: 
- 200 (OK) - Successful GET/PUT/DELETE
- 201 (Created) - Successful POST
- 400 (Bad Request) - Validation errors
- 401 (Unauthorized) - Missing/invalid token
- 403 (Forbidden) - Valid token but no permission
- 404 (Not Found) - Resource doesn't exist
- 500 (Server Error) - Unexpected errors

**Q: How do you handle errors in async/await?**
A: We wrap async code in try-catch blocks:
```typescript
try {
    const user = await User.findById(id);
} catch (error) {
    res.status(500).json({ message: error.message });
}
```

### Architecture:

**Q: Explain MVC pattern.**
A: MVC separates concerns:
- **Model**: Data structure and database logic (Mongoose models)
- **View**: Frontend (React - separate project)
- **Controller**: Business logic, handles requests/responses

We also add:
- **Routes**: Define API endpoints
- **Services**: Reusable business logic (email, notifications)
- **Middleware**: Request preprocessing (auth, validation)

**Q: What is dependency injection?**
A: Passing dependencies (like database connection, services) as parameters instead of hard-coding them. We don't fully implement it, but we export services that controllers import, making testing easier.

### Email Service (Nodemailer):

**Q: How does email sending work in your project?**
A: We use Nodemailer with Gmail SMTP. When a hazard is reported, we send an email to ocean authorities. We create a transporter with Gmail credentials, compose an HTML email, and send it. We handle errors gracefully (console warning if email fails, but still save the hazard).

**Q: What is SMTP?**
A: SMTP (Simple Mail Transfer Protocol) is the protocol for sending emails. We configure host (smtp.gmail.com), port (587), and authentication to send emails through Gmail's servers.

### File Uploads (Multer):

**Q: How do you handle file uploads?**
A: We use Multer middleware. It intercepts multipart/form-data requests, extracts files, saves them to disk (uploads/hazards/), and adds file info to req.file. We validate file types (only images) and size limits (5MB).

**Q: Where are uploaded files stored?**
A: Files are stored in the `uploads/hazards/` directory on the server. We serve them as static files using `express.static()`. In production, we'd use cloud storage (AWS S3, Cloudinary).

---

## 🎓 Key Takeaways for Your Presentation

### What You Built:
1. **RESTful API** with Express.js and TypeScript
2. **JWT Authentication** - Stateless, secure login system
3. **Role-Based Authorization** - User and admin access levels
4. **Real-time Notifications** - Socket.io for live hazard alerts
5. **File Upload System** - Multer for hazard report images
6. **Email Notifications** - Nodemailer for authority alerts
7. **Database Design** - MongoDB with Mongoose ODM
8. **External API Integration** - OpenWeather, Reddit, RSS feeds
9. **Input Validation** - Zod schemas prevent bad data
10. **Error Handling** - Comprehensive try-catch and status codes

### Technologies Mastered:
- **TypeScript** - Type safety, interfaces, generics
- **Express.js** - Routing, middleware, REST API
- **MongoDB/Mongoose** - NoSQL database, schemas, queries
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Socket.io** - WebSocket communication
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Zod** - Validation
- **Axios** - HTTP client
- **CORS** - Cross-origin requests

### Best Practices Followed:
- ✅ Separation of concerns (MVC pattern)
- ✅ Environment variables for secrets
- ✅ Password hashing (never plain text)
- ✅ Input validation on all endpoints
- ✅ Proper error handling
- ✅ RESTful API design
- ✅ Type safety with TypeScript
- ✅ Secure authentication (JWT)

---

## 💡 Tips for Your Presentation

1. **Explain the flow**: User logs in → JWT token → Protected routes → Database
2. **Show examples**: Demonstrate API calls with Postman/Thunder Client
3. **Highlight TypeScript benefits**: Show how interfaces prevent bugs
4. **Discuss scalability**: JWT is stateless, MongoDB scales horizontally
5. **Address security**: Password hashing, JWT expiration, input validation
6. **Know your trade-offs**: Why MongoDB over MySQL, why JWT over sessions
7. **Be ready for "why" questions**: Why TypeScript? Why this architecture?

### Sample Explanation Flow:

"When a user reports a hazard, the request hits our Express API. First, the authentication middleware verifies the JWT token. Then, the validation middleware checks the input using Zod schemas. The controller receives the validated data, creates a database record using Mongoose, uploads the image with Multer, sends an email notification via Nodemailer, and broadcasts the event through Socket.io. All of this is type-safe thanks to TypeScript, preventing bugs before runtime."

Good luck with your presentation! 🚀
