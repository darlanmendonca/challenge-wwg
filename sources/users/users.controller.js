const Users = require('./users.model.js')

module.exports = {
  list,
  signup,
  authenticate,
}

function list(req, res) {
  Users
    .find()
    .then(users => {
      users.length
        ? res.json(users)
        : res.status(204).json(users)
    })
}

function signup(req, res) {
  const user = Users(req.body)

  user
    .save()
    .then(created)
    .catch(badRequest)

  function created() {
    res
      .status(201)
      .json({message: 'created'})
  }

  function badRequest(err) {
    res
      .status(400)
      .json({message: err.message})
  }
}

function authenticate(req, res) {
  const encode = require('../encode/encode.helper.js')
  const jwt = require('jsonwebtoken')
  const {secret, token: tokenSets} = require('../config.js')

  const email = req.body.email
  const password = encode.md5(req.body.password)

  Users
    .findOne({email, password})
    .then(generateToken)

  function generateToken(user) {
    if (!user) {
      return res
        .status(401)
        .json({message: 'invalid credentials'})
    }

    const id = user._id.toString()
    const token = jwt.sign({id, email}, secret, tokenSets)
    res.json({id, token})
  }
}
