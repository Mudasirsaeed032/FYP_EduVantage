const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  content: String,
  timestamp: Date
});

module.exports = mongoose.model('Chat', chatSchema);
