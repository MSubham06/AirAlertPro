#!/usr/bin/env python3
"""
Verification script to check if the AirAlert Pro environment is set up correctly.
"""

import os
import sys
from pathlib import Path

def check_python_version():
    """Check if Python 3.8+ is installed"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required. Current version:", sys.version)
        return False
    print("✅ Python version:", sys.version)
    return True

def check_node_version():
    """Check if Node.js is installed"""
    try:
        import subprocess
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Node.js version:", result.stdout.strip())
            return True
        else:
            print("❌ Node.js is not installed or not in PATH")
            return False
    except FileNotFoundError:
        print("❌ Node.js is not installed or not in PATH")
        return False

def check_npm_version():
    """Check if npm is installed"""
    try:
        import subprocess
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ npm version:", result.stdout.strip())
            return True
        else:
            print("❌ npm is not installed or not in PATH")
            return False
    except FileNotFoundError:
        print("❌ npm is not installed or not in PATH")
        return False

def check_backend_dependencies():
    """Check if backend dependencies are installed"""
    try:
        import flask
        import requests
        import pandas
        import sklearn
        print("✅ Backend dependencies are installed")
        return True
    except ImportError as e:
        print("❌ Backend dependencies are missing:", str(e))
        return False

def check_frontend_dependencies():
    """Check if frontend dependencies are installed"""
    package_lock_path = Path("frontend/package-lock.json")
    node_modules_path = Path("frontend/node_modules")
    
    if package_lock_path.exists():
        print("✅ frontend/package-lock.json exists")
    else:
        print("❌ frontend/package-lock.json not found")
        return False
        
    if node_modules_path.exists():
        print("✅ frontend/node_modules directory exists")
        return True
    else:
        print("❌ frontend/node_modules directory not found")
        print("   Run 'npm install' in the frontend directory")
        return False

def check_env_files():
    """Check if environment files exist"""
    backend_env_path = Path("backend/.env")
    frontend_env_path = Path("frontend/.env")
    
    if backend_env_path.exists():
        print("✅ backend/.env file exists")
        # Check if it has content
        with open(backend_env_path, 'r') as f:
            content = f.read().strip()
            if content:
                print("✅ backend/.env has content")
            else:
                print("⚠️  backend/.env is empty")
    else:
        print("❌ backend/.env file not found")
        print("   Create backend/.env with your API keys")
        
    if frontend_env_path.exists():
        print("✅ frontend/.env file exists")
        # Check if it has content
        with open(frontend_env_path, 'r') as f:
            content = f.read().strip()
            if content:
                print("✅ frontend/.env has content")
            else:
                print("⚠️  frontend/.env is empty")
    else:
        print("❌ frontend/.env file not found")
        print("   Create frontend/.env with your API URL")

def main():
    """Main verification function"""
    print("AirAlert Pro - Environment Verification")
    print("=" * 40)
    
    checks = [
        check_python_version,
        check_node_version,
        check_npm_version,
        check_backend_dependencies,
        check_frontend_dependencies,
        check_env_files
    ]
    
    results = []
    for check in checks:
        print()
        try:
            result = check()
            results.append(result)
        except Exception as e:
            print(f"❌ Error during {check.__name__}:", str(e))
            results.append(False)
    
    print("\n" + "=" * 40)
    if all(results):
        print("🎉 All checks passed! Your environment is ready.")
        print("\nTo start the development servers:")
        print("1. Run the backend: cd backend && python app.py")
        print("2. Run the frontend: cd frontend && npm run dev")
    else:
        failed_count = len([r for r in results if not r])
        print(f"⚠️  {failed_count} check(s) failed. Please address the issues above.")
        
    return all(results)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)