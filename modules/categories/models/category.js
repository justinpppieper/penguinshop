const mongoose = require('mongoose')

const categoryschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [6, 'Sorry, the category name must between 6 and 30 characters long'],
    maxlength: [30, 'Sorry, the category name must between 6 and 30 characters long'],
    unique: true
  },
  description: {
    type: String,
    require: [true, 'Description of category is required']
  },
  seoDescription: {
    type: String,
    maxlength: 64
  },
  thumbnail: {
    type: String
  },
  properties: [],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date
  }

})

const Category = mongoose.model('Category', categoryschema)

module.exports = Category
