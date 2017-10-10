const mongoose = require('mongoose')
const privates = require('mongoose-private')
const encode = require('../encode/encode.helper.js')

const schema = new mongoose.Schema({
  email: {type: String, trim: true, required: true, unique: true},
  password: {type: String, set: encode.md5, private: true},
  __v: {type: Number, private: true},
})

schema.plugin(privates)

module.exports = mongoose.model('users', schema)

