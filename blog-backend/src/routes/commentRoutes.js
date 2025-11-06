// src/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCommentsForPost,
  createComment,
} = require('../controllers/commentController');

router.route('/')
  .post(createComment);

router.route('/:postId')
  .get(getCommentsForPost);

module.exports = router; 