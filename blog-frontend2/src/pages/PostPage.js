// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook (Requisito)
import styled from 'styled-components';
import api from '../services/api';
import CommentForm from '../components/CommentForm'; // O formulário que criamos

// --- Estilização ---
const PostContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const PostTitle = styled.h1`
  font-size: 2.8rem;
  color: #222;
  margin-bottom: 15px;
`;

const PostMeta = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 30px;
`;

// Estilo para o conteúdo do post
const PostContent = styled.div`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;
  /* (Preserva quebras de linha e espaços) */
  white-space: pre-wrap; 
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  padding: 40px;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
  border-top: 2px solid #eee;
  padding-top: 30px;
`;

const CommentsTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const CommentItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
`;

const CommentText = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
`;

const CommentMeta = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin-top: 10px;
`;
// --- Fim da Estilização ---

const PostPage = () => {
  // Hooks (Requisitos)
  // 1. useParams para pegar o ':id' da URL
  const { id: postId } = useParams(); // Renomeia 'id' para 'postId'
  
  // 2. useState para guardar os dados do post e comentários
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  // 3. useState para loading e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 4. useEffect para buscar os dados (Requisito)
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Comunicação com API (Requisito)
        // 1. Buscar o post individual
        const postRes = await api.get(`/posts/${postId}`);
        setPost(postRes.data);

        // 2. Buscar os comentários daquele post
        const commentsRes = await api.get(`/comments/${postId}`);
        setComments(commentsRes.data);

      } catch (err) {
        // Tratamento de Erros (Requisito)
        console.error('Erro ao buscar dados do post:', err);
        setError('Falha ao carregar o post. Verifique o link ou tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]); // O array [postId] garante que isso rode de novo se o ID na URL mudar

  // Função que o CommentForm vai chamar
  const handleCommentAdded = (newComment) => {
    // Adiciona o novo comentário no final da lista
    setComments([...comments, newComment]);
  };
  
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString('pt-BR');
  };

  // Renderização condicional
  if (loading) {
    return <LoadingMessage>Carregando post...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!post) {
    return <LoadingMessage>Post não encontrado.</LoadingMessage>;
  }

  return (
    <PostContainer>
      {/* 1. O Post Completo */}
      <PostTitle>{post.title}</PostTitle>
      <PostMeta>
        Por: {post.author ? post.author.username : 'Desconhecido'}
        {' em '} {formatDate(post.createdAt)}
      </PostMeta>
      <PostContent>
        {post.content}
      </PostContent>

      {/* 2. A Seção de Comentários */}
      <CommentsSection>
        <CommentsTitle>Comentários ({comments.length})</CommentsTitle>
        
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment._id}>
              <CommentText>{comment.text}</CommentText>
              <CommentMeta>
                {/* Opcional: Adicionar "Por: Autor" se o backend suportar */}
                Em: {formatDate(comment.createdAt)}
              </CommentMeta>
            </CommentItem>
          ))
        ) : (
          <p>Seja o primeiro a comentar!</p>
        )}

        {/* 3. O Formulário de Comentário (Requisito) */}
        {/* Passagem de props (postId) para o filho (Requisito) */}
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </CommentsSection>
    </PostContainer>
  );
};

export default PostPage;