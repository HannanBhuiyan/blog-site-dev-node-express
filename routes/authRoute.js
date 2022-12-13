const router = require('express').Router()
const signupValidator = require('../validator/auth/signupValidator') 
const loginValidator = require('../validator/auth/loginValidator')
const {isUnAuthenticated} = require('../middleware/authMiddleware')



const {
     signupGetController,
     signupPostController,
     loginGetController,
     loginPostController,
     logoutController,
} = require('../controllers/authController')


 

router.get('/signup', isUnAuthenticated, signupGetController)
router.post('/signup', signupValidator, isUnAuthenticated, signupPostController)

router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login', loginValidator, isUnAuthenticated, loginPostController)

router.get('/logout', logoutController)


module.exports = router