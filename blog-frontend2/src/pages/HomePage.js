// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import PostItem from '../components/PostItem';
import { useAuth } from '../context/AuthContext'; // 1. Importar o useAuth
import Modal from '../components/Modal';
import CreatePostForm from '../components/CreatePostForm';

// --- (Mantenha toda a sua estilização aqui) ---
const HomePageContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
`;
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #222;
`;
const CreatePostButton = styled.button`
  background: #28a745;
  color: #fff;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  
  &:hover {
    background: #218838;
  }
`;
const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
`;
const ErrorMessage = styled.p`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
`;
// --- Fim da Estilização ---

const HomePage = () => {
  // Hooks (Requisitos)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- INÍCIO DA CORREÇÃO ---
  // 4. Chamamos o useAuth() AQUI, no nível superior
  const { isAuthenticated, userInfo } = useAuth(); 
  // --- FIM DA CORREÇÃO ---

  // 5. Função para buscar posts
  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const { data } = await api.get('/posts');
      setPosts(data.posts); 
      
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
      setError('Falha ao carregar os posts. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  };

  // 6. useEffect para buscar dados (Requisito)
  useEffect(() => {
    fetchPosts();
  }, []); // O array vazio [] garante que rode só uma vez

  // 7. Função que o 'CreatePostForm' vai chamar
  const handlePostCreated = (newPost) => {
    // --- INÍCIO DA CORREÇÃO ---
    // Removemos a chamada do 'useAuth()' daqui
    
    // Apenas USAMOS a variável 'userInfo' que pegamos lá em cima
    const authorUsername = userInfo ? userInfo.username : 'Você';
    const postComAutor = { ...newPost, author: { username: authorUsername } };
    
    setPosts([postComAutor, ...posts]);
    // --- FIM DA CORREÇÃO ---
  };

  // 8. Lógica de renderização
  const renderContent = () => {
    if (loading) {
      return <LoadingMessage>Carregando posts...</LoadingMessage>;
    }
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    if (posts.length === 0) {
      return <LoadingMessage>Nenhum post encontrado. Seja o primeiro a criar!</LoadingMessage>;
    }
    return posts.map((post) => (
      <PostItem key={post._id} post={post} />
    ));
  };

  return (
    <>
      <HomePageContainer>
        <PageHeader>
          <PageTitle>Últimos Posts</PageTitle>
          {/* Botão só aparece se o usuário estiver logado */}
          {isAuthenticated && (
            <CreatePostButton onClick={() => setIsModalOpen(true)}>
              Criar Novo Post
            </CreatePostButton>
          )}
        </PageHeader>
        {renderContent()}
      </HomePageContainer>

      {/* Renderiza o Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePostForm
          onClose={() => setIsModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
      </Modal>
    </>
  );
};

export default HomePage;