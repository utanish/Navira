# Deployment Guide for NGO Website Builder

This guide covers deploying both the frontend and backend of the NGO Website Builder application.

## Environment Variables Required

### Frontend (Vercel Project)
- `REACT_APP_API_URL` - URL of your backend API (e.g., `https://your-backend.vercel.app`)

### Backend (Server Deployment)
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini API key for content generation
- `NETLIFY_API_TOKEN` - Netlify API token for site deployment
- `ALLOWED_ORIGINS` - Comma-separated list of allowed frontend URLs
- `NODE_ENV` - Set to `production`
- `PORT` - Port number (usually set automatically by hosting provider)

## Deployment Options

### Option 1: Separate Frontend and Backend Deployment (Recommended)

#### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Add environment variables in Vercel dashboard

#### Backend Deployment (Vercel Functions)
1. Create a separate Vercel project for the backend
2. Set the root directory to `server`
3. Add all required environment variables
4. Deploy using Vercel CLI or GitHub integration

### Option 2: Monorepo Deployment (Single Vercel Project)

Use the provided `vercel.json` configuration to deploy both frontend and backend together.

## Environment Variable Values

### Development
\`\`\`
REACT_APP_API_URL=http://localhost:5000
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
\`\`\`

### Production
\`\`\`
REACT_APP_API_URL=https://your-backend-domain.vercel.app
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-custom-domain.com
\`\`\`

## Database Setup

### MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Add it as `MONGODB_URI` environment variable

### Local MongoDB (Development Only)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/ngo-website-builder
\`\`\`

## API Keys Setup

### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it as `GEMINI_API_KEY` environment variable

### Netlify API Token
1. Go to [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens)
2. Generate a new access token
3. Add it as `NETLIFY_API_TOKEN` environment variable

## Deployment Commands

### Build and Deploy
\`\`\`bash
# Build the frontend
cd client
npm run build

# Deploy backend (if using separate deployment)
cd ../server
# Deploy using your preferred method (Vercel, Heroku, etc.)
\`\`\`

### Vercel CLI Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## Post-Deployment Checklist

1. ✅ Frontend loads without errors
2. ✅ API health check passes (`/health` endpoint)
3. ✅ Form submission works
4. ✅ Site preview generation works
5. ✅ Content generation with Gemini API works
6. ✅ Netlify deployment works
7. ✅ ZIP download works
8. ✅ No CORS errors in browser console

## Troubleshooting

### CORS Errors
- Check that `ALLOWED_ORIGINS` includes your frontend URL
- Verify `REACT_APP_API_URL` points to the correct backend

### API Connection Issues
- Check that all environment variables are set correctly
- Verify the backend is deployed and accessible
- Check the browser network tab for failed requests

### Database Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure database user has proper permissions

### Content Generation Issues
- Verify `GEMINI_API_KEY` is valid and has quota
- Check API key permissions and billing

### Netlify Deployment Issues
- Verify `NETLIFY_API_TOKEN` has proper permissions
- Check Netlify account limits and quotas
\`\`\`

Let's also create a health check component that provides more detailed information:
