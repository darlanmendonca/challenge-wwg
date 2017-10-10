const Users = require('./users.model.js')

module.exports = {
  list,
  signup,
}

function list(req, res) {
  Users
    .find()
    .then(users => {
      users.length
        ? res.json(users)
        : res.status(204).json(users)
    })
}

function signup(req, res) {
  const user = Users(req.body)

  user
    .save()
    .then(created)
    .catch(badRequest)

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
