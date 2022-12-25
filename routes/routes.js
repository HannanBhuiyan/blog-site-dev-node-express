const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const homeRoute = require('./homeRoute')
const profileRoute = require('./profileRoute')
const uploadRoute = require('./uploadRoute') 
const categoryRoute = require('./categoryRoute')

const routes = [
     {
          path: '/auth',
          handler: authRoute
     },
     {
          path: '/dashboard',
          handler: dashboardRoute
     },
     {
          path: '/profile',
          handler: profileRoute
     },
     {
          path: '/category',
          handler: categoryRoute
     },
     {
          path:'/upload',
          handler: uploadRoute
     },
     {
          path: '/',
          handler: homeRoute
     }
]

module.exports = app => {
     routes.forEach(r => {
          if(r.path === '/'){
               app.get(r.path, r.handler)
          }
          else {
               app.use(r.path, r.handler)
          }
     })
}