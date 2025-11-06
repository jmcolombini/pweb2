// src/components/Modal.js
import React from 'react';
import styled from 'styled-components';

// --- Estilização ---
const ModalOverlay = styled.div`
  position: fixed; /* Fica por cima de tudo */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Fundo escuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px; /* Largura máxima do pop-up */
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
  
  &:hover {
    color: #000;
  }
`;
// --- Fim da Estilização ---

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Se não estiver aberto, não renderiza nada
  }

  // Função para fechar o modal ao clicar no Overlay (o fundo)
  const handleOverlayClick = (e) => {
    // Só fecha se o clique foi no 'ModalOverlay' e não no 'ModalContent'
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <ModalOverlay id="modal-overlay" onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children} {/* Aqui é onde o formulário será injetado */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;