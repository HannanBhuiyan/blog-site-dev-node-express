const express = require('express')
const app = express()
const config = require('./config/config')
const port = config.app.port
const cors = require('cors')
require('./config/db')
const morgan = require('morgan')


// import route
const authRoute = require('./routes/authRoute')


// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')
 
 
// setup middleware array
const middleware =  [
     express.static('public'),
     morgan('dev'),
     express.urlencoded({ extended: true }),
     express.json(),
     cors()
]

app.use(middleware)

// use custom route
app.use("/auth", authRoute)

 
app.get('/', (req, res) => {
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
