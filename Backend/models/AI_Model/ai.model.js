import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    trim: true
  },
  aiResponse: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true
  },
  messages: [messageSchema],
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)
export default ChatHistory
