import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../services/api';

const PostCard = styled.div`
  background: var(--color-surface);
  border-radius: 12px; /* Cantos mais arredondados */
  /* Sombra muito mais sutil */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  min-height: 240px;
  max-height: 280px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }
`;

const PostImageContainer = styled(Link)`
  width: 40%;
  flex-shrink: 0;
  background: #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

const PostContent = styled.div`
  padding: 30px; /* Mais padding */
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 2rem; /* Fonte do título maior */
  font-family: var(--font-title); /* Fonte de título */
  
  a {
    color: var(--color-text-primary);
    text-decoration: none;
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const PostMeta = styled.div`
  font-size: 1rem;
  margin-bottom: 20px; /* Mais espaço */
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Rating = styled.span`
  font-size: 1.1rem;
  color: var(--color-rating); /* Nova cor de estrela */
  font-weight: 700;
`;

const Author = styled.span`
  color: var(--color-text-secondary);
  font-style: italic;
`;

const PostExcerpt = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.7;
  flex-grow: 1;
  font-family: var(--font-body);
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreLink = styled(Link)`
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  margin-top: 15px;
  align-self: flex-start;
`;

const renderRating = (rating) => {
  if (!rating) return '';
  return '⭐'.repeat(rating);
};

const PostItem = ({ post }) => {
  const { 
    _id, 
    restaurantName, 
    reviewText, 
    rating, 
    imageUrl, 
    author 
  } = post;

  const fullImageUrl = imageUrl ? `${SERVER_URL}${imageUrl}` : `https://via.placeholder.com/400x400.png?text=Where2Eat`;

  return (
    <PostCard>
      <PostImageContainer to={`/post/${_id}`}>
        <img src={fullImageUrl} alt={restaurantName} />
      </PostImageContainer>
      
      <PostContent>
        <PostTitle>
          <Link to={`/post/${_id}`}>{restaurantName || 'Restaurante'}</Link>
        </PostTitle>

        <PostMeta>
          <Rating>{renderRating(rating)} ({rating || '?'}/5)</Rating>
          <Author>Por: {author ? author.username : 'Anônimo'}</Author>
        </PostMeta>

        <PostExcerpt>
          {reviewText || 'Nenhuma avaliação fornecida.'}
        </PostExcerpt>

        <ReadMoreLink to={`/post/${_id}`}>
          Ver avaliação completa
        </ReadMoreLink>
      </PostContent>
    </PostCard>
  );
};

export default PostItem;