// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // O token vem no cabeçalho 'Authorization' e começa com 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extrair o token (ex: "Bearer <token>" -> "<token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar o token e o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Buscar o usuário pelo ID do token e anexá-lo ao 'req'
      // Isso torna 'req.user' disponível em todas as rotas protegidas
      req.user = await User.findById(decoded.id).select('-password'); // remove a senha

      next(); // Passa para o próximo middleware ou controller
    } catch (error) {
      console.error('Erro na autenticação:', error);
      res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, token não encontrado.' });
  }
};

module.exports = { protect };