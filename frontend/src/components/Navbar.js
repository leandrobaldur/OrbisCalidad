import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white shadow-md">
      <ul className="flex justify-around items-center h-16 px-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/empresas">Empresas</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/historia">Historia</Link></li>
        <li><Link to="/editor-empresas">Editor Empresas</Link></li>
        <li><Link to="/editor-usuarios">Editor Usuarios</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
