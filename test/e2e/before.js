const Users = require('../../sources/users/users.model.js')
const mock = require('../../sources/users/users.mock.js')

// set assertions
require('chai')
  .use(require('chai-http'))
  .use(require('chai-things'))

before(mockUser)

function mockUser() {
  const user = new Users(mock)

  return user
    .save()
    .then(setUserId)

  function setUserId(user) {
    mock.id = user._id
  }
}
