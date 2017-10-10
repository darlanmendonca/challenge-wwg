// set assertions
require('chai')
  .use(require('chai-http'))
  .use(require('chai-things'))

before(mockUser)
before(mockPlaces)

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

function mockPlaces() {
  const Places = require('../../sources/places/places.model.js')
  const mocks = require('../../sources/places/places.mock.js')

  mocks.forEach(mock => {
    const place = new Places(mock)
    place
      .save()
      .then(setMockId)

    function setMockId(place) {
      mock.id = place._id
    }
  })
}
