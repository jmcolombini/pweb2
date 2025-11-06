// src/components/PostItem.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Para navegar para o post individual

// --- Estilização ---
const PostCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 25px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const PostTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.5rem;
  
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #007bff;
    }
  }
`;

const PostMeta = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 15px;
`;

const PostExcerpt = styled.p`
  color: #555;
  line-height: 1.7;
  /* Limita o texto do conteúdo */
  overflow: hidden;
  text-overflow: ellipsis;
  /* (Mostra as primeiras 3 linhas) */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
`;
// --- Fim da Estilização ---

// O componente recebe 'post' como prop (Requisito)
const PostItem = ({ post }) => {

  // Função para formatar a data (opcional, mas bom para UX)
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <PostCard>
      <PostTitle>
        {/* Link para a página de Post Individual (Requisito) */}
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </PostTitle>
      
      <PostMeta>
        {/* Usamos 'post.author.username' pois o backend está 'populando' */}
        Por: {post.author ? post.author.username : 'Usuário desconhecido'} 
        {' em '} {formatDate(post.createdAt)}
      </PostMeta>

      <PostExcerpt>
        {post.content}
      </PostExcerpt>
    </PostCard>
  );
};

export default PostItem;