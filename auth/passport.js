const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/* passport.use(

  new LocalStrategy( async(email, password, done) => {
    try {
      const user = await User.findOne({email: email})
      if(!user) {
        return done(null, false, {message: 'User not found'})
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          return done(null, user)
        }
        else {
          return done(null, false, {message: 'Incorrect password'})
        }
      })
    } catch (error) {
      done(error)
    }
  })
) */


passport.use(new LocalStrategy({
  usernameField: 'email', // Field name for the email in the login form
  passwordField: 'password', // Field name for the password in the login form
}, async(email, password, done) => {
  try {
    const user = await User.findOne({email: email})
    if(!user) {
      return done(null, false, {message: 'User not found'})
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if(res) {
        return done(null, user)
      }
      else {
        return done(null, false, {message: 'Incorrect password'})
      }
    })
  } catch (error) {
    done(error)
  }
}));


passport.serializeUser( function(user, done) {
  done(null, user.id)
})


passport.deserializeUser( async(id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})


module.exports = passport