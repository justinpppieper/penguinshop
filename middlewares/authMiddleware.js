const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('user Authenticated')
    next()
  } else res.redirect('/login')
}

module.exports = authMiddleware
