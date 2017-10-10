module.exports = {
  list,
}

function list(req, res) {
  const data = [
    {name: 'darlan', lastname: 'mendonça'},
    {name: 'clara', lastname: 'mendonça'},
  ]
  res.json(data)
}
