// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './context/AuthContext'; // 1. Importe o Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Envolva o <App /> com o <AuthProvider /> */}
    <AuthProvider>
      <GlobalStyles />
      <App />
    </AuthProvider>
  </React.StrictMode>
);