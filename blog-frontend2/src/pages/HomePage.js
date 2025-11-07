import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import PostItem from '../components/PostItem';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import CreatePostForm from '../components/CreatePostForm';

const HomePageContainer = styled.div`
  max-width: 960px; /* Um pouco mais largo */
  margin: 40px auto; /* Mais espaço no topo */
  padding: 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px; /* Mais espaço */
`;

const PageTitle = styled.h1`
  font-size: 3rem; /* Título maior */
  font-family: var(--font-title);
  color: var(--color-text-primary);
`;

const CreatePostButton = styled.button`
  /* O botão global já está bonito, mas vamos customizar */
  background: var(--color-primary);
  
  &:hover {
    background: var(--color-primary-hover);
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  padding: 40px;
`;

const ErrorMessage = styled.p`
  color: #D8000C;
  background-color: #FFD2D2;
  border: 1px solid #D8000C;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const HomePage = () => {
  // Hooks
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, userInfo } = useAuth(); 

  const fetchPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await api.get('/posts');
      setPosts(data.posts); 
    } catch (err) {
      console.error("Erro ao buscar posts:", err);
      setError('Falha ao carregar as avaliações. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  const handlePostCreated = (newPost) => {
    const authorUsername = userInfo ? userInfo.username : 'Você';
    const postComAutor = { ...newPost, author: { username: authorUsername } };
    
    setPosts([postComAutor, ...posts]);
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingMessage>Carregando avaliações...</LoadingMessage>;
    }
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    if (posts.length === 0) {
      return <LoadingMessage>Nenhuma avaliação encontrada. Seja o primeiro!</LoadingMessage>;
    }
    return posts.map((post) => (
      <PostItem key={post._id} post={post} />
    ));
  };

  return (
    <>
      {/* Esta é a parte que estava dando erro */}
      <HomePageContainer>
        <PageHeader>
          <PageTitle>Onde Comer em Fortaleza</PageTitle>
          {isAuthenticated && (
            <CreatePostButton onClick={() => setIsModalOpen(true)}>
              Avaliar Experiência
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