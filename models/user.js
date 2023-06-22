const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    minLength: 3,
    unique: true,
    lowercase: true,
    required: [true, 'Enter a valid email']
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, 'Password is required']
  }
})

module.exports = mongoose.model('User', userSchema)