const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../modules/users/models/user')

passport.use(new LocalStrategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      console.log(user + 'wrong user')
      done(null, false, { message: 'Incorrect username.' })
    } else {
      if (await user.checkPassword(password)) {
        done(null, user)
        console.log(user)
      } else {
        console.log('wrong pwd')
        done(null, false, { message: 'Incorrect password.' })
      }
    }
  } catch (e) {
    done(e)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = User.findById({ _id: id })
    console.log('+++++++' + user)
    done(null, user)
  } catch (e) {
    done(e)
  }
})
