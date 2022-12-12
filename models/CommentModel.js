const { Schema, model } = require('mongoose')
 

const commentSchema = new Schema({
     post: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          required: true
     },
     user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true  
     },
     body: {
          type: String,
          required: true,
          trim: true
     },
     replies: [
          {
               body:{
                    type: String,
                    required: true,
                    trim: true
               },
               user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
               },
               created_at: {
                    type: Date,
                    default: Date.now
               }
          }
     ]



}, {timestamps: true})


const Comment = model('Comment', commentSchema)
module.exports = Comment