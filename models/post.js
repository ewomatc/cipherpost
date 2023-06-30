const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {type: String, min: 3, required: true},
  content: {type: String, min: 2, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
  },
},
{
  timestamps: true,
}
)

module.exports = mongoose.model('Post', postSchema)