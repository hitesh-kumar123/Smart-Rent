# 🚀 Smart-Rent Deployment Guide - Render

## Prerequisites
- [Render Account](https://render.com) (Free tier available)
- [MongoDB Atlas](https://mongodb.com/atlas) account for database
- [Cloudinary](https://cloudinary.com) account for image storage
- [GitHub](https://github.com) repository with your code

## Step 1: Prepare Your Repository

### 1.1 Update .gitignore
Make sure your `.gitignore` includes:
```
node_modules/
.env
.env.local
.env.production
build/
dist/
```

### 1.2 Commit and Push Your Changes
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Set up database access (username/password)
4. Set up network access (allow all IPs: 0.0.0.0/0)
5. Get your connection string

### 2.2 Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/smart-rent?retryWrites=true&w=majority
```

## Step 3: Set Up Cloudinary

### 3.1 Get Cloudinary Credentials
1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Get your:
   - Cloud Name
   - API Key
   - API Secret

## Step 4: Deploy to Render

### 4.1 Create Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `smart-rent-api`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-rent?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RESEND_API_KEY=your-resend-api-key
```

### 4.2 Create Frontend Service
1. Click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure:

**Basic Settings:**
- **Name**: `smart-rent-frontend`
- **Branch**: `main`
- **Root Directory**: Leave empty

**Build & Deploy:**
- **Build Command**: `cd client && npm install && npm run build`
- **Publish Directory**: `client/build`

**Environment Variables:**
```
REACT_APP_API_URL=https://your-backend-service-name.onrender.com
```

## Step 5: Update Frontend API URL

### 5.1 Update the Build Script
In `client/package.json`, the build script should be:
```json
"build": "REACT_APP_API_URL=https://your-backend-service-name.onrender.com react-scripts build"
```

### 5.2 Update render.yaml
Update the `REACT_APP_API_URL` in `render.yaml` with your actual backend service URL.

## Step 6: Deploy

### 6.1 Deploy Backend First
1. Click "Deploy" on your backend service
2. Wait for build to complete
3. Note the service URL (e.g., `https://smart-rent-api.onrender.com`)

### 6.2 Deploy Frontend
1. Update the `REACT_APP_API_URL` in render.yaml with your backend URL
2. Deploy the frontend service
3. Wait for build to complete

## Step 7: Test Your Deployment

### 7.1 Test Backend
- Visit your backend URL + `/api` (e.g., `https://smart-rent-api.onrender.com/api`)
- Should see your API response

### 7.2 Test Frontend
- Visit your frontend URL
- Test all functionality
- Check browser console for API calls

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names
   - Restart service after adding variables

3. **Database Connection**
   - Verify MongoDB Atlas network access allows all IPs
   - Check connection string format
   - Ensure database user has correct permissions

4. **CORS Issues**
   - Backend should already handle CORS
   - Check if frontend URL is allowed

### Useful Commands:
```bash
# Check build logs
# Use Render dashboard

# Test API locally
curl https://your-backend.onrender.com/api

# Check environment variables
# Use Render dashboard → Environment tab
```

## Post-Deployment

### 1. Set Up Custom Domain (Optional)
- Go to your service settings
- Add custom domain
- Configure DNS records

### 2. Monitor Performance
- Use Render's built-in monitoring
- Set up alerts for downtime
- Monitor database performance

### 3. Scale Up (When Needed)
- Upgrade from free tier
- Add more resources
- Set up auto-scaling

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

**🎉 Congratulations! Your Smart-Rent app is now live on Render!**
