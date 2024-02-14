const mongoose = require('mongoose')
const Note = require('./models/Note')
const { MONGO_URL } = require('../util/config')


if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })


module.exports = {
  Note
}