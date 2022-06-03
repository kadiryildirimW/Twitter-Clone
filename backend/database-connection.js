const mongoose = require('mongoose')

const connection_string = process.env.DATABASE_CONNECTION_STRING || 'mongodb://localhost/twitter-clone'

async function main() {
  try {
    await mongoose.connect(connection_string)
    console.log('Connected to mongodb')
  } catch (err) {
    console.error(err)
  }
}

main()
