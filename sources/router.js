const {Router} = require('express')
const users = require('./users/users.controller.js')
const places = require('./places/places.controller.js')

const router = Router()

router
  .route('/users')
  .get(users.list)
  .post(users.signup)

router
  .route('/users/authenticate')
  .post(users.authenticate)

router
  .route('/places')
  .get(places.list)

module.exports = router
