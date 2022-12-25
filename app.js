const express = require('express')
const app = express()
const config = require('./config/config')
const chalk = require('chalk')
const port = config.app.port
require('./config/db')
const setMiddleware = require('./middleware/middleware')
const setRoute = require('./routes/routes')

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')
 

// using middleware from middleware dir
setMiddleware(app)


// using route from routes dir
setRoute(app)


// error route

// app.use((req, res, next) => {
//      let error = new Error("404 page not found")
//      error.status = 400
//      next(error)
// })

// app.use((error, req, res, next) => {
//      if(error.status === 400) {
//           console.log(chalk.red.inverse(error.message))
//           res.render('./frontend/pages/404.ejs',
//           {
//                title: '404 page',
//                flashMessage: {}
//           })
//      }
//      else {
//           console.log(chalk.red.inverse(error.message))
//           res.render('./frontend/pages/500.ejs',
//           {
//                title: 'Internal Server Error',
//                flashMessage: {}
//           })
//      }
     
// })
 
 

// run server
app.listen(port, () => {
     console.log(chalk.green(`server run on ${port} port`))
})

