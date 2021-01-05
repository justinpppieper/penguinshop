const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('User Authenticated')
    next()
  } else {
    console.log('Unknow user')
    res.redirect('/login')
  }
}

module.exports = authMiddleware
