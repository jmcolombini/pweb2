// src/controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @desc    Listar todas as avaliações (posts)
 * @route   GET /api/posts
 * @access  Público
 */
const getAllPosts = async (req, res) => {
  const limit = 10;
  const page = Number(req.query.page) || 1;
  try {
    const count = await Post.countDocuments();
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));
    res.json({ posts, page, pages: Math.ceil(count / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Obter uma avaliação (post) por ID
 * @route   GET /api/posts/:id
 * @access  Público
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Avaliação não encontrada.' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Avaliação não encontrada (ID inválido).' });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};


/**
 * @desc    Criar uma nova avaliação (COM UPLOAD)
 * @route   POST /api/posts
 * @access  Privado (requer token)
 */
const createPost = async (req, res) => {
  const { 
    restaurantName, 
    reviewText, 
    rating, 
    dish
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'A foto é obrigatória.' });
  }
  
  const imageUrl = `/${req.file.path.replace(/\\/g, '/')}`; 

  try {
    if (!restaurantName || !reviewText || !rating) {
      return res.status(400).json({ 
        message: 'Restaurante, Avaliação e Nota são obrigatórios.' 
      });
    }

    const post = new Post({
      restaurantName,
      reviewText,
      rating: Number(rating),
      dish,
      imageUrl: imageUrl, 
      author: req.user._id,
    });

    const createdPost = await post.save();
    
    const populatedPost = await Post.findById(createdPost._id).populate('author', 'username');
    res.status(201).json(populatedPost);
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error(error); 
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};