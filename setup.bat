@echo off
echo AirAlert Pro - Setup Script
echo ==========================

echo Setting up backend...
cd backend
if not exist ".env" (
    echo NASA_TOKEN=your_nasa_token_here > .env
    echo OPENAQ_API_KEY=your_openaq_api_key_here >> .env
    echo Created backend .env file - please update with your actual API keys
) else (
    echo Backend .env file already exists
)

echo Installing backend dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies. Please check your Python installation.
    pause
    exit /b %errorlevel%
)

echo.
echo Setting up frontend...
cd ../frontend
if not exist ".env" (
    echo VITE_API_URL=http://localhost:5000 > .env
    echo Created frontend .env file
) else (
    echo Frontend .env file already exists
)

echo Installing frontend dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies. Please check your Node.js installation.
    pause
    exit /b %errorlevel%
)

echo.
echo Setup complete!
echo.
echo To run the application:
echo 1. Start the backend: cd backend ^& python app.py
echo 2. Start the frontend: cd frontend ^& npm run dev
echo.
echo Visit http://localhost:5173 in your browser
pause