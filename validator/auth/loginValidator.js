const {body} = require('express-validator')
const User = require('../../models/UserModel')
const bcrypt = require('bcrypt');

module.exports = [
     body('username')
     .notEmpty().withMessage("Username can not be empty")
     .custom(async username => {
          const user = await User.findOne({username})
          if(!user){
               return Promise.reject('Invalid Credential')
          }
     }),
     body('password')
     .notEmpty().withMessage("Password can not be empty")
     .custom(async (password, {req}) => {
          const user = await User.findOne({ username: req.body.username  })
          if(user){
               let match = await bcrypt.compare(password, user.password)
               if(!match){
                    return Promise.reject('Invalid Credential')
               }
          }
          else {
               return Promise.reject('Invalid Credential')
          }
          return true
         
     })
]