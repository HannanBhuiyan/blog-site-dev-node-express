const router = require('express').Router()
const {isUnAuthenticated} = require('../middleware/authMiddleware')

const { getHomeController } = require('../controllers/homeController')



router.get('/', isUnAuthenticated, getHomeController)





module.exports = router