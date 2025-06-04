import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InicioSesion from "./inicioSesion";

const Header = ({ loggedInUser, onLogout, onLogin }) => {
  const navigate = useNavigate();
  // Quitamos menuOpen y setMenuOpen
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
  // Quitamos handleUserClick porque no lo usaremos más
  const handleCloseLogin = () => setShowLogin(false);

  const getRoleName = (id_rol) => {
    switch (id_rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Colaborador";
      default:
        return "Usuario";
    }
  };

  return (
    <>
      <header className="w-full fixed top-0 h-20 flex justify-between items-center px-4 md:px-10 bg-[#f3efe8] z-40">
        {/* Izquierda: Logo Bolivia */}
        <div className="flex-1 flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/media/header/bolivia.png"
            alt="Logo Bicentenario Bolivia"
            className="h-12 md:h-14 object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Centro: Logos y Título */}
        <div className="flex items-center gap-2 sm:gap-4 select-none">
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            className="h-8 md:h-10 object-contain opacity-70 cursor-default flex-shrink-0"
            draggable={false}
          />
          <h1 className="font-['Trajan_Pro'] text-xl sm:text-3xl md:text-4xl lg:text-5xl text-black whitespace-nowrap">
            LEGADO BOLIVIANO
          </h1>
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            className="h-8 md:h-10 object-contain opacity-70 cursor-default hidden sm:block flex-shrink-0"
            draggable={false}
          />
        </div>

        {/* Derecha: Icono Login / Usuario */}
        <div className="flex-1 flex justify-end items-center">
          <img
            src="/media/header/login.png"
            alt={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
            className="h-[4.5vh] w-[4.5vh] cursor-pointer object-contain opacity-80 select-none"
            onClick={loggedInUser ? undefined : handleLoginClick} // No abrir menú, solo abrir modal si no está logueado
            draggable={false}
            title={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
          />
        </div>

        {/* Eliminar menú desplegable: no renderizamos nada aquí */}
      </header>

      {/* Modal Login */}
      {showLogin && (
        <InicioSesion
          onLogin={(user) => {
            onLogout();
            onLogin(user);
            setShowLogin(false);
          }}
          onClose={handleCloseLogin}
        />
      )}
    </>
  );
};

export default Header;
