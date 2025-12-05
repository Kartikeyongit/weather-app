# 🌤️ Weather Forecast Application

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FF7E00?style=for-the-badge&logo=openweathermap&logoColor=white)](https://openweathermap.org/)

A full-stack weather application with real-time forecasts, location detection, and favorite cities tracking.

## ✨ Features

- **🌍 Live Weather Data** - Real-time weather from OpenWeatherMap API
- **📍 Location Detection** - Automatically detects your location
- **📅 5-Day Forecast** - Detailed hourly and daily predictions
- **⭐ Favorite Cities** - Save and quickly access preferred locations
- **🌓 Dark/Light Mode** - Toggle between themes
- **🌡️ Unit Conversion** - Switch between Celsius and Fahrenheit
- **📱 Responsive Design** - Works on all device sizes

## 🖼️ Screenshots

### Dashboard
<img width="1883" height="1002" alt="Screenshot 2025-12-05 143233" src="https://github.com/user-attachments/assets/143da058-e6e1-427a-be32-ab9be2d0a70f" />

### Forecast
<img width="1883" height="997" alt="Screenshot 2025-12-05 143249" src="https://github.com/user-attachments/assets/84ae2cad-262c-49f1-8910-b6287ed0ea0a" />

### Mobile View
<img width="596" height="869" alt="Screenshot 2025-12-05 143407" src="https://github.com/user-attachments/assets/6c2de110-2c9b-44ec-9df4-68227db926ae" />


## 🏗️ Architecture
```
weather-app/
├── frontend/ # React application
│ ├── components/ # React components
│ ├── context/ # React Context for state
│ ├── hooks/ # Custom React hooks
│ └── services/ # API service layer
└── backend/ # Express.js server
├── routes/ # API routes
└── middleware/ # Custom middleware
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```
2. **Backend Setup**
```bash
cd backend
npm install
echo "OPENWEATHER_API_KEY=your_key_here" > .env
npm run dev
```
3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```
4. **Open browser**
Navigate to http://localhost:3000

## 🔧 API Endpoints

**Method**	**Endpoint**	**Description**
- GET	/api/weather/current/:city	Get current weather
- GET	/api/weather/forecast/:city	Get 5-day forecast
- GET	/api/weather/coordinates	Get weather by lat/lon

## 🛠️ Tech Stack

### Frontend:

- React 18
- CSS3 with custom animations
- React Context for state management
- Axios for API calls
- date-fns for date formatting

### Backend:

- Express.js
- Node Cache for API response caching
- CORS enabled
- Rate limiting
- Error handling middleware

## 📁 Project Structure

```text
src/
├── components/
│   ├── CurrentWeather.jsx  # Main weather display
│   ├── Forecast.jsx        # 5-day forecast
│   ├── SearchBar.jsx       # City search
│   ├── FavoritesList.jsx   # Saved cities
│   ├── WeatherAlerts.jsx   # Weather warnings
│   └── ThemeToggle.jsx     # Dark/light mode
├── hooks/
│   ├── useWeather.js       # Weather data fetching
│   └── useGeolocation.js   # Location detection
└── services/
    └── weatherService.js   # API communication
```

## 🎯 Key Features Explained

- **Location Detection**
Uses browser's Geolocation API with fallback handling and user permissions.

- **Caching Strategy**
Implements 10-minute cache at backend to reduce API calls and improve performance.

- **Responsive Design**
Mobile-first approach with CSS Grid and Flexbox for all screen sizes.

- **Error Handling**
Comprehensive error handling for API failures, network issues, and user errors.

## 🔄 Future Enhancements

- Weather maps integration
- Air quality index
- Push notifications
- PWA support
- Multi-language support

## 📝 License
MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- React team for amazing framework
- Icons from React Icons library
