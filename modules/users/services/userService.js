const User = require('../models/user')

const createUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}

module.exports = { createUser }
