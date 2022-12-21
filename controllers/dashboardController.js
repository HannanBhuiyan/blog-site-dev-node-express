const Flash = require('../utils/Flash')
const Profile = require('../models/ProfileModel')

exports.getDashboardController = async (req, res, next) => {
 
     try {
          const profile = await Profile.findOne({user: req.user._id})
          if(profile){
              return res.render('../views/dashboard/dashboard.ejs',
               {
                    title: "Dashboard",
                    flashMessage: Flash.getMessage(req)
               })
          }

          res.redirect('/profile/create-profile')
          
     } catch (error) {
          res.status(500).send(error.message)
     }
     
     
}


 