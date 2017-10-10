const Votes = require('./votes.model.js')

module.exports = {
  create,
}

function create(req, res) {
  const places = Array.from(new Set(req.body.places.filter(item => Boolean(item))))
  const {id: user} = req.token

  const vote = Votes({user, places})
  const today = {
    $gte: (new Date(Date.now())).setHours(0,0,0,0),
    $lt: (new Date(Date.now())).setHours(23,59,59,999),
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
