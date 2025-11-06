// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Nosso hook de autenticação!

// --- Estilização com Styled Components ---
const Nav = styled.nav`
  background: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem; /* Espaçamento entre os itens */
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  color: #555;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

// Botão de Logout estilizado de forma diferente
const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #dc3545;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.span`
  color: #333;
  font-weight: 600;
`;
// --- Fim da Estilização ---

const Header = () => {
  // Hooks que vamos usar (Requisitos do projeto)
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate(); // Hook de navegação

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após sair
  };

  return (
    <Nav>
      <NavLogo to="/">Blog N1</NavLogo>
      <NavMenu>
        <NavItem>
          <NavLink to="/">Todos os Posts</NavLink>
        </NavItem>
        
        {isAuthenticated ? (
          // Links para usuário LOGADO
          <>
            <NavItem>
              {/* Mostra o nome do usuário */}
              <UserInfo>Olá, {userInfo.username}</UserInfo>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </NavItem>
          </>
        ) : (
          // Links para usuário DESLOGADO
          <>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register">Cadastrar</NavLink>
            </NavItem>
          </>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Header;