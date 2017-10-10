const Places = require('./places.model.js')

module.exports = {
  list,
}

function list(req, res) {
  Places
    .find()
    .then(places => {
      places.length
        ? res.json(places)
        : res.status(204).json(places)
    })
}
