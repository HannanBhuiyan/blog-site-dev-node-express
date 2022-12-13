const router = require('express').Router()
const { isAuthenticated } = require('../middleware/authMiddleware')

const { getDashboardController } = require('../controllers/dashboardController')



router.get('/', isAuthenticated, getDashboardController)


module.exports = router
