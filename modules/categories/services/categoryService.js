const Category = require('../models/category')

const creatCategory = async (userInput) => {
  const newCategory = new Category(userInput)
  await newCategory.save()
  return newCategory
}

module.exports = creatCategory
