import requests
import pandas as pd
from datetime import datetime, timedelta
from config import Config
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MeteomaticsAPI:
    """
    Handle Meteomatics weather data integration as a fallback option
    """
    
    def __init__(self):
        # Get credentials from environment variables
        self.username = os.getenv('METEOMATICS_USERNAME')
        self.password = os.getenv('METEOMATICS_PASSWORD')
        self.base_url = "https://api.meteomatics.com"
        
        # Warn if credentials are missing
        if not self.username or not self.password:
            print("⚠️  METEOMATICS_USERNAME or METEOMATICS_PASSWORD not found. Using mock data for Meteomatics API.")
    
    def get_current_weather(self, lat=Config.GOA_COORDINATES['latitude'],
                          lon=Config.GOA_COORDINATES['longitude']):
        """
        Get current weather conditions from Meteomatics API
        """
        # If no credentials, return mock data
        if not self.username or not self.password:
            return self._get_mock_weather()
            
        try:
            # Format the current time for the API request
            current_time = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
            
            # Parameters for current weather data
            params = f"{current_time}/t_2m:C,relative_humidity_2m:p,wind_speed_10m:ms,wind_dir_10m:d/{lat},{lon}"
            url = f"{self.base_url}/{params}/html"
            
            # Make the request with basic authentication
            response = requests.get(url, auth=(self.username, self.password), timeout=15)
            
            if response.status_code == 200:
                # Parse the HTML response (simplified parsing)
                # In a real implementation, you would parse the HTML table properly
                data = response.text
                
                # Extract data from HTML (this is a simplified approach)
                processed_data = {
                    'temperature': self._extract_value(data, 't_2m:C'),
                    'humidity': self._extract_value(data, 'relative_humidity_2m:p'),
                    'wind_speed': self._extract_value(data, 'wind_speed_10m:ms'),
                    'wind_direction': self._extract_value(data, 'wind_dir_10m:d'),
                    'timestamp': current_time
                }
                
                return {
                    'status': 'success',
                    'data': processed_data,
                    'source': 'Meteomatics'
                }
            else:
                print(f"Meteomatics API error: {response.status_code}")
                return self._get_mock_weather()
                
        except Exception as e:
            print(f"Error fetching Meteomatics weather data: {e}")
            return self._get_mock_weather()
    
    def get_forecast_weather(self, days=7):
        """
        Get weather forecast for next 7 days from Meteomatics API
        """
        # If no credentials, return mock data
        if not self.username or not self.password:
            return self._get_mock_forecast(days)
            
        try:
            # Calculate start and end dates
            start_date = datetime.utcnow()
            end_date = start_date + timedelta(days=days)
            
            start_time = start_date.strftime('%Y-%m-%dT%H:%M:%SZ')
            end_time = end_date.strftime('%Y-%m-%dT%H:%M:%SZ')
            
            # Parameters for forecast weather data
            lat = Config.GOA_COORDINATES['latitude']
            lon = Config.GOA_COORDINATES['longitude']
            
            params = f"{start_time}--{end_time}:PT1H/t_2m:C,relative_humidity_2m:p,wind_speed_10m:ms/{lat},{lon}"
            url = f"{self.base_url}/{params}/json"
            
            # Make the request with basic authentication
            response = requests.get(url, auth=(self.username, self.password), timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Process forecast data
                forecast = []
                for item in data.get('data', []):
                    parameter = item.get('parameter', '')
                    coordinates = item.get('coordinates', [])
                    
                    if coordinates:
                        dates = coordinates[0].get('dates', [])
                        for date_item in dates:
                            date = date_item.get('date', '')
                            value = date_item.get('value', None)
                            
                            # Find existing entry for this date or create new
                            entry = next((f for f in forecast if f['date'] == date), None)
                            if not entry:
                                entry = {'date': date}
                                forecast.append(entry)
                            
                            # Map parameters to our data structure
                            if 't_2m:C' in parameter:
                                entry['temperature'] = value
                            elif 'relative_humidity_2m:p' in parameter:
                                entry['humidity'] = value
                            elif 'wind_speed_10m:ms' in parameter:
                                entry['wind_speed'] = value
                
                return {
                    'status': 'success',
                    'data': forecast,
                    'source': 'Meteomatics'
                }
            else:
                print(f"Meteomatics Forecast API error: {response.status_code}")
                return self._get_mock_forecast(days)
                
        except Exception as e:
            print(f"Error fetching Meteomatics forecast data: {e}")
            return self._get_mock_forecast(days)
    
    def _extract_value(self, html_data, parameter):
        """
        Extract value from Meteomatics HTML response
        This is a simplified parser - in production, use proper HTML parsing
        """
        try:
            # Find the parameter in the HTML
            if parameter in html_data:
                # Simple extraction - find the parameter and get the next value
                param_index = html_data.find(parameter)
                if param_index > 0:
                    # Look for the value after the parameter
                    value_start = html_data.find('<td>', param_index) + 4
                    value_end = html_data.find('</td>', value_start)
                    if value_start > 4 and value_end > value_start:
                        value_str = html_data[value_start:value_end].strip()
                        # Try to convert to float
                        try:
                            return float(value_str)
                        except ValueError:
                            return value_str
            return None
        except:
            return None
    
    def _get_mock_weather(self):
        """Generate mock current weather data"""
        import random
        
        mock_data = {
            'temperature': round(random.uniform(24, 32), 1),  # Typical for Goa
            'humidity': round(random.uniform(60, 85), 1),
            'wind_speed': round(random.uniform(5, 15), 1),
            'wind_direction': round(random.uniform(0, 360), 1),
            'timestamp': datetime.now().isoformat()
        }
        
        return {
            'status': 'success',
            'data': mock_data,
            'source': 'Meteomatics_MOCK'
        }
    
    def _get_mock_forecast(self, days):
        """Generate mock forecast data"""
        import random
        
        forecast = []
        for i in range(days):
            date = (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%dT%H:%M:%SZ')
            forecast_day = {
                'date': date,
                'temperature': round(random.uniform(24, 32), 1),
                'humidity': round(random.uniform(60, 85), 1),
                'wind_speed': round(random.uniform(5, 15), 1)
            }
            forecast.append(forecast_day)
        
        return {
            'status': 'success',
            'data': forecast,
            'source': 'Meteomatics_Forecast_MOCK'
        }