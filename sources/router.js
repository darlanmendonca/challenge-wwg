const {Router} = require('express')
const users = require('./users/users.controller.js')
const restaurants = require('./restaurants/restaurants.controller.js')

const router = Router()

router
  .route('/users')
  .get(users.list)
  .post(users.signup)

router
  .route('/restaurants')
  .get(restaurants.list)

module.exports = router
