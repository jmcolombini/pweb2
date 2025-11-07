// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api'; 
import { useAuth } from '../context/AuthContext'; 

const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
`;

const InfoText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #555;

  a {
    color: #007bff;
    font-weight: 600;
  }
`;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', {
        username,
        password,
      });

      login(data);
      
      navigate('/');

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocorreu um erro. Tente novamente.');
      }
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Criar Conta</FormTitle>
      
      {/* Mostra a mensagem de erro amigável, se houver */}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Nome de Usuário</Label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <InfoText>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </InfoText>
    </FormContainer>
  );
};

export default RegisterPage;