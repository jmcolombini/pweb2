import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api'; 

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
const RatingSelect = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: #fff;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;

  &::file-selector-button {
    background: #007bff;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background: #0056b3;
    }
  }
`;

const CreatePostForm = ({ onClose, onPostCreated }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('5');
  const [dish, setDish] = useState('');
  
  const [image, setImage] = useState(null); 
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!restaurantName || !reviewText || !rating || !image) {
      setError('Restaurante, Avaliação, Nota e Foto são obrigatórios.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('restaurantName', restaurantName);
    formData.append('reviewText', reviewText);
    formData.append('rating', Number(rating));
    formData.append('dish', dish);
    formData.append('image', image); 

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await api.post('/posts', formData, config);

      setLoading(false);
      onPostCreated(data); 
      onClose(); 

    } catch (err) {
      console.error('Erro ao criar avaliação:', err);
      let msg = 'Falha ao criar a avaliação. Tente novamente.';
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.message.includes('413')) { 
        msg = 'Erro: A imagem é muito grande! Tente uma menor.';
      }
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>Avalie sua Experiência</FormTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="restaurantName">Nome do Restaurante*</Label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </FormGroup>

      {}
      <FormGroup>
        <Label htmlFor="image">Foto (jpg, png)*</Label>
        <FileInput
          type="file"
          id="image"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="rating">Nota (1-5)*</Label>
        <RatingSelect 
          id="rating" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
          <option value="4">⭐⭐⭐⭐ (Bom)</option>
          <option value="3">⭐⭐⭐ (Razoável)</option>
          <option value="2">⭐⭐ (Ruim)</option>
          <option value="1">⭐ (Péssimo)</option>
        </RatingSelect>
      </FormGroup>

       <FormGroup>
        <Label htmlFor="dish">Prato que você comeu (Opcional)</Label>
        <input
          type="text"
          id="dish"
          placeholder="Ex: Peixada Cearense"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="reviewText">Sua Avaliação*</Label>
        <textarea
          id="reviewText"
          placeholder="Descreva sua experiência..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </FormGroup>

      <button type="submit" disabled={loading}>
        {loading ? 'Publicando...' : 'Publicar Avaliação'}
      </button>
    </form>
  );
};

export default CreatePostForm;