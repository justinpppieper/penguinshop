const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter username'],
    minlength: [2, 'Username can\'t be less than 2 characters'],
    maxlength: [64, 'Username can\'t be more than 64 characters'],
    unique: [true, 'That username is taken. Please try another.']
  },
  email: {
    type: String,
    required: [true, 'Enter email address'],
    unique: [true, 'This email has already registered'],
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Use 8 characters or more for your password']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
