// app.js

// Load environment variables from .env file
require('dotenv').config();

// Import required modules and files
const express = require('express');
const userRoutes = require('./backend/routes/userRoutes');
const exerciseRoutes = require('./backend/routes/exerciseRoutes');
const nutritionRoutes = require('./backend/routes/nutritionRoutes');
const chatRoutes = require('./backend/routes/chatRoutes');
const loggingMiddleware = require('./backend/middleware/loggingMiddleware');
const errorMiddleware = require('./backend/middleware/errorMiddleware');
const connectDB = require('./backend/config/database');


// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(loggingMiddleware);

// Connect to MongoDB and start the server after connection is established
connectDB(process.env.MONGO_URI)
    .then(() => {
      console.log('Database connected and server starting...');

        // Routes
        app.use('/api/users', userRoutes);
        app.use('/api/exercises', exerciseRoutes);
        app.use('/api/nutrition', nutritionRoutes);
        app.use('/api/chat', chatRoutes);

        // Error handling middleware
        app.use(errorMiddleware);

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });