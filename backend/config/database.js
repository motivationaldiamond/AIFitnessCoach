//database.js

const mongoose = require('mongoose');
const { dbURI } = require('./keys');

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Database connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
