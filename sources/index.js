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
  .then(() => app.listen(port))
  .catch(() => console.error('error on connect db'))

module.exports = app
