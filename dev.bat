@echo off
echo AirAlert Pro - Development Server
echo ================================

echo Starting backend server in background...
cd backend
start "Backend Server" /min python app.py

echo Starting frontend development server...
cd ../frontend
npm run dev

echo.
echo To stop the backend server, close the separate command window or use Task Manager.
pause