const { body } = require('express-validator')
const User = require('../../models/UserModel')

module.exports = [
     body('username')
     .notEmpty().withMessage('Username field is required')
     .isLength({min: 2, max:15}).withMessage("Username must between 2 to 15 characters")
     .custom( async username => {
          const user = await User.findOne({username})
          if(user){
               return Promise.reject("Username already used")
          }
     })
     .trim(),
     body('email')
     .notEmpty().withMessage("Email field is required")
     .isEmail().withMessage("Enter a valid email")
     .custom(async email => {
          const user = await User.findOne({email})
          if(user){
               return Promise.reject("Email already used")
          }
     })
     .normalizeEmail(),
     body('password')
     .notEmpty().withMessage("Password field is required")
     .isLength({min: 5}).withMessage("Your password must be greater than 5 characters"),
     body('confirm_password')
     .notEmpty().withMessage("Confirm Password field is required")
     .isLength({min: 5}).withMessage("Your password must be greater than 5 characters")
     .custom((confirm_password, {req}) => {
          if(confirm_password !== req.body.password){
               throw new Error("Password does not match")
          }
          return true
     } )
]
