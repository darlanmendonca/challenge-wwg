// set assertions
require('chai')
  .use(require('chai-http'))
  .use(require('chai-things'))

before(mockUser)
before(mockRestaurants)

function mockUser() {
  const Users = require('../../sources/users/users.model.js')
  const mock = require('../../sources/users/users.mock.js')
  const user = new Users(mock)

  return user
    .save()
    .then(setUserId)

  function setUserId(user) {
    mock.id = user._id
  }
}

function mockRestaurants() {
  const Restaurants = require('../../sources/restaurants/restaurants.model.js')
  const mocks = require('../../sources/restaurants/restaurants.mock.js')

  mocks.forEach(mock => {
    const restaurant = new Restaurants(mock)
    restaurant
      .save()
      .then(setMockId)

    function setMockId(restaurant) {
      mock.id = restaurant._id
    }
  })
}
