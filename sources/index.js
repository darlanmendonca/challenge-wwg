const express = require('express')
const app = express()
const cors = require('cors')
const gzip = require('compression')
const methodOverride = require('method-override')
const multer = require('multer')
const {urlencoded, json} = require('body-parser')
const router = require('./router.js')
const {port} = require('./config.js')

app
  .use(cors())
  .use(gzip())
  .use(methodOverride())
  .use(multer().array())
  .use(urlencoded({extended: true}))
  .use(json())
  .use(router)

app.listen(port)

module.exports = app
