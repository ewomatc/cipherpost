const express = require('express')
const User = require('../models/user')
require('dotenv').config()

exports.get_private = (req, res, next) => {
  res.render('join-private')
}

exports.post_private = async(req, res, next) => {
  const {passcode} = req.body;

  try {
    if(req.body.passcode === process.env.CIPHER_KEY) {
      const userID = req.user.id
      const updatedUser = await User.findOneAndUpdate(
        {_id: userID},
        {membershipStatus: true},
        {new: true}
      )
      return res.redirect('/')
    }
    res.redirect('/join-private')
  } catch (error) {
    next(error)
  }
}


exports.get_logout_page = (req, res, next) => {
  res.render('logout-page')
}

exports.get_logout = (req, res, next) => [
  req.logout(err => {
    if(err) {
      return next(err)
    }
    else{
      res.redirect('/')
    }
  })
]