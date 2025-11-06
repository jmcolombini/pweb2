// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe as páginas que criamos (ainda vazias)
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
// (Vamos remover a rota /create por enquanto, já que faremos o Modal)
// import CreatePostPage from './pages/CreatePostPage'; 
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 

// Importe o Layout (ainda vazio)
import Layout from './components/Layout'; 

function App() {
  return (
    <Router>
      {/* O Layout (com o Header) envolve todas as páginas */}
      <Layout>
        <Routes>
          {/* Página "Todos os Posts" (Requisito) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Página "Post Individual" (Requisito) */}
          <Route path="/post/:id" element={<PostPage />} />
          
          {/* Página "Cadastro" (Requisito) */}
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Página de Login (Necessária para autenticação) */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;