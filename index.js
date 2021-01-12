const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStorage = require('connect-mongo')(session)
const passport = require('passport')
const { authRoute, categoryRoute } = require('./routes')
const mongooseConnection = require('./utils/db.config')
const expressLayouts = require('express-ejs-layouts')
const { authMiddleware } = require('./middlewares')
require('./utils/authStrategies/localStrategy')
require('dotenv').config()

const app = express()

app.locals.message = {}
app.locals.errors = {}
app.locals.formData = {}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', 'layouts/admin/layout')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'shh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // true works for https only
  store: new MongoStorage({ mongooseConnection: mongooseConnection })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  next()
})

app.use('/', authRoute)
app.use('/', categoryRoute)

app.get('/', (req, res) => {
  return res.render('homepage', { layout: 'layouts/client/layout' })
})

app.get('/homepage', authMiddleware, (req, res) => {
  // res.send('welcome ' + req.user.username)
  res.render('homepage', { layout: 'layouts/client/layout' })
})

app.get('/dashboard', authMiddleware, (req, res) => {
  // res.send('welcome ' + req.user.username)
  res.render('dashboard')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`)
})

module.exports = app
