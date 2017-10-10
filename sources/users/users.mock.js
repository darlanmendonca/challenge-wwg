// const jwt = require('jsonwebtoken')
// const {secret, token: tokenSets} = require('../config.js')
const faker = require('faker')

const mock = {
  email: 'iknownothing@snow.com',
  password: 'ygridiloveyou',
}

// const {id, email} = mock
// const token = jwt.sign({id, email}, secret, tokenSets)
// mock.token = token
// mock.invalidToken = token.replace(/^.{2}/, '')
mock.invalidPassword = faker.internet.password()

module.exports = mock
