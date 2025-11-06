// src/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPostById);

module.exports = router;