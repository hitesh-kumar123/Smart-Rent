# Smart Rent System
Full name = Hitesh Kumar
username: hitesh123
Email address = try.other220@gmail.com
Password = Hitesh@123
Confirm password =  Hitesh@123

Full name = John Smith
Username: johnsmith123
Email address = john.smith@example.com
Password = Password123
Confirm password = Password123

A full-stack MERN (MongoDB, Express, React, Node.js) application for property rental management. This platform connects property owners with potential renters, providing a seamless experience for listing, discovering, and booking properties.
Property Detail Page - Create a dedicated page that shows when users click "View Details" button
User Authentication - Add login/signup features to allow users to save favorite properties
User Profile - Where users can manage their bookings and saved properties
Booking System - Implement a calendar and reservation system for properties
Payment Integration - Add payment processing for bookings
Reviews/Ratings - Allow users to leave reviews and ratings for properties they've stayed at
Property Owner Dashboard - For listing and managing properties
Search History - Save users' recent searches
Map View - Show properties on an interactive map
Your listings page with the filtering and sorting is already quite well-implemented, with all 44 properties showing correctly
## Features

- **User Authentication**
  - Register, login, and profile management
  - Role-based access (Admin, Host, Guest)
  - Password reset functionality

- **Property Management**
  - Create, update, and delete property listings
  - Upload multiple property images
  - Manage property availability
  - Property approval workflow (for Admin)

- **Booking System**
  - Create and manage bookings
  - View booking history
  - Cancel bookings
  - Payment integration
  - Generate invoices

- **Reviews and Ratings**
  - Leave and view property reviews
  - Rating system for properties

- **Wishlist**
  - Add/remove properties to/from wishlist
  - View wishlist items

- **Messaging System**
  - Real-time chat between users
  - Conversation management
  - Message notifications
  - File attachments in messages

## Technology Stack

- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Real-time Communication**: Socket.io
- **File Storage**: Cloudinary
- **Payment Processing**: Razorpay
- **Maps Integration**: Google Maps API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd smart-rent-system
   ```

2. Install server dependencies
   ```
   npm install
   ```

3. Install client dependencies
   ```
   cd client
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   CLIENT_URL=http://localhost:3000
   ```

5. Run the development server
   ```
   npm run dev
   ```

   This will start both the backend server and React frontend concurrently.

### Production Deployment

For production deployment:
```
npm run build
npm start
```

## API Documentation

The API documentation can be found at `/api-docs` when running the server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
