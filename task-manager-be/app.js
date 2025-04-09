const express = require('express');
const { connectDB } = require('./config/db');
const taskRoute = require('./routes/taskRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Kết nối Database
connectDB();

// Middleware
app.use(express.json()); // Cho phép nhận dữ liệu JSON trong request body
const corsOptions = {
  origin: [
    'http://taskmanagerfe.s3-website-ap-southeast-1.amazonaws.com',
    'http://127.0.0.1:5500',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api/tasks', taskRoute);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Export app để sử dụng trong server.js
module.exports = app;
