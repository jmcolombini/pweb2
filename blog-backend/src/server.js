// src/server.js
const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors'); // <-- 1. COMENTE OU REMOVA A IMPORTAÇÃO DO 'cors'
const connectDB = require('./config/db');

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados
connectDB(); 

const app = express();

// --- INÍCIO DA CORREÇÃO "FORÇA BRUTA" ---
// REMOVA a linha 'app.use(cors())'
// E ADICIONE este middleware no lugar:

app.use((req, res, next) => {
  // Diz ao navegador que o frontend na porta 3000 TEM PERMISSÃO
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
  // Diz quais MÉTODOS (verbs) o frontend pode usar
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Diz quais CABEÇALHOS (headers) o frontend pode enviar
  // (Importante para incluir 'Authorization' para o nosso token JWT)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // O navegador envia uma 'preflight request' (OPTIONS) antes do POST.
  // Se for uma requisição OPTIONS, nós só respondemos "OK" e encerramos.
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // ou res.sendStatus(204)
  }

  // Se não for OPTIONS, passa para a próxima rota (ex: /api/auth/register)
  next();
});

app.use(express.json()); 


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