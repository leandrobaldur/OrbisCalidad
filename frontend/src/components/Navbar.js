// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const navLinks = [
  { to: "/historia", label: "HISTORIA" },
  { to: "/presentaciones", label: "PRESENTACIONES" },
  { to: "/", label: "INICIO" },
  { to: "/empresas", label: "EMPRESAS" },
  { to: "/contacto", label: "CONTACTO" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleUserClick = () => {
    setMenuOpen(open => !open);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="relative w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex-1" />

          {/* Enlaces siempre centrados */}
          <ul className="flex items-center space-x-4 text-gray-800 text-sm font-semibold uppercase">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.to}>
                <li>
                  <Link to={link.to} className="text-gray-800 hover:text-gray-600">
                    {link.label}
                  </Link>
                </li>
                {i < navLinks.length - 1 && (
                  <li className="text-gray-400 select-none">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Icono de usuario a la derecha */}
          <div className="flex-1 flex justify-end items-center relative">
            <button
              onClick={loggedIn ? handleUserClick : handleLoginClick}
              className="focus:outline-none p-2"
              title={loggedIn ? "Panel de administrador" : "Iniciar Sesión"}
            >
              <FaUserCircle size={32} className="text-gray-800 hover:text-gray-600" />
            </button>

            {/* Dropdown solo si estás logueado */}
            {loggedIn && menuOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => { navigate("/editor-empresas"); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                >
                  Admin.Empresas
                </button>
                <button
                  onClick={() => { navigate("/editor-usuarios"); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                >
                  Admin.Usuarios
                </button>
                <div className="border-t border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
