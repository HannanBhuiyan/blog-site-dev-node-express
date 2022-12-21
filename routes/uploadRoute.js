const router = require('express').Router()
const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const {
     uploadProfilePicController,
     removeProfilePicsController
} = require('../controllers/uploadController')




router.post(
     '/profilePicture', 
     isAuthenticated, 
     upload.single('profilePics'),
     uploadProfilePicController
)

router.delete(
     '/profilePicture',
     isAuthenticated,
     removeProfilePicsController
)


module.exports = router