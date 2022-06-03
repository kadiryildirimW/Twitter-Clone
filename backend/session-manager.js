const User = require('./models/user')
const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies ? req.cookies['token-27jd*'] : null
    if (token) {
      const private_key = process.env.PRIVATE_KEY || 'qFFm6MdxIhQizKUy09MbPLAFpZfbiSuv'
      const session_duration = parseInt(process.env.SESSION_DURATION) || 31536000
      const { _id } = jwt.verify(token, private_key)
      const user = await User.findOne({ _id })
      req.user = user ? user : null
    } else {
      req.user = null
    }
    next()
  } catch (err) {
    req.user = null
    console.error(err)
    next()
  }
}