# Smart Rent System - Backend

Node.js backend for Smart Rent System, a property rental management platform built with Express.js and MongoDB.

## Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm

### Installation & Run

```bash
npm install
npm start          # Production mode
npm run dev        # Development mode (with auto-reload)
```

## Environment Setup

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
FRONTEND_URL=http://localhost:3000
```

## Features

- User authentication & profile management
- Property listings with filters
- Booking system
- Reviews & ratings
- Real-time messaging (Socket.io)
- Image uploads (Cloudinary)
- Email notifications
- Input validation & security

## Project Structure

```
backend/
├── controllers/     # Business logic for routes
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── middleware/     # Custom middleware
├── services/       # Email & utility services
├── app.js          # Express setup
└── server.js       # Entry point
```

## API Endpoints

### Users

- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get profile (auth)
- `PUT /api/users/profile` - Update profile (auth)
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password/:token` - Reset password

### Properties

- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (auth)
- `PUT /api/properties/:id` - Update property (auth)
- `DELETE /api/properties/:id` - Delete property (auth)

### Bookings

- `GET /api/bookings/my-bookings` - Get user bookings (auth)
- `POST /api/bookings` - Create booking (auth)
- `PUT /api/bookings/:id/status` - Update status (auth)
- `DELETE /api/bookings/:id` - Cancel booking (auth)

### Reviews

- `GET /api/reviews/property/:propertyId` - Get reviews
- `POST /api/reviews` - Create review (auth)
- `PUT /api/reviews/:id` - Update review (auth)
- `DELETE /api/reviews/:id` - Delete review (auth)

### Messages

- `GET /api/messages/conversations` - Get conversations (auth)
- `GET /api/messages/:conversationId` - Get messages (auth)
- `POST /api/messages` - Send message (auth)
- `POST /api/messages/conversations` - Create conversation (auth)

## Authentication

Protected routes require JWT token in header:

```
Authorization: Bearer <token>
```

## Database Models

- **User** - User accounts & profiles
- **Property** - Rental properties
- **Booking** - Property reservations
- **Review** - Property ratings
- **Message** - User messages
- **Conversation** - Message threads

## Tech Stack

- Express.js - Web framework
- MongoDB - Database
- JWT - Authentication
- Socket.io - Real-time messaging
- Cloudinary - Image hosting
- Multer - File upload
- Joi - Data validation
- Helmet - Security headers

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## License

ISC

This project is licensed under the ISC License - see the [LICENSE](../LICENSE) file for details.

## Support

For support, email support@smartrentsystem.com or open an issue in the repository.

## Authors

- [Hitesh Kumar/Organization]

## Acknowledgments

- Express.js community
- MongoDB documentation
- Cloudinary for image hosting
- Socket.io for real-time communication
