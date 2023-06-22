const bcrypt = require('bcryptjs')
const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')
const passport = require('passport')

//get home page
exports.index = async(req, res, next) => {
  res.render('index', { user: req.user})
}

//get sign-up page
exports.get_signup = async(req, res, next) => {
  res.render('sign-up', { user: new User(), errors: null })
}

//post sign-up page
exports.post_signup = [
  //validate and sanitize input field
  body('name', 'Name is required').trim().isLength({min: 3}).escape(),
  body('email', 'Invalid Email')
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage('Invalid Email address')
  .custom( async (value) => {
    const user = await User.findOne({email: value})
    if(user) {
      throw new Error('Email is already in use')
    }
  }).withMessage('Email is already in use, login instead'),
  body('password', 'Password is required')
  .trim()
  .isLength({min: 8})
  .withMessage('password must be at least 8 characters long')
  .matches(/\d/).withMessage('password must contain at least one digit')
  .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter'),
  //confirm passwordwith custom validation function
  body('confirm-password').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match')
    }
    return true;
  }),

  async (req, res, next) => {
    const errors = validationResult(req)

    const user = new User({
      name: req.body.name,
      email: req.body.email,
    })

    if(!errors.isEmpty()) {
      res.render('sign-up', { user: user, errors: errors.mapped() })
      return;
    }
    try {
      const { name, email, password } = req.body;

      //hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      //create and save the user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      })

      //save the user
      await user.save()
      res.redirect('/')
    }
    catch(err) {
      console.log(err);
      next(err)
    }
  }
]

//get login page
exports.get_login = async(req, res, next) => {
  res.render('log-in')
}


//post login form
exports.post_login = passport.authenticate('local', {
  successRedirect: ('/'),
  failureRedirect: ('/log-in')
})