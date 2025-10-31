# Deployment Guide

## Deploying to Vercel

### Prerequisites
1. Create accounts on:
   - [Vercel](https://vercel.com/)
   - [Render](https://render.com/) (for backend)

2. Obtain API keys:
   - NASA Earthdata token (provided)
   - OpenAQ API key (register at https://openaq.org)

### Frontend Deployment (Vercel)

1. Push your code to a GitHub repository
2. Log in to Vercel and create a new project
3. Connect your GitHub repository
4. Configure the project:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_API_URL`: Your backend URL (from Render deployment)
6. Deploy!

### Backend Deployment (Render)

1. Push your code to a GitHub repository (if not already done)
2. Log in to Render and create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Name: `airalert-backend`
   - Region: Choose the closest region
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
5. Add environment variables:
   - `NASA_TOKEN`: Your NASA Earthdata token
   - `OPENAQ_API_KEY`: Your OpenAQ API key
6. Deploy!

### Post-Deployment Steps

1. Once your backend is deployed, copy the Render URL
2. Update the `VITE_API_URL` environment variable in your Vercel project with the Render URL
3. Redeploy your frontend

### Environment Variables Summary

#### Frontend (Vercel)
```env
VITE_API_URL=https://your-render-app.onrender.com
```

#### Backend (Render)
```env
NASA_TOKEN=your_nasa_token_here
OPENAQ_API_KEY=your_openaq_api_key_here
```

### Custom Domain (Optional)

1. In Vercel:
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. In Render:
   - Go to your web service settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure your backend CORS configuration includes your frontend domain
   - Check `app.py` CORS settings

2. **API Key Issues**:
   - Verify your NASA token and OpenAQ API key are correctly set
   - Check that your NASA token is still valid (tokens expire)

3. **Build Failures**:
   - Check the build logs in Vercel/Render dashboards
   - Ensure all dependencies are correctly listed in requirements.txt/package.json

### Monitoring

- Use Vercel Analytics to monitor frontend performance
- Use Render logs to monitor backend health
- Set up uptime monitoring for both services

## Updating Your Deployment

1. Push changes to your GitHub repository
2. Vercel and Render will automatically detect changes and redeploy
3. For environment variable changes, you'll need to manually redeploy