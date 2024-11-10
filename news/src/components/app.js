const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db'); // MongoDB connection
const authRoutes = require('./routes/auth'); // Authentication routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', authRoutes); // Authentication routes (signup, login)

// Root route (test)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Define the port from environment or use 5000 as default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
