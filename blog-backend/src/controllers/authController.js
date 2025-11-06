// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Função auxiliar para gerar o token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expira em 30 dias
  });
};

/**
 * @desc    Registrar (criar) um novo usuário
 * @route   POST /api/auth/register
 * @access  Público
 */
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Validação básica (poderia ser movida para um middleware de validação)
    if (!username || !password) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    // 2. Verificar se o usuário já existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Este nome de usuário já está em uso.' });
    }

    // 3. Criar o usuário (a senha será criptografada pelo hook 'pre-save' no Model)
    const user = await User.create({
      username,
      password,
    });

    // 4. Se o usuário foi criado, retorna os dados e o token
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Dados de usuário inválidos.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

/**
 * @desc    Autenticar (login) um usuário
 * @route   POST /api/auth/login
 * @access  Público
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Encontrar o usuário pelo username
    const user = await User.findOne({ username });

    // 2. Se o usuário existir E a senha bater (usando o método do Model)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};