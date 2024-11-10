// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const port = 5000; // Port to listen on

// Middleware to handle CORS and JSON body parsing
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json()); // Parse JSON bodies in incoming requests

// MongoDB connection string with the updated database name "premiumcontent"
mongoose.connect('mongodb://localhost:27017/premiumcontent', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define a user schema for MongoDB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create a user model from the schema
const User = mongoose.model('User', userSchema);

// Signup route - handles user registration
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all necessary fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password, // Note: You should hash the password before saving it in production!
        });

        // Save the new user to the database
        await newUser.save();
        res.json({ message: 'Signup successful' });

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user' });
    }
});

// Login route - handles user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // In a real application, you should compare hashed passwords
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login, you can return a token or any user data
        res.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
