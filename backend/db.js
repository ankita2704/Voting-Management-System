const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL;

// Connect to MongoDB
mongoose.connect(mongoURL);

// Default connection
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export connection
module.exports = db;
