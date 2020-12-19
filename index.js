const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/register', (req, res) => {
  return res.render('register')
})

app.listen('3000', () => {
  console.log('Server is running at port 3000')
})

module.exports = app
