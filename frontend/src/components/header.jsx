import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InicioSesion from "./inicioSesion";

const Header = ({ loggedInUser, onLogout, onLogin }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
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
        <div
          className="flex-1 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
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

        {/* Derecha: Icono Login siempre visible, y usuario + logout si está logueado */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.img
            src="/media/header/login.png"
            alt="Iniciar sesión"
            className="h-[4.5vh] w-[4.5vh] cursor-pointer object-contain opacity-80 select-none"
            onClick={handleLoginClick}
            draggable={false}
            title="Iniciar sesión"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />

          {loggedInUser && (
            <>
              <motion.span
                className="font-['Century Gothic'] text-base text-gray-700 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
              </motion.span>
              <motion.button
                onClick={onLogout}
                className="bg-red-700 hover:bg-red-800 border-none text-white px-3 py-1.5 rounded-md font-semibold cursor-pointer font-['Century Gothic'] text-sm transition-colors duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Cerrar sesión"
              >
                Cerrar Sesión
              </motion.button>
            </>
          )}
        </div>
      </header>

      {/* Modal Login */}
      {showLogin && (
        <InicioSesion
          onLogin={(user) => {
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

