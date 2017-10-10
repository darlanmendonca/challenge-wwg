const Restaurants = require('./restaurants.model.js')

module.exports = {
  list,
}

function list(req, res) {
  Restaurants
    .find()
    .then(restaurants => {
      restaurants.length
        ? res.json(restaurants)
        : res.status(204).json(restaurants)
    })
}
