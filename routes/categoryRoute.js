const express = require('express')
const router = express.Router()
const { flashMiddleware } = require('../middlewares')
const { getParentCategories, getCategoriesOnPage } = require('../modules/category/services/categoryService')
const  { inputTypes, filterTypes } = require('../modules/category/variables')

router.get('/create', flashMiddleware, async (req, res) => {
  const parentCategories = await getParentCategories()
  return res.render('category/create', { 
    parentCategories,
    inputTypes,
    filterTypes,
    layout: 'master/dashboard/layouts/layout' })
})

router.get('/list', flashMiddleware, async (req, res) => {
  const { categories, pageInfo } = await getCategoriesOnPage({})
  return res.render('category/list', { categories, pageInfo, layout: 'master/dashboard/layouts/layout' })
})

module.exports = router
