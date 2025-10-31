// Mock API Service for AirAlert Pro
// Provides realistic demo data without requiring a backend

class MockApiService {
  constructor() {
    this.locations = [
      { name: 'Panaji', lat: 15.4909, lon: 73.8278, type: 'capital' },
      { name: 'Margao', lat: 15.2993, lon: 74.1240, type: 'city' },
      { name: 'Mapusa', lat: 15.5959, lon: 73.8137, type: 'town' },
      { name: 'Vasco da Gama', lat: 15.3947, lon: 73.8081, type: 'port' },
      { name: 'Ponda', lat: 15.4019, lon: 74.0070, type: 'town' }
    ];
  }

  // Generate mock current data
  getCurrentData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockCurrentData();
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 500);
    });
  }

  // Generate mock forecast data
  getForecast() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockForecastData();
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 700);
    });
  }

  // Generate mock trends data
  getTrends(days = 7) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockTrendsData(days);
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 600);
    });
  }

  // Generate mock health recommendations
  getHealthRecommendations(group = 'general') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockHealthRecommendations(group);
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 300);
    });
  }

  // Generate mock pollutant breakdown
  getPollutantBreakdown() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockPollutantBreakdown();
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 400);
    });
  }

  // Generate mock alerts
  getAlerts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockAlerts();
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 300);
    });
  }

  // Generate mock emergency alerts
  getEmergencyAlerts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockEmergencyAlerts();
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 300);
    });
  }

  // Get locations
  getLocations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            status: 'success',
            data: {
              locations: this.locations,
              total_count: this.locations.length,
              region: 'Goa, India'
            }
          }
        });
      }, 200);
    });
  }

  // Get location data
  getLocationData(locationName) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = this.generateMockCurrentData();
        // Find location
        const location = this.locations.find(loc => 
          loc.name.toLowerCase() === locationName.toLowerCase()
        );
        
        if (location) {
          mockData.location = {
            name: location.name,
            region: 'Goa, India'
          };
        }
        
        resolve({
          data: {
            status: 'success',
            data: mockData
          }
        });
      }, 500);
    });
  }

  // Generate mock current data
  generateMockCurrentData() {
    const now = new Date();
    
    // Generate realistic AQI values
    const aqiValue = this.getRandomInt(40, 180);
    const aqiCategory = this.getAQICategory(aqiValue);
    
    return {
      aqi: {
        aqi: aqiValue,
        category: aqiCategory.category,
        color: aqiCategory.color,
        description: aqiCategory.description
      },
      air_quality: {
        pm25: this.getRandomFloat(15, 90),
        pm10: this.getRandomFloat(25, 120),
        no2: this.getRandomFloat(10, 60),
        o3: this.getRandomFloat(40, 110),
        so2: this.getRandomFloat(5, 30),
        co: this.getRandomFloat(0.3, 2.5)
      },
      weather: {
        temperature: this.getRandomInt(24, 35),
        humidity: this.getRandomInt(60, 85),
        wind_speed: this.getRandomFloat(5, 20),
        wind_direction: this.getRandomInt(0, 360),
        condition: this.getRandomWeatherCondition()
      },
      location: {
        name: 'Panaji, Goa',
        region: 'Goa, India'
      },
      timestamp: now.toISOString()
    };
  }

  // Generate mock forecast data
  generateMockForecastData() {
    const forecasts = [];
    const baseTime = new Date();
    
    for (let i = 0; i < 24; i++) {
      const forecastTime = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
      
      // Generate realistic forecast values with some trend
      const hourFactor = (i % 12) / 12;
      const baseAQI = 80 + Math.sin(i * 0.5) * 30;
      
      forecasts.push({
        datetime: forecastTime.toISOString(),
        pm25: 30 + hourFactor * 40 + Math.random() * 20,
        pm10: 45 + hourFactor * 50 + Math.random() * 25,
        no2: 25 + hourFactor * 20 + Math.random() * 15,
        o3: 60 + hourFactor * 30 + Math.random() * 20,
        confidence: 0.7 + Math.random() * 0.2,
        aqi: {
          aqi: Math.max(30, Math.min(200, baseAQI + Math.random() * 40 - 20)),
          category: this.getAQICategory(baseAQI).category,
          color: this.getAQICategory(baseAQI).color
        }
      });
    }
    
    return {
      forecasts: forecasts,
      generated_at: new Date().toISOString(),
      location: {
        name: 'Panaji, Goa',
        region: 'Goa, India'
      }
    };
  }

  // Generate mock trends data
  generateMockTrendsData(days) {
    const trends = [];
    const baseDate = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - (days - i - 1));
      
      // Generate realistic trend values
      const dayFactor = i / days;
      
      trends.push({
        date: date.toISOString().split('T')[0],
        aqi: 60 + dayFactor * 60 + Math.random() * 40 - 20,
        pm25: 25 + dayFactor * 30 + Math.random() * 20,
        pm10: 40 + dayFactor * 40 + Math.random() * 25,
        no2: 20 + dayFactor * 20 + Math.random() * 15,
        o3: 50 + dayFactor * 30 + Math.random() * 20
      });
    }
    
    return trends;
  }

  // Generate mock health recommendations
  generateMockHealthRecommendations(group) {
    const recommendations = {
      general: {
        outdoor_activities: 'Safe',
        exercise: 'Normal',
        windows: 'Open'
      },
      sensitive: {
        outdoor_activities: 'Limited',
        medication: 'Have rescue inhaler ready',
        exercise: 'Light only'
      }
    };
    
    return {
      user_group: group,
      current_aqi: this.getRandomInt(40, 180),
      recommendations: recommendations[group] || recommendations.general,
      timestamp: new Date().toISOString()
    };
  }

  // Generate mock pollutant breakdown
  generateMockPollutantBreakdown() {
    const pollutants = {
      pm25: this.getRandomFloat(20, 80),
      pm10: this.getRandomFloat(30, 100),
      no2: this.getRandomFloat(15, 50),
      o3: this.getRandomFloat(45, 90),
      so2: this.getRandomFloat(8, 25),
      co: this.getRandomFloat(0.5, 2.0)
    };
    
    const pollutantBreakdown = {};
    let dominantPollutant = '';
    let maxAQI = 0;
    
    Object.keys(pollutants).forEach(pollutant => {
      const value = pollutants[pollutant];
      const individualAQI = this.calculateIndividualAQI(value, pollutant);
      const category = this.getAQICategory(individualAQI);
      
      pollutantBreakdown[pollutant] = {
        value: parseFloat(value.toFixed(2)),
        unit: 'µg/m³',
        aqi: parseFloat(individualAQI.toFixed(2)),
        category: category.category,
        health_impact: this.getHealthImpact(pollutant),
        is_primary_concern: false
      };
      
      if (individualAQI > maxAQI) {
        maxAQI = individualAQI;
        dominantPollutant = pollutant;
      }
    });
    
    if (dominantPollutant) {
      pollutantBreakdown[dominantPollutant].is_primary_concern = true;
    }
    
    return {
      pollutant_breakdown: pollutantBreakdown,
      dominant_pollutant: dominantPollutant,
      timestamp: new Date().toISOString()
    };
  }

  // Generate mock alerts
  generateMockAlerts() {
    const aqiValue = this.getRandomInt(40, 180);
    const alerts = [];
    
    if (aqiValue > 150) {
      alerts.push({
        level: 'moderate',
        title: 'Moderate Air Quality',
        message: 'Sensitive individuals should limit outdoor activities.',
        timestamp: new Date().toISOString()
      });
    }
    
    if (aqiValue > 200) {
      alerts.push({
        level: 'severe',
        title: 'Poor Air Quality Alert',
        message: 'Air quality is poor. Limit outdoor activities.',
        timestamp: new Date().toISOString()
      });
    }
    
    return {
      alerts: alerts,
      current_aqi: aqiValue
    };
  }

  // Generate mock emergency alerts
  generateMockEmergencyAlerts() {
    const aqiValue = this.getRandomInt(40, 180);
    const emergencyAlerts = [];
    
    if (aqiValue > 300) {
      emergencyAlerts.push({
        level: 'emergency',
        title: 'SEVERE AIR QUALITY EMERGENCY',
        message: 'Extremely hazardous air quality. Stay indoors, avoid all outdoor activities.',
        actions: ['Close all windows', 'Use air purifiers', 'Seek medical help if experiencing symptoms'],
        affected_groups: ['Everyone', 'Especially sensitive individuals'],
        timestamp: new Date().toISOString()
      });
    }
    
    return {
      emergency_alerts: emergencyAlerts,
      current_aqi: aqiValue,
      alert_count: emergencyAlerts.length
    };
  }

  // Helper functions
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  getAQICategory(aqiValue) {
    if (aqiValue <= 50) {
      return {
        category: 'Good',
        color: '#00e400',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
      };
    } else if (aqiValue <= 100) {
      return {
        category: 'Satisfactory',
        color: '#ffff00',
        description: 'Air quality is acceptable. However, there may be a risk for some people.'
      };
    } else if (aqiValue <= 200) {
      return {
        category: 'Moderate',
        color: '#ff7e00',
        description: 'Members of sensitive groups may experience health effects.'
      };
    } else if (aqiValue <= 300) {
      return {
        category: 'Poor',
        color: '#ff0000',
        description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
      };
    } else if (aqiValue <= 400) {
      return {
        category: 'Very Poor',
        color: '#8f3f97',
        description: 'Health alert: The risk of health effects is increased for everyone.'
      };
    } else {
      return {
        category: 'Severe',
        color: '#7e0023',
        description: 'Health warning of emergency conditions: everyone is more likely to be affected.'
      };
    }
  }

  calculateIndividualAQI(value, pollutant) {
    const multipliers = {
      pm25: 2.0,
      pm10: 1.5,
      no2: 2.5,
      o3: 1.8,
      so2: 3.0,
      co: 10.0
    };
    
    return Math.max(0, value * (multipliers[pollutant] || 2.0));
  }

  getHealthImpact(pollutant) {
    const impacts = {
      pm25: 'Respiratory and cardiovascular effects',
      pm10: 'Respiratory irritation, reduced lung function',
      no2: 'Respiratory inflammation, reduced immunity',
      o3: 'Respiratory irritation, chest pain',
      so2: 'Respiratory problems, eye irritation',
      co: 'Reduced oxygen delivery, heart problems'
    };
    
    return impacts[pollutant] || 'Health impact data unavailable';
  }

  getRandomWeatherCondition() {
    const conditions = [
      'Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 
      'Moderate Rain', 'Humid', 'Windy'
    ];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
}

export default new MockApiService();