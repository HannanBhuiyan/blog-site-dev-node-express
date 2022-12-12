const { Schema, model } = require('mongoose')
 
const profileSchema = new Schema({
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
     },
     title: {
          type: String,
          trim: true,
          maxLength: 100,
     },
     bio: {
          type: String,
          trim: true,
          maxLength: 400
     },
     links: {
          website: String,
          facebook: String,
          github: String,
          linkedin: String
     },
     profilepic: String,
     posts: [
          {
               type: Schema.Types.ObjectId,
               ref: 'Post'
          },
     ],
     bookmarks: [
          {
               type: Schema.Types.ObjectId,
               ref: 'Post'
          }
     ]
}, {
     timestamps: true
})

const Profile = model('Profile', profileSchema)
module.exports = Profile