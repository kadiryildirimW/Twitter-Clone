const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  profilePicture: {
    type: String,
    required: true,
    default () {
      return `/fonts/icons/avatars/${this.firstname[0].toUpperCase()}.svg`
    }
  },
  backgroundPicture: {
    type: String,
    required: true,
    default () {
      return `/images/background/default.jpg`
    }
  },
  bio: String,
  location: String,
  link: String,
  tweets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tweet'
    }
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  follower: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
