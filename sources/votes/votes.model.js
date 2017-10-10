const mongoose = require('mongoose')
const privates = require('mongoose-private')

const schema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  user: {type: String, required: true},
  places: {type: Array, required: true},
  __v: {type: Number, private: true},
})

schema.plugin(privates)

module.exports = mongoose.model('votes', schema)

