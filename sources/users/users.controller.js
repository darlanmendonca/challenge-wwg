module.exports = {
  list,
}

function list(req, res) {
  res.json([{name: 'darlan'}, {name: 'clara'}])
}
