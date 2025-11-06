// src/components/CommentForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

// --- Estilização ---
const FormContainer = styled.form`
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h4`
  margin-bottom: 15px;
  font-size: 1.25rem;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;
// --- Fim da Estilização ---

// O formulário recebe o ID do post (para saber onde postar)
// E uma função 'onCommentAdded' para avisar a PostPage que um novo comentário foi criado
const CommentForm = ({ postId, onCommentAdded }) => {
  // Hooks (Requisitos)
  // 1. useState para o texto do comentário
  const [text, setText] = useState('');
  
  // 2. useState para erros e loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validação básica no cliente (Requisito)
    if (!text.trim()) {
      setError('O comentário não pode estar vazio.');
      return;
    }

    setLoading(true);

    try {
      // Comunicação com API (Requisito)
      // Chama o endpoint POST /api/comments
      const { data } = await api.post('/comments', {
        text,
        postId, // Envia o ID do post
      });

      // Sucesso!
      onCommentAdded(data); // Passa o novo comentário para o 'pai' (PostPage)
      setText(''); // Limpa o formulário

    } catch (err) {
      // Tratamento de Erros (Requisito)
      console.error('Erro ao criar comentário:', err);
      setError('Falha ao enviar o comentário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Deixe um Comentário</FormTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <textarea
        placeholder="Escreva seu comentário aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Comentário'}
      </button>
    </FormContainer>
  );
};

export default CommentForm;