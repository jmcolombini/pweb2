// src/models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'O texto do comentário é obrigatório'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Referência ao modelo 'Post' (FK)
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);