const flashMiddleware = (req, res, next) => {
  // if (req.method === 'GET') {
  if (req.session.flashData) {
    for (const key in req.session.flashData) {
      res.locals[key] = req.session.flashData[key]
    }
    console.log(req.session.flashData)
    req.session.flashData = null
  }
  // }
  next()
}

module.exports = flashMiddleware
