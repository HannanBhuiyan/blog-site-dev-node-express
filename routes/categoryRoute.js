const router = require('express').Router()
const { isAuthenticated } = require('../middleware/authMiddleware')


const {
     categoryListController,
     categoryCreateGetController,
     categoryCreatePostController
} = require('../controllers/categoryController')


router.get('/list-category', isAuthenticated, categoryListController)
router.get('/create-category', isAuthenticated, categoryCreateGetController)
router.post('/create-category', isAuthenticated, categoryCreatePostController)



module.exports = router