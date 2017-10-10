// set assertions
require('chai')
  .use(require('chai-http'))
  .use(require('chai-things'))

before(mockUser)
before(mockPlaces)
before(mockVotes)

function mockUser() {
  const Users = require('../../sources/users/users.model.js')
  const mock = require('../../sources/users/users.mock.js')
  const user = new Users(mock)

  return user
    .save()
    .then(setUserId)
    .then(setToken)

  function setUserId(user) {
    mock.id = user._id
    return user
  }

  function setToken(user) {
    const jwt = require('jsonwebtoken')
    const {secret, token: tokenSets} = require('../../sources/config.js')

    const {id, email} = user
    const token = jwt.sign({id, email}, secret, tokenSets)

    mock.token = token
    mock.invalidToken = token.replace(/^.{2}/, '')
  }
}

function mockPlaces() {
  const Places = require('../../sources/places/places.model.js')
  const mocks = require('../../sources/places/places.mock.js')

  mocks.forEach((mock, index) => {
    const place = new Places(mock)

    place
      .save()
      .then(setMockId)

    function setMockId(place) {
      mocks[index].id = place._id.toString()
    }
  })
}

function mockVotes() {
  const Votes = require('../../sources/votes/votes.model.js')
  const user = require('../../sources/users/users.mock.js')
  const today = new Date()
  const yesterday = today.setDate(today.getDate() - 1)

  const vote = new Votes({
    user: user.id,
    date: yesterday,
    places: [
      '58777769d65deb5fb26a3cc8',
      '58777769d65deb5fb26a3cc9',
    ],
  })

  return vote.save()
}
