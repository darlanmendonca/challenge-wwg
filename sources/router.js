const {Router} = require('express')
const users = require('./users/users.controller.js')

const router = Router()

router
  .route('/users')
  .get(users.list)

module.exports = router
