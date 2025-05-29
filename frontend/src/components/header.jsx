import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InicioSesion from "./inicioSesion";

const Header = ({ loggedInUser, onLogout, onLogin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
  const handleUserClick = () => setMenuOpen((prev) => !prev);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <>
      <header
        className="w-full fixed top-0 h-20 flex justify-between items-center px-4 md:px-10 bg-[#f3efe8] z-40"
      >
        {/* Izquierda: Imagen "bolivia.png" con altura ajustada */}
        <div className="flex-1 text-left flex items-center"> {/* Centrado vertical de la imagen */}
          <img
            src="/media/header/bolivia.png"
            alt="Logo Bicentenario Bolivia"
            className="h-12 md:h-14 object-contain select-none cursor-pointer"
            draggable={false}
            onClick={() => navigate('/')}
          />
        </div>

        {/* Centro: Logos y Título "LEGADO BOLIVIANO" */}
        <div className="flex items-center gap-2 sm:gap-4 select-none">
          {/* Primer Logo Bicentenario (siempre visible) */}
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            className="h-8 md:h-10 object-contain opacity-70 cursor-default flex-shrink-0"
            draggable={false}
          />
          {/* Título Principal */}
          <h1
            className="font-['Trajan_Pro'] text-xl sm:text-3xl md:text-4xl lg:text-5xl text-black whitespace-nowrap"
          >
            LEGADO BOLIVIANO
          </h1>
          {/* Segundo Logo Bicentenario (oculto en móviles pequeños, visible en sm y superiores) */}
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            className="h-8 md:h-10 object-contain opacity-70 cursor-default hidden sm:block flex-shrink-0"
            draggable={false}
          />
        </div>

        {/* Derecha: Icono de Login/Usuario */}
        <div className="flex-1 flex justify-end items-center"> {/* Centrado vertical del icono */}
          <img
            src="/media/header/login.png"
            alt={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
            className="h-[4.5vh] w-[4.5vh] cursor-pointer object-contain opacity-80 select-none"
            onClick={loggedInUser ? handleUserClick : handleLoginClick}
            draggable={false}
            title={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
          />
        </div>

        {/* Menú Dropdown del Usuario */}
        {loggedInUser && menuOpen && (
          <div
            className="absolute top-full right-4 md:right-10 bg-white border border-gray-200 rounded-lg shadow-lg z-[99] min-w-[180px] md:min-w-[200px] py-1"
          >
            <div
              className="px-4 py-2 text-left cursor-pointer bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              onClick={() => {
                navigate("/editor-empresas");
                setMenuOpen(false);
              }}
            >
              Admin.Empresas
            </div>
            <div
              className="px-4 py-2 text-left cursor-pointer bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
              onClick={() => {
                navigate("/editor-usuarios");
                setMenuOpen(false);
              }}
            >
              Admin.Usuarios
            </div>
            <div
              className="px-4 py-2 text-left cursor-pointer bg-white text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 rounded-b-lg"
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
            >
              Cerrar Sesión
            </div>
          </div>
        )}
      </header>

      {/* Modal de Inicio de Sesión */}
      {showLogin && (
        <InicioSesion onLogin={(user) => {
          onLogout();
          onLogin(user);
          setShowLogin(false);
        }} onClose={handleCloseLogin} />
      )}
    </>
  );
};

export default Header;