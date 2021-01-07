const Joi = require('joi')

const authValSchema = Joi.object({
  username: Joi.string()
    // .min(2)
    .max(64)
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

module.exports = { authValSchema }
