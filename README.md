# Smart Rent - Property Rental Platform

A full-stack MERN application for managing property rentals, bookings, and communications between property owners and guests.

## Overview

Smart Rent is a modern property rental platform that enables users to list properties, make bookings, manage reservations, and communicate with hosts. The application features real-time messaging, review systems, and a comprehensive admin panel.

---

## Tech Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT + Passport.js
- **File Storage:** Cloudinary
- **Real-time:** Socket.io
- **Email:** Nodemailer
- **Validation:** Joi
- **Security:** Helmet, Express Mongo Sanitize

### Frontend

- **Library:** React 18
- **Routing:** React Router v7
- **Styling:** Tailwind CSS + PostCSS
- **Maps:** Leaflet
- **Icons:** React Icons, Heroicons, Lucide React
- **HTTP Client:** Axios
- **Build Tool:** Create React App

---

## Features

### User Features

- **Authentication:** Secure registration and login with JWT
- **Property Listings:** Browse and search available properties
- **Bookings:** Reserve properties with date selection
- **Trip Management:** Track active bookings and booking history
- **Messaging:** Real-time messaging with property hosts
- **Reviews:** Leave and view property reviews
- **Wishlist:** Save favorite properties
- **Profile Management:** Update user profile and preferences

### Host Features

- **List Properties:** Create and manage property listings
- **Booking Management:** View and manage guest bookings
- **Communication:** Direct messaging with guests
- **Analytics:** Track bookings and reviews

### Admin Features

- **User Management:** Manage user accounts
- **Property Moderation:** Review and manage listings
- **Booking Oversight:** Monitor all bookings
- **Report Handling:** Manage user concerns and reports

---

## Project Structure

```
smart-rent/
├── backend/
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── services/           # Email service
│   ├── app.js              # Express configuration
│   ├── server.js           # Server entry point
│   ├── schema.js           # Mongoose schemas
│   └── package.json
│
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React context (Auth, Settings)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # API configuration
│   │   ├── data/           # Static data
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   ├── build/              # Production build
│   └── package.json
│
├── middleware.js           # Global middleware configuration
├── build.js                # Build configuration
└── README.md
```

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- SMTP credentials (for email service)

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
```

4. Create admin user (optional):

```bash
node create-admin.js
```

5. Start server:

```bash
npm run dev
```

Server runs on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm start
```

Frontend runs on `http://localhost:3000`

---

## Available Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run server` - Run server

### Frontend

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm run dev` - Start with hot reload
- `npm test` - Run tests

---

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Properties

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (host only)
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Messages

- `GET /api/messages` - Get conversations
- `GET /api/messages/:conversationId` - Get messages in conversation
- `POST /api/messages` - Send message
- `POST /api/messages/create-conversation` - Create conversation

### Reviews

- `GET /api/reviews/:propertyId` - Get property reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/reviews` - Get user reviews

---

## Key Components

### Frontend Components

- `Layout` - Main layout wrapper
- `Navbar` - Navigation bar
- `Footer` - Footer component
- `ProtectedRoute` - Route protection for authenticated users
- `ErrorBoundary` - Error handling
- `PropertyImage` - Image display component
- `StaticMap` - Map display

### Backend Models

- **User** - User account and profile data
- **Property** - Property listings
- **Booking** - Reservation records
- **Review** - Property reviews
- **Message** - Conversation messages
- **Conversation** - Message threads

---

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation with Joi
- CORS enabled
- Helmet for HTTP headers
- Mongo sanitization against injection
- Protected routes for authenticated users
- Session management with express-session

---

## Environment Variables

### Backend `.env`

```env
PORT                    # Server port (default: 8000)
MONGODB_URI             # MongoDB connection string
JWT_SECRET              # JWT secret key
CLOUDINARY_NAME         # Cloudinary account name
CLOUDINARY_KEY          # Cloudinary API key
CLOUDINARY_SECRET       # Cloudinary API secret
EMAIL_USER              # Email for sending notifications
EMAIL_PASS              # Email password
NODE_ENV                # development or production
```

### Frontend `.env` (if needed)

```env
REACT_APP_API_URL       # Backend API URL (default: http://localhost:8000)
```

---

## Deployment

### Backend

- Deploy to Heroku, Railway, or Render
- Set environment variables in hosting platform
- Ensure MongoDB Atlas connection string is set

### Frontend

- Build production: `npm run build`
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API proxy in `package.json` if needed

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

ISC

---

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## Support

For issues or questions, please create a GitHub issue or contact the development team.
