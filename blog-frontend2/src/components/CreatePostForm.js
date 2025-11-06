// src/components/CreatePostForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

// --- Estilização ---
const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 5px;
`;
// --- Fim da Estilização ---

const CreatePostForm = ({ onClose, onPostCreated }) => {
  // Hooks de state para o formulário (Requisito)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validação básica no cliente (Requisito)
    if (!title || !content) {
      setError('Título e Conteúdo são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      // Comunicação com API (Requisito)
      // Chama o endpoint POST /api/posts (que é protegido pelo token)
      const { data } = await api.post('/posts', { title, content });

      // Sucesso!
      setLoading(false);
      onPostCreated(data); // Avisa o 'pai' (HomePage) que o post foi criado
      onClose(); // Fecha o modal

    } catch (err) {
      // Tratamento de Erros (Requisito)
      console.error('Erro ao criar post:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Falha ao criar o post. Tente novamente.');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>Criar Novo Post</FormTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="title">Título</Label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="content">Conteúdo</Label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
      </FormGroup>

      <button type="submit" disabled={loading}>
        {loading ? 'Publicando...' : 'Publicar Post'}
      </button>
    </form>
  );
};

export default CreatePostForm;