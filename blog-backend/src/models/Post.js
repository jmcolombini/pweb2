const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'O texto (conteúdo) é obrigatório'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment', 
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);