// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Criar o Contexto
const AuthContext = createContext();

// 2. Criar o Provedor (Componente que vai envolver o App)
export const AuthProvider = ({ children }) => {
  // O useState (Requisito) para guardar as informações do usuário
  const [userInfo, setUserInfo] = useState(null);
  
  // Um estado de 'loading' para sabermos se já verificamos o localStorage
  const [loading, setLoading] = useState(true);

  // O useEffect (Requisito) para rodar UMA VEZ quando o app carregar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        // Se encontramos um usuário no localStorage, colocamos no estado
        setUserInfo(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar dados do usuário:", error);
      // Limpa dados corrompidos
      localStorage.removeItem('userInfo');
    }
    // Independente de encontrar ou não, terminamos de carregar
    setLoading(false);
  }, []); // O array vazio [] garante que isso rode só uma vez

  // Função que as páginas de Login/Cadastro irão chamar
  const login = (userData) => {
    // 1. Salva no localStorage (para persistir)
    localStorage.setItem('userInfo', JSON.stringify(userData));
    // 2. Salva no estado (para atualizar o app em tempo real)
    setUserInfo(userData);
  };

  // Função que o Header/etc irá chamar
  const logout = () => {
    // 1. Remove do localStorage
    localStorage.removeItem('userInfo');
    // 2. Remove do estado
    setUserInfo(null);
  };

  // 3. O 'value' é o que será disponibilizado para todo o app
  const value = {
    userInfo, // O objeto do usuário (ou null)
    login,
    logout,
    isAuthenticated: !!userInfo, // Um boolean (true/false) fácil de checar
    loading, // Para o app saber se já checamos o auth
  };

  // 4. Retornamos o Provedor com o 'value'
  // Só renderizamos os 'children' (o resto do app) se NÃO estivermos carregando
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 5. Hook customizado (Boa prática)
// Isso facilita para outros componentes usarem o contexto
// Em vez de importar 'useContext' e 'AuthContext', eles só importam 'useAuth'
export const useAuth = () => {
  return useContext(AuthContext);
};