const express = require('express')
const morgan = require('morgan')
var flash = require('connect-flash');
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const config = require('../config/config')

const { bindUserWithRequest } = require('./authMiddleware')
const setLocal = require('./setLocalsMiddleware')


const middleware =  [
     express.static('public'),
     express.urlencoded({ extended: true }),
     express.json(),
     cors(),
     session({
          secret: config.secret_key.key || "SECRET_KEY",
          resave: false,
          saveUninitialized: false,
          store: MongoStore.create({
               mongoUrl: config.db.url,
               collectionName: 'session',
               autoRemoveInterval: 2
          })
     }),
     flash(),
     bindUserWithRequest(),
     setLocal()
]

module.exports = app => {
     middleware.forEach( (m) => {
          app.use(m)
     })
}