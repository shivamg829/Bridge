const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  members: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    ]
  },
  lastMsg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'msgs'
  },
  unreadMsgCount: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
); 
module.exports = mongoose.model('Chat', chatSchema);