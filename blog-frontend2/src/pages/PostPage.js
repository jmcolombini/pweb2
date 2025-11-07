// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api, { SERVER_URL } from '../services/api'; // Importe o SERVER_URL
import CommentForm from '../components/CommentForm';

// --- Estilização ---
const PostContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden; /* Para a imagem se encaixar */
`;

// Imagem Principal no Topo
const PostImageHeader = styled.div`
  width: 100%;
  height: 400px; /* Altura fixa para a imagem do post */
  background: #eee;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostBody = styled.div`
  padding: 30px 40px;
`;

const PostTitle = styled.h1`
  font-size: 2.8rem;
  color: #222;
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem a linha em telas menores */
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`;

const Rating = styled.span`
  font-size: 1.3rem;
  color: #f39c12;
  font-weight: 700;
`;

const PostContent = styled.div`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;
  white-space: pre-wrap; /* Preserva quebras de linha */
`;

// (Copie aqui seus estilos de Loading/Error/CommentsSection)
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
  padding: 30px 40px;
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
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const postRes = await api.get(`/posts/${postId}`);
        setPost(postRes.data);
        const commentsRes = await api.get(`/comments/${postId}`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Erro ao buscar dados do post:', err);
        setError('Falha ao carregar a avaliação.');
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, [postId]);

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };
  
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString('pt-BR');
  };
  
  const renderRating = (rating) => {
    if (!rating) return '';
    return '⭐'.repeat(rating);
  };

  if (loading) return <LoadingMessage>Carregando avaliação...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!post) return <LoadingMessage>Avaliação não encontrada.</LoadingMessage>;

  // Construir a URL completa da imagem
  const fullImageUrl = post.imageUrl ? `${SERVER_URL}${post.imageUrl}` : 'https://via.placeholder.com/800x400.png?text=Sem+Foto';

  return (
    <PostContainer>
      <PostImageHeader>
        <img src={fullImageUrl} alt={post.restaurantName} />
      </PostImageHeader>

      <PostBody>
        <PostTitle>{post.restaurantName}</PostTitle>
        <PostMeta>
          <Rating>{renderRating(post.rating)} ({post.rating}/5)</Rating>
          <span>Por: {post.author ? post.author.username : 'Desconhecido'}</span>
          <span>Em: {formatDate(post.createdAt)}</span>
        </PostMeta>
        <PostContent>
          {post.reviewText}
        </PostContent>
      </PostBody>

      <CommentsSection>
        <CommentsTitle>Comentários ({comments.length})</CommentsTitle>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment._id}>
              <CommentText>{comment.text}</CommentText>
              <CommentMeta>Em: {formatDate(comment.createdAt)}</CommentMeta>
            </CommentItem>
          ))
        ) : (
          <p>Seja o primeiro a comentar!</p>
        )}
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </CommentsSection>
    </PostContainer>
  );
};

export default PostPage;