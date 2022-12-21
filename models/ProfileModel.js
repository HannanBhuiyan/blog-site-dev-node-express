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
          required: true,
          maxLength: 50,
     },
     bio: {
          type: String,
          trim: true,
          required: true,
          maxLength: 400
     },
     links: {
          website: String,
          facebook: String,
          github: String,
          linkedin: String
     },
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