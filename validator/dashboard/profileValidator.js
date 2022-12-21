const { body } = require('express-validator')
const  validator  = require("validator")

const linkValidator = value => {
     if(value) {
          if (!validator.isURL(value)){
               throw new Error("Please provide valid url")
          }
     }
     return true
 }

module.exports = [

     body('title')
          .notEmpty()
          .withMessage("Title field is required")
          .isLength({max: 50})
          .withMessage("Max length 50 characters")
          .trim()
     ,
     body('bio')
          .notEmpty()
          .withMessage("Bio field is required")
          .isLength({max: 400})
          .withMessage("max length 400 characters")
     ,
     body('website')
          .custom(linkValidator)
     ,
     body('linkedin')
          .custom(linkValidator)
     ,
     body('facebook')
          .custom(linkValidator)
     ,
     body('github')
          .custom(linkValidator)

]

 