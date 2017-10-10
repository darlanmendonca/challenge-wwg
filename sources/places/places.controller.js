const Places = require('./places.model.js')
const Votes = require('../votes/votes.model.js')
const weekUtil = require('first-last-weekday')

module.exports = {
  list,
}

function list(req, res) {
  const firstDayOfWeek = weekUtil
    .lastSun(new Date())
    .setHours(0,0,0,0)

  const lastDayOfWeek = weekUtil
    .firstSun(new Date())
    .setHours(0,0,0,0)

  const week = {
    $gte: firstDayOfWeek,
    $lt: lastDayOfWeek,
  }

  Votes
    .find({date: week})
    .then(votes => {
      const {ObjectId} = require('mongodb')
      votes = votes
        .map(item => item.places)
        .reduce((a, b) => a.concat(b))
      votes = Array.from(new Set(votes))
        .map(id => ObjectId(id))

      Places
        .find({_id: {$nin: votes}})
        .then(places => {
          places.length
            ? res.json(places)
            : res.status(204).json(places)
        })
    })
}
