// Mock API Handler for Vercel
// This file handles mock API requests when deployed to Vercel

import mockApi from './src/services/mockApi';

export default function handler(request, response) {
  const { method, query, body } = request;
  const { endpoint, ...params } = query;
  
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  try {
    // Route requests to appropriate mock handlers
    switch (endpoint) {
      case 'current':
        return handleCurrentData(response);
        
      case 'forecast':
        return handleForecast(response);
        
      case 'trends':
        return handleTrends(response, params.days);
        
      case 'health-recommendations':
        return handleHealthRecommendations(response, params.group);
        
      case 'pollutant-breakdown':
        return handlePollutantBreakdown(response);
        
      case 'alerts':
        if (method === 'GET') {
          return handleAlerts(response);
        } else if (method === 'POST') {
          return handleSubscribeAlerts(response, body);
        }
        break;
        
      case 'emergency-alerts':
        return handleEmergencyAlerts(response);
        
      case 'locations':
        return handleLocations(response);
        
      case 'data-validation':
        return handleDataValidation(response);
        
      case 'aqi/calculate':
        return handleCalculateAQI(response, body);
        
      case 'docs':
        return handleApiDocs(response);
        
      case 'train-model':
        return handleTrainModel(response);
        
      case '':
      case '/':
        return handleHealthCheck(response);
        
      case 'health':
        return handleHealthCheck(response);
        
      default:
        // Handle location-specific endpoints
        const locationMatch = endpoint.match(/location\/(.+)\/current/);
        if (locationMatch) {
          return handleLocationData(response, locationMatch[1]);
        }
        
        return response.status(404).json({
          status: 'error',
          message: 'Endpoint not found'
        });
    }
  } catch (error) {
    console.error('Mock API Error:', error);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

// Handler functions
function handleCurrentData(response) {
  const mockData = mockApi.generateMockCurrentData();
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleForecast(response) {
  const mockData = mockApi.generateMockForecastData();
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleTrends(response, days = 7) {
  const mockData = mockApi.generateMockTrendsData(parseInt(days));
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleHealthRecommendations(response, group = 'general') {
  const mockData = mockApi.generateMockHealthRecommendations(group);
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handlePollutantBreakdown(response) {
  const mockData = mockApi.generateMockPollutantBreakdown();
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleAlerts(response) {
  const mockData = mockApi.generateMockAlerts();
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleEmergencyAlerts(response) {
  const mockData = mockApi.generateMockEmergencyAlerts();
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleSubscribeAlerts(response, body) {
  response.status(200).json({
    status: 'success',
    message: 'Mock subscription created',
    data: body
  });
}

function handleLocations(response) {
  response.status(200).json({
    status: 'success',
    data: {
      locations: mockApi.locations,
      total_count: mockApi.locations.length,
      region: 'Goa, India'
    }
  });
}

function handleLocationData(response, locationName) {
  const mockData = mockApi.generateMockCurrentData();
  // Find location
  const location = mockApi.locations.find(loc => 
    loc.name.toLowerCase() === locationName.toLowerCase()
  );
  
  if (location) {
    mockData.location = {
      name: location.name,
      region: 'Goa, India'
    };
  }
  
  response.status(200).json({
    status: 'success',
    data: mockData
  });
}

function handleDataValidation(response) {
  response.status(200).json({
    status: 'success',
    data: {
      confidence_score: 0.92,
      data_completeness: 0.95,
      source_reliability: 'high'
    }
  });
}

function handleCalculateAQI(response, body) {
  response.status(200).json({
    status: 'success',
    data: {
      aqi: 85,
      category: 'Moderate',
      color: '#ff7e00',
      description: 'Air quality is acceptable for most people.'
    }
  });
}

function handleApiDocs(response) {
  response.status(200).json({
    status: 'success',
    data: {
      api_info: { name: 'AirAlert Pro API', version: '1.0.0' },
      data_sources: {},
      machine_learning: {},
      deployment_info: { components_loaded: true, environment: 'mock' }
    }
  });
}

function handleTrainModel(response) {
  response.status(200).json({
    status: 'success',
    message: 'Mock model trained'
  });
}

function handleHealthCheck(response) {
  response.status(200).json({
    status: 'healthy',
    service: 'AirAlert Pro API (Mock)',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}