# Smart Rent System - Frontend

React-based frontend for Smart Rent System, a property rental management platform. Built with React, Tailwind CSS, and Leaflet maps.

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm

### Installation & Run

```bash
npm install
npm start          # Development server on http://localhost:3000
npm run build      # Build for production
npm run dev        # Start development mode
```

## Environment Setup

Create `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_BACKEND_URL=http://localhost:5000
```

## Features

- **User Authentication** - Login, register, password reset
- **Property Browsing** - View all properties with filters and search
- **Property Details** - View detailed property info with reviews and ratings
- **Booking System** - Book properties with date selection
- **Wishlist** - Save favorite properties
- **Trip Management** - View and manage your bookings
- **Messaging** - Real-time messaging with hosts/guests
- **User Profile** - Update profile, manage account
- **Maps Integration** - View property locations with Leaflet
- **Responsive Design** - Works on desktop, tablet, and mobile

## Project Structure

```
frontend/src/
├── pages/           # Page components (Home, Listings, etc.)
├── components/      # Reusable UI components
├── contexts/        # React Context (Auth, Settings)
├── services/        # API calls and utilities
├── hooks/           # Custom React hooks
├── config/          # Configuration files
├── utils/           # Utility functions
├── data/            # Static data
└── styles/          # CSS and Tailwind config
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page |
| Listings | `/listings` | Browse all properties |
| Property Detail | `/property/:id` | View property details |
| Login | `/login` | User login |
| Register | `/register` | User registration |
| Profile | `/profile` | User account settings |
| Trips | `/trips` | View user bookings |
| Wishlist | `/wishlist` | Saved properties |
| Messages | `/messages` | Conversations with hosts/guests |
| Payment | `/payment` | Payment page |
| Host Listings | `/host/listings` | Manage host properties (auth) |

## Tech Stack

- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Leaflet & React-Leaflet** - Maps integration
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Heroicons** - UI icons

## API Integration

Frontend communicates with backend API at `http://localhost:5000`:

### Key Endpoints Used

**Users**
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

**Properties**
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details

**Bookings**
- `GET /api/bookings/my-bookings` - Get user bookings
- `POST /api/bookings` - Create booking

**Messages**
- `GET /api/messages/conversations` - Get conversations
- `POST /api/messages` - Send message

## Context API Usage

### AuthContext
- Manages user authentication state
- Stores JWT token
- Provides login/logout functions

### AppSettingsContext
- Manages app-wide settings
- Theme preferences

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Protected routes check for valid token
5. API requests include token in Authorization header

## Build & Deploy

### Build for Production
```bash
npm run build
```
Creates optimized production build in `/build` directory.

### Deploy to Netlify
- Connect GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `build`

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- Responsive breakpoints: mobile, tablet, desktop
- Custom CSS in `src/index.css` and `src/App.css`

## Error Handling

- Validation errors displayed to user
- API errors caught and shown as toast/alerts
- 404 page for non-existent routes
- Protected routes redirect to login if not authenticated

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React Router
- Lazy loading of components
- Optimized images
- Minified production build

## License
MIT
