# AirAlert Pro Frontend

This is the frontend for the AirAlert Pro application, built with React, Vite, and Tailwind CSS.

## 🌐 Live Demo

Visit the live application at: [https://airalertpro.vercel.app](https://airalertpro.vercel.app)

## 🏗️ Project Overview

AirAlert Pro is a comprehensive air quality monitoring platform that integrates NASA TEMPO satellite data with ground-based sensors and AI-powered forecasting to provide real-time air quality insights and health recommendations for the people of Goa, India.

## 🛠️ Environment Variables

Create a `.env` file in this directory with the following variables:

```env
VITE_API_URL=https://progalix.earth
```

For local development, you can use:

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment to Vercel

1. Push your code to the GitHub repository: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
2. Create a new project on Vercel
3. Connect your repository
4. Set the following environment variables in Vercel:
   - `VITE_API_URL`: `https://progalix.earth`
5. Deploy!

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your backend URL

3. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📚 Additional Documentation

- [MOCK_API.md](MOCK_API.md) - Comprehensive mock API system for offline development
- [MOBILE_RESPONSIVENESS.md](MOBILE_RESPONSIVENESS.md) - Mobile design and responsiveness details

## 🤝 Contributing

1. Fork the repository: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🏆 NASA Space Apps Challenge 2025

This project was built for the NASA Space Apps Challenge 2025, specifically for the "Develop the Oracle of TEMPO" challenge.

**Project Links:**
- **GitHub Repository**: [https://github.com/DurgaPrashad/Airalertpro](https://github.com/DurgaPrashad/Airalertpro)
- **Live Demo**: [https://airalertpro.vercel.app](https://airalertpro.vercel.app)
- **Backend API**: [https://progalix.earth](https://progalix.earth)