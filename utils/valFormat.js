const joiErrorFormat = rawErrors => {
  const errors = {}
  const errDetails = rawErrors.details
  errDetails.forEach(e => {
    errors[e.path] = e.message
  })
  return errors
}

const mongooseErrorFormat = rawErrors => {
  const errors = {}
  const errDetails = rawErrors.errors
  for (const key in errDetails) {
    errors[key] = errDetails[key].message
  }
  return errors
}

module.exports = { joiErrorFormat, mongooseErrorFormat }
