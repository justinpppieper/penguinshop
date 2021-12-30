const express = require('express')
const router = express.Router()
const { createCategory, getCategoriesOnPage, deleteCategory } = require('../modules/category/services/categoryService')
const { categoryJoiSchema } = require('../modules/category/validations/joiValidation')
const { joiErrorFormat } = require('../utils/validationFormat')
const { successWrapper, errorWrapper } = require('../utils/responseWrapper')

router.post('/', async (req, res) => {
    const validationResult = categoryJoiSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      const errors = joiErrorFormat(validationResult.error)
      return errorWrapper({
          res,
          status: 421,
          message: "Validation Errors",
          errors: errors,
          type: "ValidationErrors"
      })
    }

    try {
        const category = await createCategory(req.body)
        return successWrapper({
            res,
            status: 201,
            message: "Category created successfully.",
            data: { category }
        })
    } catch (e) {
        return errorWrapper({
          res,
          status: 422,
          message: "Validation Errors",
          errors: e,
          type: "ValidationErrors"
      })
    }
})

router.get('/', async (req, res) => {
    const { pageIndex, pageSize, keyword } = req.query
    const { categories, pageInfo } = await getCategoriesOnPage({ pageIndex, pageSize, keyword })
    return successWrapper ({
        res,
        data: { categories, pageInfo }
    })
})

router.delete('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId
    const result = await deleteCategory(categoryId)
    return successWrapper({
        res,
        data: { result }
    })
})

module.exports = router

