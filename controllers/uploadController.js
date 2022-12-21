const User = require('../models/UserModel')
const fs = require('fs')


exports.uploadProfilePicController = async (req, res) => {

     if(req.file){

          try {
          
               let profilePics = `/uploads/${req.file.filename}`
               
               // upload image
               await User.findOneAndUpdate(
                    {_id: req.user._id},
                    {$set: {profilePics}}
               )
               
               // remove old image
               if(req.user.profilePics !== '/uploads/default.png') {
                    fs.unlinkSync(`public${req.user.profilePics}`)
               }
               
               res.status(200).json({profilePics})

          } catch (error) {
               res.status(500).json({
                    profilePics: req.user.profilePics
               })
          }
     } 
     else {
          res.status(500).json({
               profilePics: req.user.profilePics
          })  
     }
}


exports.removeProfilePicsController = async  (req, res) => {
 
     try {
          let defaultImg = '/uploads/default.png'
           
          // update image by default image
          await User.findOneAndUpdate(
               {_id: req.user._id},
               {$set: {profilePics: defaultImg}}
          )

          // remove old image
          if(req.user.profilePics !== '/uploads/default.png') {
               fs.unlinkSync(`public${req.user.profilePics}`)
          }
            
          res.status(200).json(
               {
                    profilePics: defaultImg
               }
          )


     } catch (error) {
          res.status(500).json({error})
     }
     
}

