const express = require('express');
const router = express.Router();
const {
  createComment,
  getCommentsByPost,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createComment);

router.route('/:postId')
  .get(getCommentsByPost);

module.exports = router;