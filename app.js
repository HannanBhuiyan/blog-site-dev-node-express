const express = require('express')
const app = express()
const config = require('./config/config')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const {isUnAuthenticated} = require('./middleware/authMiddleware')
const port = config.app.port
const cors = require('cors')
require('./config/db')
const morgan = require('morgan')


// import route
const authRoute = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardRoute')


// import middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocal = require('./middleware/setLocalsMiddleware')


// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')
 
 
// setup middleware array
const middleware =  [
     express.static('public'),
     morgan('dev'),
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
     bindUserWithRequest(),
     setLocal()
]

app.use(middleware)


// use custom route

app.use("/auth", authRoute)
app.use("/dashboard" , dashboardRoutes)

 
app.get('/', isUnAuthenticated, (req, res) => {
     res.render('./frontend/pages/index.ejs', {title: 'Home'})
})

// router not found
app.get('*', (req, res) => {
     res.send("Router not found")
})


// run server
app.listen(port, () => {
     console.log(`server run on ${port} port`)
})
