const Votes = require('./votes.model.js')

module.exports = {
  create,
  getMostVoted,
}

function create(req, res) {
  const places = Array.from(new Set(req.body.places.filter(item => Boolean(item))))
  const {id: user} = req.token

  const vote = Votes({user, places})
  const today = {
    $gte: (new Date(Date.now())).setHours(0, 0, 0, 0),
    $lt: (new Date(Date.now())).setHours(23, 59, 59, 999),
  }

  Votes
    .findOne({user, date: today})
    .then(result => {
      if (result) {
        Votes
          .findByIdAndUpdate(result._id, {$set: {places}})
          .then(updated)
          .catch(badRequest)
      } else {
        vote
          .save()
          .then(created)
          .catch(badRequest)
      }
    })

  function updated() {
    res
      .status(200)
      .json({message: 'updated'})
  }

  function created() {
    res
      .status(201)
      .json({message: 'created'})
  }

  function badRequest(err) {
    res
      .status(400)
      .json({message: err.message})
  }
}

function getMostVoted(req, res) {
  const Places = require('../places/places.model.js')
  const today = {
    $gte: (new Date(Date.now())).setHours(0, 0, 0, 0),
    $lt: (new Date(Date.now())).setHours(23, 59, 59, 999),
    // $lt: (new Date(Date.now())).setHours(12, 0, 0, 0),
  }

  Votes
    .find({date: today})
    .then(parseVotes)
    .then(getMostFrequent)
    .then(getPlaceData)
    .then(replyPlaceInArray)

  function parseVotes(votes) {
    votes = votes
      .map(item => item.places)
      .reduce((a, b) => a.concat(b))

    return votes
  }

  function getMostFrequent(array) {
    const occurrences = Array
      .from(new Set(array))
      .map(value => {
        const amount = array.filter(c => c === value).length
        return {value, amount}
      })

    const bigOccurrence = Math.max(...occurrences.map(item => item.amount))
    const result = occurrences
      .filter(item => item.amount === bigOccurrence)
      .map(item => item.value)

    return result
  }

  function getPlaceData(id) {
    return Places.findById(id)
  }

  function replyPlaceInArray(places) {
    places = Array.isArray(places)
      ? places
      : [places]

    res.json(places)
  }
}

