const {validationResult} = require('express-validator')
const validationErrorFormatter  = require('../utils/validationErrorFormater')
const Profile = require('../models/ProfileModel')
const User = require('../models/UserModel')
exports.createProfileGetController = async (req, res) => {
     const old_value = await Profile.findOne({ user: req.user._id})
     
     console.log(old_value.links.website)

     res.render('../views/dashboard/profile/create-profile.ejs', 
     {
          title: 'Create New Profile',
          error: {},
          value: {},
          old_value
     })
}

exports.createProfilePostController = async (req, res) => {
 
     const errors = validationResult(req).formatWith(validationErrorFormatter)
    
   

     const {
          title,
          bio,
          website,
          facebook,
          github,
          linkedin
     } = req.body
   
      

     if(!errors.isEmpty()){
          return res.render('../views/dashboard/profile/create-profile.ejs', 
          {
               title: "Create New Profile",
               error: errors.mapped(),
               value: {title, bio, website, facebook, github, linkedin},
              
               
          })
     }


     try {
          const profile = new Profile({
               user: req.user._id,
               title,
               bio,
               links: {
                    website: website || '',
                    facebook: facebook || '',
                    github: github || '',
                    linkedin : linkedin || ''
               },
               posts: [],
               bookmarks: [],
          })
          let createProfile = await profile.save()
          await User.findOneAndUpdate(
               {_id: req.user._id},
               {$set: {profile_id: createProfile._id}}
          )
          req.flash('success', 'User Profile Created Successfully')
          return res.redirect('/dashboard')

     } catch (error) {
         res.status(500).send(error) 
     }

     

}

exports.editProfileGetController = (req, res) => {
     res.render('../views/dashboard/profile/edit-profile.ejs', 
     {
          title: 'Create New Profile'
     })
}

exports.editProfilePostController = (req, res) => {

}

