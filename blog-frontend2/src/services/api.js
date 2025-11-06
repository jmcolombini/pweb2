// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // A URL base do seu backend
});

// Interceptor para adicionar o token JWT a todas as requisições (se existir)
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage (vamos salvar lá no login)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;