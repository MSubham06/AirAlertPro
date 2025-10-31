# AirAlert Pro Backend

This is the backend API for the AirAlert Pro application, built with Flask.

## 🌐 Live API

Visit the live API documentation at: [https://progalix.earth/api/docs](https://progalix.earth/api/docs)

## 🏗️ Project Overview

AirAlert Pro is a comprehensive air quality monitoring platform that integrates NASA TEMPO satellite data with ground-based sensors and AI-powered forecasting to provide real-time air quality insights and health recommendations for the people of Goa, India.

## 🛠️ Environment Variables

Create a `.env` file in this directory with the following variables:

```env
# NASA TEMPO API Token
NASA_TOKEN=your_nasa_token_here

# OpenAQ API Key
OPENAQ_API_KEY=your_openaq_api_key_here

# Meteomatics API Credentials
METEOMATICS_USERNAME=your_meteomatics_username
METEOMATICS_PASSWORD=your_meteomatics_password

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Flask Configuration
FLASK_ENV=production
PORT=5000
```

## 🚀 Deployment

### Deploying to Railway (Recommended)

1. Fork this repository to your GitHub account: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
2. Create a new project on Railway
3. Connect your forked repository
4. Set the following environment variables in Railway:
   - `NASA_TOKEN`: Your NASA Earthdata token
   - `OPENAQ_API_KEY`: Your OpenAQ API key
   - `METEOMATICS_USERNAME`: Your Meteomatics username
   - `METEOMATICS_PASSWORD`: Your Meteomatics password
   - `GEMINI_API_KEY`: Your Gemini API key
   - `FLASK_ENV`: `production`
5. Set the build command to: `pip install -r requirements.txt`
6. Set the start command to: `gunicorn app:app`
7. Set the environment to Python 3.11

### 💻 Local Development

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your API keys

4. Run the development server:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

- `GET /` - Health check
- `GET /api/current` - Current air quality data
- `GET /api/forecast` - 24-hour forecast
- `GET /api/trends` - Historical trends
- `GET /api/alerts` - Air quality alerts
- `GET /api/health-recommendations` - Health recommendations
- `GET /api/pollutant-breakdown` - Individual pollutant data
- `GET /api/locations` - Supported locations
- `POST /api/aqi/calculate` - AQI calculation
- `GET /api/docs` - Complete API documentation

### Test Endpoints
- `GET /api/test-meteomatics` - Test Meteomatics API integration

## 📖 Additional Documentation

- [../README.md](../README.md) - Main project documentation
- [../METEOMATICS_INTEGRATION.md](../METEOMATICS_INTEGRATION.md) - Detailed Meteomatics integration guide

## 🤝 Contributing

1. Fork the repository: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🏆 NASA Space Apps Challenge 2025

This project was built for the NASA Space Apps Challenge 2025, specifically for the "Develop the Oracle of TEMPO" challenge.

**Project Links:**
- **GitHub Repository**: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
- **Frontend**: [https://airalertpro.vercel.app](https://airalertpro.vercel.app)
- **Backend API**: [https://progalix.earth](https://progalix.earth)
- **API Docs**: [https://progalix.earth/api/docs](https://progalix.earth/api/docs)