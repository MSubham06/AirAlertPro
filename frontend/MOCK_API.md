# 🎭 Frontend Mock API System

## Overview

The AirAlert Pro frontend implements a comprehensive mock API system that enables full functionality without a backend connection. This system is essential for:

1. **Development**: Rapid frontend development without backend dependencies
2. **Testing**: Consistent test data for UI/UX validation
3. **Demo**: Showcase full application capabilities in any environment
4. **Fallback**: Graceful degradation when backend services are unavailable

## Architecture

```
src/
├── services/
│   ├── api.js          # Main API client with real/mock switching
│   ├── mockApi.js      # Comprehensive mock data implementation
│   └── chatService.js  # AI chat with mock responses
├── mock-api-handler.js # Express server for mock API (dev only)
└── test-mock-api.js    # Validation tests for mock system
```

## Mock Data Sources

### 🛰️ NASA TEMPO Satellite Data
- **Real Source**: NASA's geostationary satellite for atmospheric composition
- **Mock Implementation**: Realistic NO₂, O₃, and HCHO column data for Goa
- **Update Frequency**: Hourly (simulated)

### 🌍 OpenAQ Ground Sensors
- **Real Source**: Global network of air quality monitoring stations
- **Mock Implementation**: Surface-level PM2.5, PM10, NO₂, O₃, SO₂, CO readings
- **Locations**: Panaji, Margao, Mapusa, Vasco da Gama, Ponda

### 🌦️ Weather Data
- **Primary Source**: Open-Meteo (free weather API)
- **Fallback Source**: Meteomatics (premium weather API)
- **Mock Implementation**: Temperature, humidity, wind speed/direction
- **Forecast**: 7-day predictions with realistic patterns

### 🤖 Gemini 2.0 Flash AI
- **Real Source**: Google's conversational AI model
- **Mock Implementation**: Context-aware responses for air quality queries
- **Capabilities**: Health recommendations, pollutant explanations, activity guidance

## Implementation Details

### Smart API Switching

The [api.js](src/services api.js) service automatically switches between real and mock APIs:

```javascript
// Automatically use mock data in development or when backend unavailable
const USE_MOCK_DATA = import.meta.env.VITE_API_URL?.includes('mock-api') || import.meta.env.DEV;

// Fallback mechanism with retry logic
const createApiMethod = (realMethod, mockMethod, methodName) => {
  if (USE_MOCK_DATA) {
    return mockMethod;
  }
  
  return (...args) => {
    // Try real API first, fall back to mock if it fails
    return realMethod(...args).catch((error) => {
      console.warn(`⚠️  Falling back to mock data for ${methodName}`);
      return mockMethod(...args);
    });
  };
};
```

### Multi-Layer Fallback System

1. **Primary**: Real backend API endpoints
2. **Secondary**: Meteomatics API (weather data only)
3. **Tertiary**: Comprehensive mock data system

### Data Realism

Mock data is generated using:
- **Statistical Models**: Based on historical air quality patterns in Goa
- **Seasonal Variations**: Monsoon and dry season considerations
- **Diurnal Patterns**: Day/night temperature and pollution cycles
- **Event Simulation**: Occasional pollution spikes for realistic testing

## Available Mock Endpoints

All real API endpoints have mock equivalents:

| Endpoint | Purpose | Mock Features |
|----------|---------|---------------|
| `GET /api/current` | Current air quality | Realistic AQI, pollutants, weather |
| `GET /api/forecast` | 24h predictions | ML-based forecasting simulation |
| `GET /api/trends` | Historical data | 30-day trend visualization |
| `GET /api/locations` | Goa city list | All 5 supported locations |
| `POST /api/aqi/calculate` | AQI computation | Indian CPCB standard calculation |
| `GET /api/alerts` | Air quality alerts | Dynamic alert generation |
| `GET /api/health-recommendations` | Personalized advice | Group-specific recommendations |
| `GET /api/pollutant-breakdown` | Individual pollutant data | Detailed health impact information |

## Chat AI Mock System

The [chatService.js](src/services chatService.js) provides intelligent mock responses:

- **Context Awareness**: Remembers conversation history
- **Location Intelligence**: Goa-specific responses
- **Health Focus**: Personalized recommendations
- **Educational Content**: Pollutant explanations and safety tips

## Testing & Validation

### Automated Tests

[test-mock-api.js](test-mock-api.js) validates all mock endpoints:

```bash
npm run test:mock-api
```

### Manual Verification

1. **Development Mode**: `npm run dev` (uses mock data by default)
2. **Mock API Server**: `npm run mock-api` (standalone mock server)
3. **Validation Script**: `node test-mock-api.js` (comprehensive testing)

## Configuration

### Environment Variables

```env
# Use mock API (development default)
VITE_API_URL=http://localhost:5173/mock-api

# Use real backend
VITE_API_URL=http://localhost:5000

# Gemini API key (optional for mock chat)
VITE_GEMINI_API_KEY=your_key_here
```

### Runtime Switching

The application can switch between real and mock APIs at runtime based on:
- Network connectivity
- Backend health status
- User preferences
- Error conditions

## Benefits

### 🚀 Development Speed
- Zero backend dependency
- Instant API responses
- Consistent test data

### 🧪 Reliable Testing
- Predictable data scenarios
- Edge case simulation
- Performance testing without external dependencies

### 🌐 Universal Compatibility
- Works offline
- Functions without API keys
- Runs in any environment

### 🛡️ Graceful Degradation
- Automatic fallback on errors
- Maintained functionality during outages
- Transparent error handling

## Future Enhancements

### 📊 Data Expansion
- Extended historical datasets
- More sophisticated ML models
- Regional weather pattern integration

### 🎨 UI/UX Testing
- Automated screenshot testing
- Cross-browser compatibility
- Mobile responsiveness validation

### 🔧 Developer Tools
- Mock data customization UI
- Real-time scenario switching
- Performance profiling tools

## Troubleshooting

### Common Issues

1. **Outdated Mock Data**: Run `npm run update-mock-data`
2. **Connection Errors**: Check `VITE_API_URL` configuration
3. **Missing Endpoints**: Verify all real API endpoints have mock equivalents

### Debugging

Enable verbose logging in development:
```javascript
// src/services/api.js
if (import.meta.env.DEV) {
  console.log('API Call:', config);
}
```

## Integration with Real Backend

When the real backend is available:
1. Update `VITE_API_URL` to point to your backend
2. Add required API keys to `.env` file
3. Mock system automatically disables
4. Fallback activates only on errors

## Security & Privacy

- **No External Calls**: Mock system operates entirely locally
- **No Data Collection**: No user data is transmitted or stored
- **Self-Contained**: All mock data is bundled with the application
- **Privacy First**: Zero tracking or analytics in mock mode

---

*This mock API system ensures AirAlert Pro remains fully functional and demonstrable in any environment while maintaining the flexibility to seamlessly integrate with production backend services.*