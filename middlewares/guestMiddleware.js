const guestMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else res.redirect('/homepage')
}

module.exports = guestMiddleware
