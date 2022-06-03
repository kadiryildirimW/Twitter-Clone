const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

if (!process.env.DISTRIBUTION) {
  require('dotenv').config()
}

app.use(express.static('public'))

const whitelist = process.env.CORS_WHITE_LIST.split(',') || ['http://localhost:8080']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

require('./database-connection')

app.use(require('./session-manager'))

const indexRouter = require('./routes/index')
const tweetRouter = require('./routes/tweet')
const userRouter = require('./routes/user')

app.use(indexRouter)
app.use(tweetRouter)
app.use(userRouter)

module.exports = app
