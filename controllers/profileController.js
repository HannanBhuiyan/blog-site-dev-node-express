const {validationResult} = require('express-validator')
const validationErrorFormatter  = require('../utils/validationErrorFormater')
const Profile = require('../models/ProfileModel')
const User = require('../models/UserModel')
const Flash = require('../utils/Flash')
const url = require('url')



exports.createProfileGetController = async (req, res) => {
     const old_value = await Profile.findOne({ user: req.user._id})
     const countprofile = await Profile.findOne({ user: req.user._id}).count()
     
     res.render('../views/dashboard/profile/create-profile.ejs', 
     {
          title: 'Create New Profile',
          error: {},
          value: {},
          old_value,
          countprofile
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
               value: { title, bio, website, facebook, github, linkedin },
               old_value: {}
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

exports.editProfileGetController = async (req, res) => {

     const profile = await Profile.findOne({ user: req.user._id})

     if(!profile){
         return res.redirect('/profile/create-profile')
     }
 
     res.render('../views/dashboard/profile/edit-profile.ejs', 
     {
          title: 'Create New Profile',
          error: {},
          profile
     })
}

exports.editProfilePostController = async (req, res) => {

     let errors = validationResult(req).formatWith(validationErrorFormatter)
     const countprofile = await Profile.findOne({ user: req.user._id}).count()
     const {
          title,
          bio,
          website,
          facebook,
          github,
          linkedin
     } = req.body

     if(!errors.isEmpty()){
          res.render('../views/dashboard/profile/edit-profile.ejs', 
          {
               title: 'Create New Profile',
               error: {},
               profile: {
                    title,
                    bio,
                    links: {
                         website,
                         facebook,
                         github,
                         linkedin
                    }
               }
          })
     }
     try {

          let profile = {
               title,
               bio,
               links: {
                    website: website || '',
                    facebook: facebook || '',
                    github: github || '',
                    linkedin : linkedin || ''
               },
          }
          await Profile.findOneAndUpdate(
               {user: req.user._id},
               {$set: profile},
               {new: true}
          )

          req.toastr.success("success fully")
          res.redirect('/profile/create-profile')

          
     } catch (error) {
          res.status(500).send(error)
     }



}

