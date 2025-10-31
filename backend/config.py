import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # NASA TEMPO API
    NASA_TOKEN = os.getenv('NASA_TOKEN')
    
    # OpenAQ API
    OPENAQ_API_KEY = os.getenv('OPENAQ_API_KEY')
    
    # Weather API (Open-Meteo is free)
    WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast'
    
    # Meteomatics API credentials
    METEOMATICS_USERNAME = os.getenv('METEOMATICS_USERNAME')
    METEOMATICS_PASSWORD = os.getenv('METEOMATICS_PASSWORD')
    
    # Goa coordinates for data fetching
    GOA_COORDINATES = {
        'latitude': 15.2993,
        'longitude': 74.1240,
        'name': 'Goa, India'
    }
    
    # AQI Thresholds (Indian Standard)
    AQI_CATEGORIES = {
        'Good': {'min': 0, 'max': 50, 'color': '#00e400'},
        'Satisfactory': {'min': 51, 'max': 100, 'color': '#ffff00'},
        'Moderate': {'min': 101, 'max': 200, 'color': '#ff7e00'},
        'Poor': {'min': 201, 'max': 300, 'color': '#ff0000'},
        'Very Poor': {'min': 301, 'max': 400, 'color': '#8f3f97'},
        'Severe': {'min': 401, 'max': 500, 'color': '#7e0023'}
    }
    
    # Flask Config
    DEBUG = os.getenv('FLASK_ENV') == 'development'
    SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key_for_development')
    
    # Validation
    @classmethod
    def validate(cls):
        """Validate that required environment variables are set"""
        missing_vars = []
        if not cls.NASA_TOKEN:
            missing_vars.append('NASA_TOKEN')
        if not cls.OPENAQ_API_KEY:
            missing_vars.append('OPENAQ_API_KEY')
            
        if missing_vars:
            print(f"⚠️  Warning: Missing environment variables: {', '.join(missing_vars)}")
            print("   The application will use mock data for these services.")
            return False
        return True
