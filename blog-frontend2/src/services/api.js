import axios from 'axios';

export const SERVER_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${SERVER_URL}/api`, 
});

api.interceptors.request.use(
  (config) => {
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