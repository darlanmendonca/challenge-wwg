const {Router} = require('express')
const users = require('./users/users.controller.js')
const places = require('./places/places.controller.js')
const validate = require('./validate/validate.controller.js')
const votes = require('./votes/votes.controller.js')

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

router.use(validate.token)

router
  .route('/places/vote')
  .post(votes.create)

router
  .route('/places/mostvoted')
  .get(votes.getMostVoted)

module.exports = router
