const express = require('express');
const app = express();
const authRouter = require('./controllers/auth.controller');
const userRouter = require('./controllers/user.controller.js');
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
module.exports = app;

