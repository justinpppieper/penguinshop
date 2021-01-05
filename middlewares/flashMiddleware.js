const flashMiddleware = (req, res, next) => {
  // if (req.method === 'GET') {
  if (req.session.flashData) {
    for (const key in req.session.flashData) {
      res.locals[key] = req.session.flashData[key]
    }
    console.log(res.locals)
    req.session.flashData = null
  }
  // }
  next()
}

module.exports = flashMiddleware
