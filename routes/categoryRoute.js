const express = require('express')
const router = express.Router()

router.get('/category-create', (req, res) => {
  return res.render('category/create')
})

module.exports = router
