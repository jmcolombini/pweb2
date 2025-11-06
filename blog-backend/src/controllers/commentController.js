// src/controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * @desc    Listar comentários de um post específico
 * @route   GET /api/comments/:postId
 * @access  Público
 */
const getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: 1 }); // Mais antigos primeiro (ordem cronológica)

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Criar um novo comentário
 * @route   POST /api/comments
 * @access  Público (ou Privado, se preferir)
 */
const createComment = async (req, res) => {
  const { text, postId } = req.body;

  try {
    // 1. Validação básica
    if (!text || !postId) {
      return res.status(400).json({ message: 'Texto e ID do post são obrigatórios.' });
    }

    // 2. Verificar se o post existe
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    // 3. Criar o comentário
    const comment = new Comment({
      text,
      post: postId,
      // Opcional: Se quisesse proteger a rota de comentários:
      // author: req.user._id 
    });

    const createdComment = await comment.save();

    // 4. (Importante) Adicionar a referência do comentário no array do Post
    postExists.comments.push(createdComment._id);
    await postExists.save();

    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = {
  getCommentsForPost,
  createComment,
};