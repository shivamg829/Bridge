const router = require("express").Router();
const Chat = require("../models/chat.model");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    res.status(201).send({
      message: "Chat created successfully",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});
router.post("/get-all-chats", authMiddleware, async (req, res) => {
  try {
    const allChats = await Chat.find({
      members: { $in: req.body.userId },
    });
    res.status(201).send({
      message: "Chat fetch successfully",
      success: true,
      data: allChats
    })
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    })
  }
});

module.exports = router;
