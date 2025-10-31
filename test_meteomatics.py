#!/usr/bin/env python3
"""
Test script for Meteomatics API integration
"""

import sys
import os

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.api.meteomatics import MeteomaticsAPI

def test_meteomatics_api():
    """Test Meteomatics API integration"""
    print("Testing Meteomatics API integration...")
    
    # Initialize the API
    api = MeteomaticsAPI()
    
    # Test current weather
    print("\n1. Testing current weather data...")
    current_weather = api.get_current_weather()
    print(f"Status: {current_weather['status']}")
    print(f"Source: {current_weather['source']}")
    if current_weather['status'] == 'success':
        print(f"Data: {current_weather['data']}")
    
    # Test forecast
    print("\n2. Testing forecast data...")
    forecast = api.get_forecast_weather(days=3)
    print(f"Status: {forecast['status']}")
    print(f"Source: {forecast['source']}")
    if forecast['status'] == 'success':
        print(f"Data points: {len(forecast['data'])}")
        if forecast['data']:
            print(f"First forecast entry: {forecast['data'][0]}")
    
    print("\nTest completed!")

if __name__ == "__main__":
    test_meteomatics_api()