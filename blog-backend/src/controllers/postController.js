// src/controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @desc    Listar todos os posts (com paginação)
 * @route   GET /api/posts
 * @access  Público
 */
const getAllPosts = async (req, res) => {
  // Lógica de paginação
  const limit = 10; // Posts por página
  const page = Number(req.query.page) || 1; // Página atual

  try {
    const count = await Post.countDocuments(); // Total de posts
    const posts = await Post.find()
      .populate('author', 'username') // 'Popula' o autor, trazendo apenas o username
      .sort({ createdAt: -1 }) // Mais recentes primeiro
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({
      posts,
      page,
      pages: Math.ceil(count / limit), // Número total de páginas
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Obter um post específico por ID
 * @route   GET /api/posts/:id
 * @access  Público
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');
      // Opcional: Popular comentários aqui também, se desejar
      // .populate('comments'); 

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post não encontrado.' });
    }
  } catch (error) {
    // Se o ID for mal formatado (ex: curto demais), o Mongoose dá erro
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post não encontrado (ID inválido).' });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Criar um novo post
 * @route   POST /api/posts
 * @access  Privado (requer token)
 */
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Validação básica
    if (!title || !content) {
      return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }

    const post = new Post({
      title,
      content,
      author: req.user._id, // O ID do usuário vem do middleware 'protect'
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};