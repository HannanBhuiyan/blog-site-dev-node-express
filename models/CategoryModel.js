const { Schema, model } = require('mongoose')


const categorySchema = new Schema({
     category_name: {
          type: String,
          trim: true,
          maxLength: 100,
          required: [true, 'Category field is required']
     },
     category_slug: {
          type: String,
          maxLength: 100,
          required: [true, 'Category slug field is required']
     }

}, {timestamps: true})

const Category = model('Category', categorySchema)
module.exports = Category