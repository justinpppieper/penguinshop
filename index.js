const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStorage = require('connect-mongo')(session)
const passport = require('passport')
const authRoute = require('./routes/authRoute')
const categoryRoute = require('./routes/categoryRoute')
const apiRoute = require('./routes/apiRoute')
const mongooseConnection = require('./utils/db.config')
const expressLayouts = require('express-ejs-layouts')
const { authMiddleware } = require('./middlewares')
const { trimString } = require('./utils/global')
require('./utils/authStrategies/localStrategy')
require('dotenv').config()

const app = express()

app.locals.message = {}
app.locals.errors = {}
app.locals.formData = {}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', 'master/default/layouts/layout')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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
  trimString(req.body)
  return next()
})

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  return next()
})

app.use('/', authRoute)
app.use('/', categoryRoute)
app.use('/api/v1/category', apiRoute)

app.get('/', (req, res) => {
  return res.render('homepage')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.render('homepage')
})

app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard', { layout: 'master/dashboard/layouts/layout' })
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`)
})

module.exports = app
