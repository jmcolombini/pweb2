const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: [true, 'O nome do restaurante é obrigatório'],
    trim: true,
  },
  
  reviewText: {
    type: String,
    required: [true, 'A avaliação é obrigatória'],
  },

  rating: {
    type: Number,
    required: [true, 'A nota é obrigatória'],
    min: 1,
    max: 5,
  },

  imageUrl: {
    type: String,
    trim: true,
    required: [true, 'A URL da foto é obrigatória'],
  },

  dish: {
    type: String,
    trim: true,
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