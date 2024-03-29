const Joi = require('joi')

const joiValidation = Joi.object({
  username: Joi.string()
    .min(6)
    .max(30)
    .trim()
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim() // Requires the string value to contain no whitespace before or after. If the validation
    .lowercase(),

  password: Joi.string()
    .required(),
  // .min(8),

  repeat_password: Joi.ref('password')
})
  .with('password', 'repeat_password')

module.exports = { joiValidation }
