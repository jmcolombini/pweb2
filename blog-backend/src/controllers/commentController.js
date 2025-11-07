const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @desc    Criar um novo comentário
 * @route   POST /api/comments
 * @access  Privado (requer token)
 */
const createComment = async (req, res) => {
  const { text, postId } = req.body;

  try {

    if (!text || !postId) {
      return res.status(400).json({ message: 'Texto e ID do Post são obrigatórios.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    const comment = new Comment({
      text,
      author: req.user._id, 
      post: postId,
    });

    const createdComment = await comment.save();

    post.comments.push(createdComment._id);
    await post.save();
    
    res.status(201).json(createdComment);

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post não encontrado (ID inválido).' });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Obter todos os comentários de um post
 * @route   GET /api/comments/:postId
 * @access  Público
 */
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: 1 }); 

    res.json(comments);

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post não encontrado (ID inválido).' });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};