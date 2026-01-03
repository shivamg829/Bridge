const router = require("express").Router();
const Chat = require("../models/chat.model");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/get-user-chats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    if (!userId) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const chats = await Chat.find({ members: userId })
      .populate("members", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    res.status(200).json({
      message: "User chats fetched successfully",
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Get user chats error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
});
