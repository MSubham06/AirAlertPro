# Deploying AirAlert Pro to Vercel - Step by Step Guide

## Prerequisites

Before you begin, ensure you have:

1. A GitHub account
2. A Vercel account (free at [vercel.com](https://vercel.com))
3. Your NASA Earthdata token (provided)
4. An OpenAQ API key (register at [openaq.org](https://openaq.org))

## Step 1: Prepare Your Code for Deployment

### Option A: Using the existing repository (if available)
If you already have your code in a GitHub repository, you can skip to Step 2.

### Option B: Create a new repository
1. Create a new repository on GitHub
2. Upload all the files from your project to this repository

## Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in or create an account
2. Click "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure the project:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Leave as is (should be the root of your project)
   - **Build and Output Settings**:
     - Build Command: `npm run build`
     - Output Directory: `dist`
5. Before deploying, add environment variables:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.com` (you'll update this later with your actual backend URL)
6. Click "Deploy"

## Step 3: Deploy Backend to Render (or similar platform)

Since Vercel is primarily for frontend applications, you'll need to deploy your backend separately. We recommend using Render:

1. Go to [render.com](https://render.com) and sign in or create an account
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: airalert-backend
   - **Region**: Choose the closest region to your users
   - **Branch**: main (or your default branch)
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Add environment variables:
   - `NASA_TOKEN` = [Your NASA Earthdata token]
   - `OPENAQ_API_KEY` = [Your OpenAQ API key]
6. Click "Create Web Service"

## Step 4: Update Frontend with Backend URL

Once your backend is deployed on Render:

1. Copy the URL of your Render backend (it will look like `https://airalert-backend-xxxx.onrender.com`)
2. Go to your Vercel project dashboard
3. Go to "Settings" → "Environment Variables"
4. Update the `VITE_API_URL` variable with your actual Render backend URL
5. Save the changes
6. Go to "Deployments" and trigger a new deployment

## Step 5: Custom Domain (Optional)

### For Vercel Frontend:
1. In your Vercel dashboard, go to your project
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### For Render Backend:
1. In your Render dashboard, go to your web service
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables Summary

### Frontend (Vercel)
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Render backend URL |

### Backend (Render)
| Variable | Value |
|----------|-------|
| `NASA_TOKEN` | Your NASA Earthdata token |
| `OPENAQ_API_KEY` | Your OpenAQ API key |

## Troubleshooting Common Issues

### 1. Environment Variables Not Working
- Ensure all frontend environment variables start with `VITE_`
- Redeploy your application after changing environment variables

### 2. CORS Errors
- Check that your backend CORS configuration allows your frontend domain
- The backend should already be configured to allow Vercel domains

### 3. API Key Issues
- Verify your NASA token and OpenAQ API key are valid
- NASA tokens expire periodically and need to be refreshed

### 4. Build Failures
- Check the build logs in your Vercel/Render dashboards
- Ensure all dependencies are correctly listed

## Monitoring Your Application

### Vercel (Frontend)
- Use Vercel Analytics to monitor performance
- Set up alerts for deployment failures

### Render (Backend)
- Use Render's built-in logging
- Set up uptime monitoring

## Updating Your Application

To update your deployed application:

1. Push changes to your GitHub repository
2. Both Vercel and Render will automatically detect changes and redeploy
3. For environment variable changes, you'll need to manually trigger a redeploy

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [AirAlert Pro Documentation](README.md)

Your AirAlert Pro application should now be successfully deployed and accessible to users worldwide!