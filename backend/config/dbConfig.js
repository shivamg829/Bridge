const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});
db.on('error', (error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
});

module.exports = db;