const router = require('express').Router();
const authMiddleware = require('../middleware/auth.middleware');
const Msg = require('../models/msg.model');
const Chat = require("../models/chat.model");

router.post('/new-msg', authMiddleware, async (req, res)=>{
    try {
        const newMsg = new Msg(req.body);
        const saveMsg = await newMsg.save();
        const currentChat = await Chat.findOneAndUpdate({
            _id: req.body.chatId
        },{
            lastMsg: saveMsg._id,
            $inc: {unreadMsgCount: 1}
        })
        res.status(201).send({
            message: "Message send successfully",
            success: true,
            data: saveMsg
        })
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;