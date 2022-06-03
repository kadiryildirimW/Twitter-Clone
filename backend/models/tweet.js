const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required() {
      return !this.originalTweet
    },
  },
  originalTweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet'
  },
  repliedTweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet'
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  replies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  retweets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Tweet', tweetSchema)
