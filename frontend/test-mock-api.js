// Test script for mock API
import mockApi from './src/services/mockApi.js';

console.log('Testing Mock API...');

// Test current data
console.log('Current Data:', mockApi.generateMockCurrentData());

// Test forecast data
console.log('Forecast Data:', mockApi.generateMockForecastData());

// Test trends data
console.log('Trends Data:', mockApi.generateMockTrendsData(7));

// Test health recommendations
console.log('Health Recommendations:', mockApi.generateMockHealthRecommendations('general'));

// Test pollutant breakdown
console.log('Pollutant Breakdown:', mockApi.generateMockPollutantBreakdown());

// Test alerts
console.log('Alerts:', mockApi.generateMockAlerts());

// Test emergency alerts
console.log('Emergency Alerts:', mockApi.generateMockEmergencyAlerts());

// Test locations
console.log('Locations:', mockApi.locations);

console.log('Mock API tests completed!');