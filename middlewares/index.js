const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('User Authenticated')
    next()
  } else {
    console.log('Unknow user')
    res.redirect('/login')
  }
}

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

// if logged in, user could not go to register page
const guestMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else res.redirect('/homepage')
}

module.exports = { authMiddleware, flashMiddleware, guestMiddleware }
