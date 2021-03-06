module.exports = filter

function filter(req, res, next) {
  // return next()
  const resJson = res.json
  res.json = fielterFields
  next()

  function fielterFields(data) {
    data = data && data.toJSON
      ? data.toJSON()
      : data

    if (data) {
      const fields = Array.isArray(data)
        ? Object.keys(data[0].toJSON ? data[0].toJSON() : data[0]).join(',')
        : Object.keys(data).join(', ')

      res.header('Allow-filters', fields)
    }

    const filtered = Array.isArray(data)
      ? data.map(item => filter(item))
      : filter(data)

    resJson.call(this, filtered)
  }

  function filter(data) {
    const filters = req.headers.filters
    if (filters) {
      const fields = filters
        .replace(/\s+/, '')
        .split(',')

      let newObj = {}

      fields.forEach(field => newObj[field] = data[field])
      data = newObj
    }

    return data
  }
}
