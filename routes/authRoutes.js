const express = require('express')
const router = express.Router()
const { createUser } = require('../modules/users/services/userService')

router.get('/register', (req, res) => {
  return res.render('register', { message: null })
})

router.post('/register', async (req, res) => {
  try {
    const user = await createUser(req.body)
    return res.render('register', { message: 'Registrated successfully' })
  } catch (e) {
    console.log(e)
    return res.status(400).render('register', { message: 'Something went wrong' })
  }
})

module.exports = router
