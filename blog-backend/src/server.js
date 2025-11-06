// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // <-- IMPORTANTE: Verifique se esta linha existe
const connectDB = require('./config/db');

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados
connectDB(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Dizendo explicitamente: "Eu só autorizo o frontend na porta 3000"
}));

app.use(express.json()); // Middleware para o body parser


// Mensagem de boas-vindas
app.get('/', (req, res) => {
  res.send('API do Blog N1 está rodando!');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});