const express = require('express')
const router = express.Router()
const passport = require('passport')

const { createUser } = require('../modules/users/services/userService')
const { authValSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormat, mongooseErrorFormat } = require('../utils/valFormat')
const guestMiddleware = require('../middlewares/guestMiddleware')
const flashMiddleware = require('../middlewares/flashMiddleware')

router.get('/register', guestMiddleware, flashMiddleware, (req, res) => {
  return res.render('register', {
    formData: req.body
  })
})

router.post('/register', guestMiddleware, async (req, res) => {
  try {
    // joi validation
    const userValResult = authValSchema.validate(req.body, {
      abortEarly: false
    })
    if (userValResult.error) {
      // return res.send('error')
      const joiErrors = await joiErrorFormat(userValResult.error)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Errors'
        },
        errors: joiErrors,
        formData: req.body
      }
      console.log(req.session.flashData)
      return res.redirect('/register')
    } else {
      const user = await createUser(req.body)
      req.session.flashData = {
        message: {
          type: 'success',
          body: 'Registrated successfully'
        }
      }
      return res.redirect('/register')
    }
  } catch (e) {
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Something went wrong'
      },
      errors: mongooseErrorFormat(e),
      formData: req.body
    }
    return res.redirect('/register')
  }
})

router.get('/login', guestMiddleware, (req, res) => {
  return res.render('login', {
    formData: req.body
  })
})

router.post('/login', guestMiddleware, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {
  return res.render('login', {
    message: {
      type: 'success',
      body: 'Login Successfully'
    }
  })
})

/*
  logout
*/
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
