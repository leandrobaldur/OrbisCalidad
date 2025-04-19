
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
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
