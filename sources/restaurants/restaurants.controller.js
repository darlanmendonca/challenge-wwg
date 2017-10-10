const mock = require('./restaurants.mock.js')

module.exports = {
  list,
}

function list(req, res) {
  res.json(mock)
}
