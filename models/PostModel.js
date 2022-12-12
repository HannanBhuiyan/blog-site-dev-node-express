const { Schema, model } = require('mongoose')
 
const Comment = require('./CommentModel')


const postSchema = new Schema({
     title: {
          type: String,
          trim: true,
          maxLength: 100,
          required: [true, 'Post title is required']
     },
     description: {
          type: String,
          trim: true,
          required: [true, 'Post description is required']
     },
     author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     tags: {
          type: [String],
          required: true
     },
     thumbnail: String,
     readTime: String,
     likes: [
          {
               type: Schema.Types.ObjectId,
               ref: 'User'
          }
     ],
     dislikes: [ 
          {
               type: Schema.Types.ObjectId,
               ref: 'User'
          }
     ],
     comments: [
          {
               type: Schema.Types.ObjectId,
               ref: Comment
          }
     ],
     category: {
          type: Schema.Types.ObjectId,
          ref: 'Category',
          required: [true, 'Category field is required']
     },
     status: {
          type: String,
          enum: ['active', 'inactive']
     }


},{timestamps: true})

const Post = model('Post', postSchema)
module.exports = Post
