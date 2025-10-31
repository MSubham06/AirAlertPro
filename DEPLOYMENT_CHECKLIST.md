# Deployment Checklist

## Pre-deployment Checklist

### Backend (Render)
- [ ] Create GitHub repository with backend code
- [ ] Sign up for Render account
- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `gunicorn app:app`
- [ ] Add environment variables:
  - [ ] `NASA_TOKEN` (your NASA Earthdata token)
  - [ ] `OPENAQ_API_KEY` (your OpenAQ API key)
- [ ] Deploy and verify backend is running

### Frontend (Vercel)
- [ ] Push frontend code to GitHub repository
- [ ] Sign up for Vercel account
- [ ] Create new project on Vercel
- [ ] Connect GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Verify build settings:
  - Build command: `npm run build`
  - Output directory: `dist`
- [ ] Add environment variables:
  - [ ] `VITE_API_URL` (your Render backend URL)
- [ ] Deploy and verify frontend is running

## Post-deployment Checklist

### Functionality Testing
- [ ] Home page loads correctly
- [ ] Dashboard displays data
- [ ] Forecast page shows predictions
- [ ] Trends page displays historical data
- [ ] Alerts page shows notifications
- [ ] Health recommendations work
- [ ] Chat widget responds to queries
- [ ] All cities display data correctly

### API Testing
- [ ] Backend health check endpoint (`/`)
- [ ] Current data endpoint (`/api/current`)
- [ ] Forecast endpoint (`/api/forecast`)
- [ ] Trends endpoint (`/api/trends`)
- [ ] Alerts endpoint (`/api/alerts`)
- [ ] Health recommendations endpoint (`/api/health-recommendations`)
- [ ] API documentation endpoint (`/api/docs`)

### Performance Testing
- [ ] Page load times < 3 seconds
- [ ] API response times < 1 second
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Security Testing
- [ ] No sensitive data in frontend code
- [ ] Environment variables properly configured
- [ ] CORS settings correctly configured
- [ ] HTTPS enforced

## Monitoring and Maintenance

### Setup Monitoring
- [ ] Enable Render logs monitoring
- [ ] Enable Vercel analytics
- [ ] Set up uptime monitoring
- [ ] Configure error tracking

### Documentation
- [ ] Update API documentation
- [ ] Update deployment guide
- [ ] Create user guide
- [ ] Add troubleshooting section

## Common Issues and Solutions

### Backend Issues
1. **Missing API keys**:
   - Solution: Verify environment variables are set in Render dashboard

2. **Dependency installation failures**:
   - Solution: Check requirements.txt and Python version compatibility

3. **Gunicorn startup errors**:
   - Solution: Verify app.py has the correct Flask app instance name

### Frontend Issues
1. **Environment variables not loaded**:
   - Solution: Verify VITE_ prefix and Vercel environment variable configuration

2. **CORS errors**:
   - Solution: Update CORS configuration in backend app.py

3. **Build failures**:
   - Solution: Check Node.js version and package.json dependencies

### Deployment Issues
1. **Custom domain not working**:
   - Solution: Verify DNS settings and domain configuration in both platforms

2. **SSL certificate issues**:
   - Solution: Both Vercel and Render provide automatic SSL, check configuration

3. **Performance issues**:
   - Solution: Optimize assets, enable caching, use CDN

## Emergency Procedures

### Rollback Plan
1. Identify the last stable deployment
2. Revert to the previous version in Vercel/Render
3. Monitor for issues
4. Communicate with users if necessary

### Contact Information
- **Backend issues**: Check Render logs and support
- **Frontend issues**: Check Vercel logs and support
- **API issues**: Verify NASA and OpenAQ service status