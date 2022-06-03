const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/current-user', async (req, res) => {
  try {
    const { user } = req
    if (user) {
      const host = req.protocol + '://' + req.get('host')
      user.profilePicture = host + user.profilePicture
      res.send(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body
    if ((!username && !email) || !password) {
      res.sendStatus(400)
      return
    }
    const query = username ? { username } : { email }
    const user = await User.findOne(query)
    if (!user) {
      res.sendStatus(404)
      return
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (isValid) {
      const private_key = process.env.PRIVATE_KEY || 'qFFm6MdxIhQizKUy09MbPLAFpZfbiSuv'
      const session_duration = parseInt(process.env.SESSION_DURATION) || 31536000
      const token = jwt.sign({
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + session_duration 
      }, private_key)
      const host = req.protocol + '://' + req.get('host')
      user.profilePicture = host + user.profilePicture
      res.send({ user, token, session_duration })
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, bio, birthday, link, location, profilePicture } = req.body
    if (!firstname || !lastname || !username || !email || !password || !birthday) {
      res.sendStatus(400)
      return
    }
    const isCurrent = {}
    const test = await User.find({ $or: [ { username }, {email} ] })
    isCurrent.username = test.filter(user => user.username === username).length !== 0 ? true : false
    isCurrent.email = test.filter(user => user.email === email).length !== 0 ? true : false
    if (test.length) {
      res.status(409).send(isCurrent)
      return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ 
      firstname, lastname, username, email,
      bio, birthday, link, location, profilePicture,
      password: hashedPassword
    })
    const private_key = process.env.PRIVATE_KEY || 'qFFm6MdxIhQizKUy09MbPLAFpZfbiSuv'
    const session_duration = parseInt(process.env.SESSION_DURATION) || 31536000
    const token = jwt.sign({ 
      _id: user._id,
      exp: Math.floor(Date.now() / 1000) + session_duration 
    }, private_key)
    const host = req.protocol + '://' + req.get('host')
    user.profilePicture = host + user.profilePicture
    res.send({ user, token, session_duration })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

router.put('/follow', async (req, res) => {
  try {
    const followerId = req.user._id
    const { user: userId } = req.query
    if (followerId.toString() === userId) { 
      res.sendStatus(403)
      return
    }
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { follower: followerId } }, { new: true }).select('following follower')
    const follower = await User.findByIdAndUpdate(followerId, { $addToSet: { following: userId } }, { new: true }).select('following follower')
    res.send({ follower, user })
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.delete('/follow', async (req, res) => {
  try {
    const followerId = req.user._id
    const { user: userId } = req.query
    const user = await User.findByIdAndUpdate(userId, { $pull: { follower: followerId } }, { new: true }).select('following follower')
    const follower = await User.findByIdAndUpdate(followerId, { $pull: { following: userId } }, { new: true }).select('following follower')
    res.send({ follower, user })
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    .select('firstname lastname username profilePicture backgroundPicture bio location link follower following tweets')
    .populate({ path: 'tweets', options: { sort: { 'createdAt': -1 } } })
    if (user) {
      const host = req.protocol + '://' + req.get('host')
      user.profilePicture = host + user.profilePicture
      user.backgroundPicture = host + user.backgroundPicture
      res.send(user)
    } else {
      res.sendStatus(404)
    }   
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

module.exports = router
