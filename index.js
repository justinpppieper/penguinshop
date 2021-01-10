const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const authRoutes = require('./routes/authRoute')
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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'shh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // true works for https only
  store: new MongoStore({ mongooseConnection: mongooseConnection })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  next()
})

app.use('/', authRoutes)

app.get('/', (req, res) => {
  return res.render('client/homepage')
})

app.get('/homepage', authMiddleware, (req, res) => {
  // res.send('welcome ' + req.user.username)
  res.render('client/homepage')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`)
})

module.exports = app
