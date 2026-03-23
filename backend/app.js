const express = require('express');
const app = express();
const authRouter = require('./controllers/auth.controller');
const userRouter = require('./controllers/user.controller');
const chatRouter = require('./controllers/chat.controller')
app.use(express.json()); 
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter)
module.exports = app;

