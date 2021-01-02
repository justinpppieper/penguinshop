const express = require('express')
const router = express.Router()
const { createUser } = require('../modules/users/services/userService')
const { authValSchema } = require('../validations/authValidation')
const { joiErrorFormat, mongooseErrorFormat } = require('../utils/valFormat')

router.get('/register', (req, res) => {
  return res.render('register', {
    message: {},
    errors: {},
    formData: req.body
  })
})

router.post('/register', async (req, res) => {
  try {
    // joi validation
    // const userValResult = authValSchema.validate(req.body, {
    //   abortEarly: false
    // })
    // if (userValResult.error) {
    //   return res.send('error')
    //   const joiErrors = await joiErrorFormat(userValResult.error)
    //   return res.render('register',
    //     {
    //       message: {
    //         type: 'error',
    //         body: 'Validation Errors'
    //       },
    //       errors: joiErrors,
    //       formData: req.body
    //     })
    // }
    const user = await createUser(req.body)
    return res.render('register',
      {
        message: {
          type: 'success',
          body: 'Registrated successfully'
        },
        errors: {},
        formData: req.body
      })
  } catch (e) {
    console.log(e)
    // return res.status(400).render('register',
    //   {
    //     message: {
    //       type: 'error',
    //       body: 'Something went wrong'
    //     },
    //     errors: mongooseErrorFormat(e),
    //     formData: req.body
    //   })
    return res.send(mongooseErrorFormat(e))
  }
})

module.exports = router
