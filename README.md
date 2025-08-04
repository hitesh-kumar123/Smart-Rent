# Smart Rent System

A full-stack MERN (MongoDB, Express, React, Node.js) application for property rental management. This platform connects property owners with potential renters, providing a seamless experience for listing, discovering, and booking properties.

## Table of Contents

- [Project Title and Description](#project-title-and-description)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Testing Instructions](#testing-instructions)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact Information](#contact-information)
- [License](#license)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**

  - Register, login, and profile management
  - Role-based access (Admin, Host, Guest)
  - Password reset functionality
  - Two-factor authentication
  - Social media login integration
  - Email verification

- **Property Management**

  - Create, update, and delete property listings
  - Upload multiple property images
  - Manage property availability
  - Property approval workflow (for Admin)
  - Property categorization and filtering
  - Advanced search functionality
  - Property analytics dashboard

- **Booking System**

  - Create and manage bookings
  - View booking history
  - Cancel bookings
  - Payment integration
  - Generate invoices
  - Booking calendar
  - Automated booking confirmations
  - Booking reminders

- **Reviews and Ratings**

  - Leave and view property reviews
  - Rating system for properties
  - Review moderation
  - Review analytics
  - Review response system

- **Wishlist**

  - Add/remove properties to/from wishlist
  - View wishlist items
  - Share wishlist
  - Price alerts for wishlist items

- **Messaging System**

  - Real-time chat between users
  - Conversation management
  - Message notifications
  - File attachments in messages
  - Message search
  - Message archiving

- **Additional Features**
  - Multi-language support
  - Dark/Light mode
  - Responsive design
  - Progressive Web App (PWA) support
  - Offline functionality
  - Push notifications
  - Analytics dashboard
  - SEO optimization

## Technology Stack

- **Frontend**:

  - React.js
  - Redux for state management
  - Material-UI for UI components
  - React Router for navigation
  - Axios for HTTP requests
  - Socket.io-client for real-time features
  - React Query for data fetching
  - Formik for form handling
  - Yup for validation

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Socket.io for real-time features
  - Multer for file uploads
  - Nodemailer for emails
  - Winston for logging
  - Helmet for security

- **Database**:

  - MongoDB Atlas
  - Redis for caching
  - Mongoose for ODM

- **DevOps & Tools**:

  - Docker for containerization
  - GitHub Actions for CI/CD
  - Jest for testing
  - ESLint for code quality
  - Prettier for code formatting
  - Husky for git hooks

- **Third-party Services**:
  - Cloudinary for image storage
  - Razorpay for payments
  - Google Maps API for location services
  - SendGrid for email services
  - AWS S3 for file storage
  - Stripe for international payments

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git
- Docker (optional)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd smart-rent-system
   ```

2. Install server dependencies

   ```bash
   npm install
   ```

3. Install client dependencies

   ```bash
   cd client
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with the following variables:

   ```
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust

   # Authentication
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d

   # Cloud Storage
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   # Payment Gateway
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_secret

   # Maps and Location
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Email Service
   EMAIL_SERVICE=smtp
   EMAIL_USERNAME=your_email
   EMAIL_PASSWORD=your_password
   EMAIL_FROM=your_email

   # Client Configuration
   CLIENT_URL=http://localhost:3000

   # Redis Configuration
   REDIS_URL=redis://localhost:6379

   # AWS Configuration
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_bucket_name
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

### Docker Setup (Optional)

1. Build the Docker images

   ```bash
   docker-compose build
   ```

2. Start the containers
   ```bash
   docker-compose up
   ```

## Project Structure

```
smart-rent-system/
├── client/                 # React frontend
│   ├── public/            # Static files
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── package.json
├── tests/                # Test files
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── docker-compose.yml    # Docker configuration
└── package.json         # Root package.json
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- XSS protection
- CSRF protection
- Input validation
- Secure headers
- SQL injection prevention
- File upload validation
- Regular security audits

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Database indexing
- Query optimization
- Compression
- Minification
- CDN integration
- Load balancing

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **Authentication Problems**

   - Clear browser cache
   - Check JWT configuration
   - Verify user credentials

3. **File Upload Issues**

   - Check file size limits
   - Verify storage credentials
   - Check network connectivity

4. **Payment Processing**
   - Verify payment gateway credentials
   - Check transaction logs
   - Verify account status

### Support

For additional support:

- Check the [documentation](link-to-docs)
- Open an issue on GitHub
- Contact support team

## API Documentation

The API documentation can be found at `/api-docs` when running the server. It includes:

- Authentication endpoints
- User management
- Property management
- Booking system
- Payment processing
- Review system
- Messaging system

## Usage Examples

### User Registration

```javascript
// Example API call
const registerUser = async (userData) => {
  const response = await axios.post("/api/auth/register", userData);
  return response.data;
};
```

### Property Listing

```javascript
// Example API call
const createProperty = async (propertyData) => {
  const response = await axios.post("/api/properties", propertyData);
  return response.data;
};
```

### Booking a Property

```javascript
// Example API call
const createBooking = async (bookingData) => {
  const response = await axios.post("/api/bookings", bookingData);
  return response.data;
};
```

## Testing Instructions

### Backend Testing

```bash
cd server
npm test
```

### Frontend Testing

```bash
cd client
npm test
```

### End-to-End Testing

```bash
npm run test:e2e
```

## Contribution Guidelines

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Write tests
5. Update documentation
6. Submit a pull request

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Include tests for new features

## Contact Information

For support and inquiries:

- Email: [your_email@example.com]
- GitHub: [your_github_profile]
- Website: [your_website]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
