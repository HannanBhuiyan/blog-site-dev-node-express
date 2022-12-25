const express = require('express')
const flash = require('connect-flash');
var cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
const toastr = require('express-toastr')
const MongoStore = require('connect-mongo')
const config = require('../config/config')

const { bindUserWithRequest } = require('./authMiddleware')
const setLocal = require('./setLocalsMiddleware')

const middleware =  [
     express.static('public'),
     express.urlencoded({ extended: true }),
     express.json(),
     cors(),
     cookieParser('SECRET_KEY'),
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
     toastr(),
     bindUserWithRequest(),
     setLocal()
]

module.exports = app => {
     middleware.forEach( (m) => {
          app.use(m)
     })
}