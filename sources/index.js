const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const gzip = require('compression')
const methodOverride = require('method-override')
const multer = require('multer')
const {urlencoded, json} = require('body-parser')
const filter = require('./filter/filter.helper.js')
const router = require('./router.js')
const {port, database} = require('./config.js')

app
  .use(cors())
  .use(gzip())
  .use(methodOverride())
  .use(multer().array())
  .use(urlencoded({extended: true}))
  .use(json())
  .use(filter)
  .use(router)

mongoose.Promise = Promise

mongoose
  .connect(`mongodb://localhost/${database}`, {useMongoClient: false})
  .then(migration)
  .then(() => app.listen(port))
  .catch((err) => console.error(err))//'error on connect db'))

function migration() {
  // temporary migration, is better use something more mature, like mongodb-migrations
  const isDevelopment = app.get('env') === 'development'
  const Places = require('./places/places.model.js')

  if (isDevelopment) {
    return Places
      .find({})
      .then(mockPlaces)
  }

  function mockPlaces(places) {
    const mocks = require('./places/places.mock.js')
    if (!places.length) {
      mocks.forEach(mock => {
        const place = new Places(mock)

        place.save()
      })
    }
  }
}

module.exports = app
