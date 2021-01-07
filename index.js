const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const authRoutes = require('./routes/authRoute')
const mongooseConnection = require('./utils/db.config')
const authMiddleware = require('./middlewares/authMiddleware')
require('./utils/authStrategies/localStrategy')
require('dotenv').config()

const app = express()

app.locals.message = {}
app.locals.errors = {}
app.locals.formData = {}

app.set('view engine', 'ejs')
app.use(session({
  secret: 'shh',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // true works for https only
  store: new MongoStore({ mongooseConnection: mongooseConnection })
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', authRoutes)

app.get('/', (req, res) => {
  // console.log('user:', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  console.log(req.user)
  res.send('welcome')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`)
})

module.exports = app
