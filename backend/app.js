const express = require('express');
const app = express();
const authRouter = require('./controllers/auth.controller');
const userRouter = require('./controllers/user.controller');
const chatRouter = require('./controllers/chat.controller')
const msgRouter = require('./controllers/msg.controller')
app.use(express.json()); 
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter)
app.use('/api/msg', msgRouter);
module.exports = app;

