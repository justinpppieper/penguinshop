const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Enter username'],
    minlength: [6, 'Sorry, your username must between 6 and 30 characters long'],
    maxlength: [30, 'Sorry, your username must between 6 and 30 characters long'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Enter your email address'],
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
    // minlength: [8, 'Use 8 characters or more for your password']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

/*
  validate unique username
 */
userSchema.path('username').validate(async (username) => {
  const result = await User.countDocuments({ username: username })
  if (result > 0) {
    return false
  }
  return true
}, 'That username is taken. Please try another.')

/*
  validate unique email
 */
userSchema.path('email').validate(async (email) => {
  const result = await User.countDocuments({ email: email })
  if (result > 0) {
    return false
  }
  return true
}, 'This email has already been registerd')

/*
  encrypts password if value changed
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { next() }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

/*
  check if password matches
 */
userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('User', userSchema)

module.exports = User
