# Smart-Rent

![Project Status](https://img.shields.io/badge/status-active-success) ![License](https://img.shields.io/badge/license-MIT-blue) ![SWOC Badge](assets/Project%20Admin%20Badge.png)

**Smart-Rent** is a comprehensive property rental platform built with the MERN stack. It connects property owners with potential guests, creating a seamless experience for listing, discovering, and booking accommodations.

This project is actively maintained for **Social Winter of Code (SWoC)** and serves as a real-world learning environment for open-source contributors.

## Key Features

- **User Authentication:** Secure login and registration using JWT and Passport.js.
- **Property Management:** Hosts can create, update, and manage property listings with image uploads.
- **Interactive Maps:** View property locations on dynamic maps powered by Leaflet.
- **Real-time Messaging:** Direct communication between guests and hosts via Socket.io.
- **Booking System:** Easy-to-use interface for checking availability and making reservations.
- **Reviews & Ratings:** Community-driven feedback system for properties.
- **Responsive Design:** Fully optimized UI built with Tailwind CSS.

## Tech Stack

**Frontend**
- **Framework:** React 18
- **Styling:** Tailwind CSS, PostCSS
- **Routing:** React Router v7
- **Maps:** Leaflet, React-Leaflet
- **HTTP Client:** Axios
- **State/Icons:** Lucide React, React Icons

**Backend**
- **Runtime:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JWT, Passport.js
- **Real-time:** Socket.io
- **Storage:** Cloudinary (for images)
- **Emails:** Nodemailer / Resend

## Project Structure

```bash
smart-rent/
├── backend/            # API, database models, and busines logic
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas (User, Property, etc.)
│   ├── routes/         # Express route definitions
│   └── app.js          # App configuration
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application views
│   │   └── context/    # Global state management
│   └── public/         # Static assets
└── assets/             # Project documentation assets
```

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14+)
- **npm** (Node Package Manager)
- **Git**
- **MongoDB** (Local or Atlas connection)

## Installation & Setup

1. **Fork and Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Smart-Rent.git
   cd Smart-Rent
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

To run this project, you will need to add the following environment variables.

Create a `.env` file in the **backend** directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## Running the Project

**1. Start the Backend Server**
```bash
# Inside /backend directory
npm run dev
```
*Server runs on: `http://localhost:8000`*

**2. Start the Frontend Client**
```bash
# Inside /frontend directory
npm start
```
*Client runs on: `http://localhost:3000`*

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

 Please read our **[CONTRIBUTING.md](CONTRIBUTING.md)** for details on our code of conduct, and the process for submitting pull requests.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our **[Code of Conduct](CODE_OF_CONDUCT.md)** before participating.

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Maintainers

- **Hitesh Kumar** - *Project Admin*

## Acknowledgements

- **Social Winter of Code (SWoC)** for providing a platform for open-source collaboration.
- All our amazing contributors!
