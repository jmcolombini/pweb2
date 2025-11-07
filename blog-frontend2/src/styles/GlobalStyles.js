import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* 1. Importando as Fontes do Google */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');

  /* 2. Definindo nossa Nova Paleta de Cores ("CSS Variables") */
  :root {
    --font-title: 'Playfair Display', serif; /* Fonte elegante para títulos */
    --font-body: 'Poppins', sans-serif;       /* Fonte limpa para o corpo */
    
    --color-background: #FDFCFB; /* Um branco "quente", levemente creme */
    --color-surface: #FFFFFF;    /* Branco puro para os cards */
    --color-primary: #B98B73;     /* Um "dourado" ou "bronze" sofisticado */
    --color-primary-hover: #A47B65;
    --color-text-primary: #1A1A1A; /* Quase preto, mas mais suave */
    --color-text-secondary: #666666;
    --color-border: #EEEEEE;
    --color-rating: #D4AF37;     /* Um dourado mais "brilhante" para as estrelas */
  }

  /* 3. Reset de CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 4. Estilos Globais do Body */
  body {
    font-family: var(--font-body); /* Aplicando a fonte do corpo */
    background-color: var(--color-background); /* Aplicando a cor de fundo */
    color: var(--color-text-primary);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 5. Estilos de Títulos */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-title); /* Aplicando a fonte de título */
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: var(--color-primary-hover);
    }
  }

  /* 6. Estilos de Formulário (Atualizados) */
  input[type='text'],
  input[type='password'],
  input[type='email'],
  textarea,
  select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    font-size: 1rem;
    font-family: var(--font-body);
    background: #FCFCFC;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px rgba(185, 139, 115, 0.25); /* Sombra de foco na cor primária */
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }

  /* 7. Estilo de Botão (Atualizado) */
  button {
    display: inline-block;
    background: var(--color-primary); /* Cor primária */
    color: #fff;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-family: var(--font-body);
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background: var(--color-primary-hover); /* Cor de hover */
      transform: translateY(-2px); /* Efeito sutil ao passar o mouse */
    }

    &:disabled {
      background: #c0c0c0;
      cursor: not-allowed;
      transform: none;
    }
  }
`;

export default GlobalStyles;