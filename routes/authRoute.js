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
          body: 'joi Validation Errors'
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
        body: 'MongoDB Validation Errors'
      },
      errors: mongooseErrorFormat(e),
      formData: req.body
    }
    return res.redirect('/register')
  }
})

router.get('/login', guestMiddleware, flashMiddleware, (req, res) => {
  return res.render('login')
})

/*
  custom callback of passportjs
  (err, user, info) matches done(arg1, arg2, arg3) in localStrategy
  err: null/e
  user: user object -> true/false
  info: message
*/
router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error: ' + err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'There is an error...'
        }
      }
      return res.redirect('/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.message
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login failed'
          }
        }
      }
      console.log(user)
      return res.redirect('/homepage')
    })
  })(req, res, next)
})

/*
  logout
*/
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
