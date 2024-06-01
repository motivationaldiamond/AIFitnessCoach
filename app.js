//app.js

const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { loggingMiddleware, errorMiddleware } = require('./middleware');
const connectDB = require('./config/database');  // Ensure you connect to your DB if needed

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(loggingMiddleware);

// Connect to Database (if needed)
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/chat', chatRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
