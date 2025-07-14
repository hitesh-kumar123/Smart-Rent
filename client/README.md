# Smart Rent System - Frontend

This is the frontend application for the Smart Rent System, built with React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Component Library](#component-library)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Learn More](#learn-more)

## Features

- **User Interface**

  - Responsive design for all devices
  - Dark/Light mode support
  - Modern and intuitive UI
  - Accessibility compliance

- **Authentication**

  - User registration and login
  - Social media authentication
  - Protected routes
  - Role-based access control

- **Property Management**

  - Property listing creation and management
  - Image upload with preview
  - Property search with filters
  - Interactive maps integration

- **Booking System**

  - Calendar-based availability
  - Real-time booking updates
  - Payment integration
  - Booking history

- **User Dashboard**
  - Property analytics
  - Booking management
  - User profile management
  - Notification center

## Technology Stack

- **Core**

  - React 18
  - TypeScript
  - Redux Toolkit
  - React Router v6

- **UI Components**

  - Material-UI v5
  - React Icons
  - React Calendar
  - React Map GL

- **Form Handling**

  - Formik
  - Yup validation

- **API Integration**

  - Axios
  - React Query
  - Socket.io-client

- **Testing**
  - Jest
  - React Testing Library
  - Cypress

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd smart-rent-system/client
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_SOCKET_URL=ws://localhost:8000
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.
Runs unit tests and integration tests.

### `npm run build`

Builds the app for production to the `build` folder.
The build is optimized and minified for best performance.

### `npm run lint`

Runs ESLint to check for code style issues and errors.

### `npm run format`

Formats code using Prettier.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── common/     # Shared components
│   ├── layout/     # Layout components
│   └── forms/      # Form components
├── config/         # Configuration files
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── redux/          # Redux store and slices
├── services/       # API services
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## State Management

- **Redux Store Structure**

```javascript
{
  auth: {
    user: User | null;
    token: string | null;
    loading: boolean;
  },
  properties: {
    items: Property[];
    loading: boolean;
    error: string | null;
  },
  bookings: {
    list: Booking[];
    loading: boolean;
  }
}
```

## Component Library

We use Material-UI (MUI) v5 with custom theming:

```javascript
// Example theme customization
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});
```

## API Integration

Example API service setup:

```javascript
// api/auth.service.ts
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },
};
```

## Testing

- **Unit Tests**: Components and utilities
- **Integration Tests**: User flows
- **E2E Tests**: Critical paths

Example test:

```javascript
describe("PropertyCard", () => {
  it("renders property details correctly", () => {
    const property = {
      title: "Test Property",
      price: 100,
      location: "Test Location",
    };
    render(<PropertyCard property={property} />);
    expect(screen.getByText("Test Property")).toBeInTheDocument();
  });
});
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy to your hosting service:

- Vercel
- Netlify
- AWS S3
- Firebase Hosting

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
