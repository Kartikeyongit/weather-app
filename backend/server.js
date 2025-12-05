const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app', // Will update after deployment
    'https://weather-app-frontend.vercel.app' // Example
  ],
  credentials: true
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Weather API is running' });
});

// Updated 404 handler - fixed syntax
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🌤️ Weather backend running on port ${PORT}`);
});