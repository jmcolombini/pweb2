import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'; 

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