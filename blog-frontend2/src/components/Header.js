import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const Nav = styled.nav`
  background: var(--color-surface); /* Fundo branco */
  padding: 1.5rem 2.5rem; /* Mais espaçamento */
  /* Sombra mais suave */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
`;

const NavLogo = styled(Link)`
  font-size: 2rem; /* Maior */
  font-family: var(--font-title); /* Fonte de Título */
  font-weight: 700;
  color: var(--color-text-primary); /* Cor de texto primária */
  text-decoration: none;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  color: var(--color-text-secondary); /* Cinza mais sutil */
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary); /* Cor primária no hover */
  }
`;

const LogoutButton = styled.button`
  /* Resetando o botão global para algo mais sutil */
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  font-family: var(--font-body);

  &:hover {
    color: var(--color-primary);
    transform: none; /* Remove o efeito de subir */
  }
`;

const UserInfo = styled.span`
  color: var(--color-text-primary);
  font-weight: 600;
`;

const Header = () => {
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <NavLogo to="/">Where2Eat</NavLogo>
      <NavMenu>
        <NavItem>
          <NavLink to="/">Ver Avaliações</NavLink>
        </NavItem>
        
        {isAuthenticated ? (
          <>
            <NavItem>
              <UserInfo>Olá, {userInfo.username}</UserInfo>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
            </NavItem>
          </>
        ) : (
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