const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/UserModel')
const {validationResult} = require('express-validator')
const errorFormatter  = require('../utils/validationErrorFormater')


// get registration controller
exports.signupGetController = (req, res) => {
     res.render('../views/frontend/pages/signup.ejs', {title: "Registration", error:{}, value:{}})
}

// post registration controller
exports.signupPostController = async (req, res) => {

     const {username, email, password, confirm_password } = req.body
     const errors = validationResult(req).formatWith(errorFormatter)

     if(!errors.isEmpty()){
          return res.render('../views/frontend/pages/signup.ejs', 
          {
               title: "Registration", 
               error:errors.mapped(),
               value: {
                    username, email, password, confirm_password
               }
          })
     }
  
    
     try { 
          let hashPassword = await bcrypt.hash(password, saltRounds)
          const newUser = new User({
               username,
               email,
               password: hashPassword
          })
          await newUser.save()
          return res.redirect('/auth/login') 
        
     } catch (error) {
          res.status(500).send(error.message)
     }
     
}

// get login controller
exports.loginGetController = (req, res) => {
     res.render('../views/frontend/pages/login.ejs', {title: 'Login Your Account', error:{}, value:{}})
}

// post login controller
exports.loginPostController = async (req, res) => {
 
     const { username , password } = req.body

     const errors = validationResult(req).formatWith(errorFormatter)
     if(!errors.isEmpty()){
          return res.render('../views/frontend/pages/login.ejs',
          {
               title: 'Login Your Account', 
               error: errors.mapped(),
               value: { username, password }
          })
     }
  

     try {
          const user = await User.findOne({username})
          req.session.isLoggedIn = true
          req.session.user = user

          req.session.save((error)=> {
               if(error){
                   res.status(500).send(error) 
               }
               else {
                    return res.redirect('/dashboard')
               }
          })
           
     } catch (error) {
          res.status(500).send(error.message)
     }


}

// logout controller
exports.logoutController = (req, res) => {
     req.session.destroy( (error) => {
          console.log(error)
     })
     
     return res.redirect('/')
}