const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')
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
    res.redirect('/user/join-private')
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


exports.get_create_post = (req, res, next) => {
    res.render('create-post', {user: req.user})
}


exports.create_post = async(req, res, next) => {
  try{
    const {title, content} = req.body;
    const author = req.user._id;

    const newPost = new Post({
      title: title,
      content: content,
      author: author
    })

    await newPost.save()
    //await newPost.populate('author').exec();

    res.redirect('/')
  }
  catch(err) {
    next(err)
  }
}


exports.get_admin = (req, res) => {
  res.render('make-admin')
}


exports.post_admin = async(req, res) => {
  const {adminpass} = req.body;

  try {
    if(req.body.adminpass === process.env.ADMIN_PASS) {
      const userID = req.user.id
      const updatedUser = await User.findOneAndUpdate(
        {_id: userID},
        {adminStatus: true},
        {new: true}
      )
      return res.redirect('/')
    }
    res.redirect('/user/make-admin')
  } catch (error) {
    next(error)
  }
}