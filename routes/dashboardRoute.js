const router = require('express').Router()
const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware') 

const { 
     getDashboardController 

} = require('../controllers/dashboardController')



router.get('/', isAuthenticated, getDashboardController)
 


module.exports = router
