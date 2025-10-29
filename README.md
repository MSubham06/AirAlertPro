# 🌬️ AirAlert Pro – Let AI Speak to the Air You Breathe

An **AI-powered air quality monitoring and forecasting system** built using **NASA TEMPO satellite data** — designed to make **Goa breathe smarter**.

---

## 🚀 Project Details
- **Event:** NASA Space Apps Challenge 2025  
- **Location:** Goa, India  
- **Date:** October 4–5, 2025  
- **Built by:** [Subham M.](https://github.com/MSubham06)

⚠️ *Backend isn't deployed yet — if you know Flask + Railway, feel free to reach out and collaborate!*

---

## 💡 Overview

**AirAlert Pro** is a next-gen air quality platform that fuses **NASA TEMPO satellite data**, **ground sensors**, and **AI forecasting** to deliver real-time insights, forecasts, and health recommendations for citizens in Goa, India.  

It's built to give people the same data scientists use — but in a form that's **easy, visual, and conversational**.

---

## 🎯 Mission Statement

> "Making space-level air quality intelligence available to everyone — so decisions about health, fitness, and outdoor activity become data-driven."

---

## ⚡ Core Features

### 🛰️ NASA TEMPO Integration
- Fetches real-time atmospheric data from **NASA TEMPO**
- Tracks pollutants like **NO₂, O₃, HCHO** with hourly updates
- Uses fine-grained **2.1×4.4 km resolution** data

### 🤖 Gemini AI Assistant
- AI chatbot powered by **Gemini 2.0 Flash**
- Responds to queries like *"Is it safe to go jogging in Panaji today?"*
- Offers contextual and health-aware answers

### 📈 Smart AQI Dashboard
- Displays live **AQI using CPCB standards**
- Shows pollutant-wise breakdown (**PM2.5, PM10**, etc.)
- Includes **historical** and **24-hour ML-based forecasts**

### 🏥 Health & Safety Insights
- Dynamic mask and outdoor activity suggestions  
- Health alerts for sensitive groups  
- Emergency notifications for "Severe" conditions  

### 🧭 Designed for Everyday Users
- Clean **blue-white interface** with glassmorphism  
- Interactive charts + AI chat in one place  
- Fully responsive (Desktop / Mobile / Tablet)  

---

## 🧠 Tech Stack

### 🖥️ Frontend

| Tech | Version | Purpose |
|------|----------|----------|
| React | 18.2.0 | Frontend framework |
| Vite | 4.4.5 | Fast build tool |
| Tailwind CSS | 3.3.0 | Styling |
| Chart.js | 4.4.0 | Charts |
| Axios | 1.5.0 | API calls |
| React Router | 6.15.0 | Navigation |

### ⚙️ Backend

| Tech | Version | Purpose |
|------|----------|----------|
| Python | 3.11 | Core language |
| Flask | 3.0.3 | API framework |
| Scikit-learn | 1.3.0 | ML forecasting |
| Pandas / NumPy | 2.0.3 / 1.24.4 | Data handling |
| Gunicorn | 21.2.0 | Production-ready WSGI server |

### 🤖 AI + Data Sources

| Source | Role |
|---------|---------|
| Gemini 2.0 Flash | Conversational AI |
| NASA TEMPO | Satellite data |
| OpenAQ | Ground-level sensors |
| Open-Meteo | Weather data |

---

## 🧩 System Flow

```
NASA TEMPO + OpenAQ + Open-Meteo
↓
Flask Backend (API + ML)
↓
React Frontend (Dashboard + Chat)
↓
Gemini AI (Smart Responses)
```

---

## ⚙️ Setup & Run

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/MSubham06/airalert-pro.git
cd airalert-pro
```

### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs at http://localhost:5000
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:5000" > .env
npm run dev
# Runs at http://localhost:5173
```

---

## 🧪 Quick Testing
✅ Homepage and dashboard load  
✅ City-wise data visible  
✅ AI chatbot replies correctly  
✅ AQI forecast updates properly  
✅ Mobile responsive verified  

---

## 🧰 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Backend (.env)
```env
FLASK_ENV=production
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧬 Machine Learning Highlights
- **Model Used:** Random Forest Regressor
- **Inputs:** Pollutant data + weather conditions + temporal data
- **Outputs:** 24-hour forecast (hourly AQI)
- **Accuracy:** MAE < 15 µg/m³ for PM2.5

---

## 🪶 Design System

### 🎨 Color Palette
| Name | Color Code |
|------|------------|
| Primary Blue | #2563EB |
| Accent | #60A5FA |
| Dark | #1E3A8A |
| Light | #F8FAFC |
| Gray | #64748B |

### 🧱 Fonts
- **Headings:** Inter Bold
- **Body:** Inter Regular
- **Code:** JetBrains Mono

---

## 🔮 Roadmap

| Phase | Upcoming Additions |
|-------|--------------------|
| Phase 2 | Mobile App (React Native), IoT Sensor Integration |
| Phase 3 | Deep Learning Forecasting, Multilingual UI |
| Phase 4 | India-wide coverage, Policy recommendation module |

---

## 🤝 Contributions

Love this project or have ideas?

You can:
- Fork the repo
- Create a feature branch
- Commit your improvements
- Open a pull request

**Code Style:**
- Frontend → ESLint + Prettier
- Backend → PEP8

---

## 🌐 Live Links (Demo)
- **Frontend:** [https://airalert-pro.vercel.app](https://airalert-pro.vercel.app/)
- **Backend:** Coming soon 🚧
- **API Docs:** /api/docs

---

## 📚 Data References
- [NASA TEMPO](https://tempo.si.edu/)
- [OpenAQ Network](https://openaq.org/)
- [Open-Meteo](https://open-meteo.com/)
- [CPCB India AQI](https://cpcb.nic.in/)
- [WHO Guidelines](https://www.who.int/)

---

## 🧑‍💻 About Me

Hi! I'm Subham, a developer and AI enthusiast from the Andaman Islands 🌴.

I enjoy building projects where AI meets real-world impact — and this was my take on using space data to make something that truly helps people.

*"Technology means nothing if it doesn't make daily life better."*

**Connect with me:**
- 🌐 GitHub: [@MSubham06](https://github.com/MSubham06)
- 📸 Instagram: [@imperfectg0dz](https://instagram.com/imperfectg0dz)

---

## 📜 License

This project is open-sourced under the MIT License.

---

## 🌟 Built with ❤️ and curiosity by Subham for NASA Space Apps Challenge 2025

*"Let's make every breath count."* 🌍
