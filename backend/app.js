const express = require('express');
const app = express();
const authRouter = require('./controllers/auth.controller');
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/auth', authRouter);

module.exports = app;

