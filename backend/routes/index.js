const router = require('express').Router()
const User = require('../models/user')
const Tweet = require('../models/tweet')

router.get('/reset', async (req, res) => {
  try {
    await User.collection.drop()
    await Tweet.collection.drop()
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(200)
    console.error(err)
  }
})

module.exports = router
