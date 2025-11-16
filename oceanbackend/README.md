# OceanGuard Backend API

Backend API for OceanGuard - Ocean Hazard Monitoring System

## Features

- User authentication (JWT)
- Hazard report management
- News article management
- Analytics and reporting
- Email notifications to ocean authority
- Duplicate email prevention

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (you can copy from `.env.example`):
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/oceanguard

# JWT Secret
JWT_SECRET=supersecretjwtkey

# Server Port
PORT=3000

# ============================================
# ⚠️ IMPORTANT: OCEAN AUTHORITY EMAIL
# ============================================
# Add the email address where hazard notifications should be sent
# This is REQUIRED for email notifications to work
OCEAN_AUTHORITY_EMAIL=authority@oceanguard.com

# ============================================
# Email Service Configuration
# ============================================
# Option 1: Gmail (recommended for development)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=OceanGuard <your-email@gmail.com>

# Option 2: Custom SMTP
# EMAIL_SERVICE=
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_SECURE=false
# EMAIL_USER=your-email@example.com
# EMAIL_PASSWORD=your-password
# EMAIL_FROM=OceanGuard <your-email@example.com>
```

**⚠️ IMPORTANT:** You MUST set `OCEAN_AUTHORITY_EMAIL` in your `.env` file. This is the email address where all hazard report notifications will be sent.

3. For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an App Password (not your regular password)
   - Use the App Password in `EMAIL_PASSWORD`

4. Seed initial data (optional):
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

## Email Notifications

The system automatically sends email notifications to the ocean authority when:
- A new hazard report is created
- The report is for a unique disaster (not a duplicate)

### Duplicate Prevention

The system prevents duplicate emails by checking if:
- Same hazard type
- Within 0.1 degrees (~11km) of the same location
- Email was already sent for a similar report

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/hazards` - Get all hazard reports
- `POST /api/hazards` - Create hazard report (requires auth)
- `GET /api/hazards/:id` - Get specific hazard report
- `PUT /api/hazards/:id` - Update hazard report (requires auth)
- `DELETE /api/hazards/:id` - Delete hazard report (requires auth)
- `GET /api/news` - Get news articles
- `GET /api/analytics` - Get analytics data
- `GET /api/user/profile` - Get user profile (requires auth)

## Development

```bash
# Development mode with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

