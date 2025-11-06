// src/components/Layout.js
import React from 'react';
import Header from './Header'; // Importa o Header que acabamos de criar

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {/* 'children' representa a página atual */}
        {children}
      </main>
    </>
  );
};

export default Layout;