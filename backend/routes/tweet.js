const router = require('express').Router()
const res = require('express/lib/response')
const Tweet = require('../models/tweet')
const User = require('../models/user')

router.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find({})
      .sort({ createdAt: -1 })
      .populate({ path: 'author', select: 'firstname lastname email username profilePicture updatedAt createdAt' })
    const host = req.protocol + '://' + req.get('host')
    tweets.forEach(tweet => {
      if (!tweet.author || !tweet.author.profilePicture) return
      let profilePicture = tweet.author.profilePicture
      if (profilePicture.indexOf(host) === -1) {
        tweet.author.profilePicture = host + profilePicture
      }
    })
    res.send(tweets)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.post('/tweet', async (req, res) => {
  try {
    const { content } = req.body
    const author = req.user
    const tweet = await Tweet.create({ content, author })
    await User.updateOne({ _id: author._id }, { $push: { tweets: tweet } })
    const host = req.protocol + '://' + req.get('host')
    tweet.author.profilePicture = host + tweet.author.profilePicture
    res.send(tweet)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.put('/like', async (req, res) => {
  try {
    const { id: tweetId } = req.query
    const { _id: userId } = req.user
    await Tweet.updateOne({ _id: tweetId }, { $addToSet: { likes: userId } })
    await User.updateOne({ _id: userId }, { $addToSet: { likes: tweetId } })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

router.delete('/like', async (req, res) => {
  try {
    const { id: tweetId } = req.query
    const { _id: userId } = req.user
    await Tweet.updateOne({ _id: tweetId }, { $pull: { likes: userId } })
    await User.updateOne({ _id: userId }, { $pull : { likes: tweetId } })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

module.exports = router
