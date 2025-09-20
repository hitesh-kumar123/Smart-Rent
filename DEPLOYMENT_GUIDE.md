# Smart Rent System - Deployment Guide

## Current Issue

Your frontend and backend are both pointing to the same Netlify URL (`https://smartrentsystem.netlify.app`), but Netlify only serves static files (frontend). Your backend API calls are failing because there's no actual backend server running at that URL.

## Solution: Deploy Backend to Render

### Step 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Create a new Web Service**
3. **Connect your GitHub repository** (make sure your code is pushed to GitHub)
4. **Configure the service:**

   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment:** Node
   - **Plan:** Free

5. **Set Environment Variables in Render:**

   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `your_mongodb_connection_string`
   - `PORT` = `10000` (Render will override this)
   - `REACT_APP_API_URL` = `https://smartrentsystem.netlify.app`

6. **Deploy** - Render will give you a URL like `https://your-app-name.onrender.com`

### Step 2: Update Frontend Configuration

After your backend is deployed on Render, update your frontend's environment variable:

1. **In your frontend's build settings on Netlify:**

   - Go to Site Settings → Environment Variables
   - Update `REACT_APP_API_URL` to your Render backend URL (e.g., `https://your-app-name.onrender.com`)

2. **Redeploy your frontend** on Netlify

### Step 3: Update CORS Settings

The backend CORS has been updated to allow your Netlify frontend domain. If you get a different backend URL from Render, update the CORS settings in `backend/app.js`.

## Alternative Solutions

### Option A: Use Railway

1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repo
3. Deploy the backend folder
4. Get the Railway URL and update your frontend

### Option B: Use Heroku

1. Create a Heroku app
2. Deploy your backend
3. Update frontend API URL

## Testing

After deployment:

1. Check if your backend is running: `https://your-backend-url.onrender.com/api`
2. Check if your frontend can make API calls
3. Test login/registration functionality

## Environment Variables Summary

**Frontend (Netlify):**

- `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`

**Backend (Render):**

- `NODE_ENV` = `production`
- `MONGODB_URI` = `your_mongodb_connection_string`
- `REACT_APP_API_URL` = `https://smartrentsystem.netlify.app` (for CORS)

## Troubleshooting

1. **CORS errors:** Make sure your frontend URL is in the CORS origins list
2. **Database connection:** Ensure your MongoDB URI is correct and accessible
3. **Build errors:** Check that all dependencies are in package.json
4. **API not responding:** Check Render logs for errors

## Quick Fix for Testing

If you want to test locally first:

1. Run your backend locally: `cd backend && npm start`
2. Update your frontend's `.env` file: `REACT_APP_API_URL=http://localhost:8000`
3. Test the connection
