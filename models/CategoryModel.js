const { Schema, model } = require('mongoose')


const categorySchema = new Schema({
     category_name: {
          type: String,
          trim: true,
          maxLength: 20,
          required: [true, 'Category field is required']
     }

}, {timestamps: true})

const Category = model('Category', categorySchema)
module.exports = Category