const mongoose = require('mongoose')
const privates = require('mongoose-private')

const schema = new mongoose.Schema({
  name: {type: String, trim: true, required: true, unique: true},
  category: {type: String, trim: true, required: true},
  __v: {type: Number, private: true},
})

schema.plugin(privates)

module.exports = mongoose.model('places', schema)

