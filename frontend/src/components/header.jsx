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
      <header className="w-full fixed top-0 h-20 flex justify-between items-center px-4 md:px-10 bg-background z-40">
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
          {/* AJUSTE MINIMALISTA: Se reduce el tamaño y se añade espaciado para un look más limpio */}
          <h1 className="font-bodoni text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary whitespace-nowrap tracking-widest">
            ORBIS EMPRESARIAL
          </h1>
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            className="h-8 md:h-10 object-contain opacity-70 cursor-default hidden sm:block flex-shrink-0"
            draggable={false}
          />
        </div>

        {/* Derecha: Icono Login y datos de usuario */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.img
            src="/media/header/login.png"
            alt="Iniciar sesión"
            className="h-10 w-10 cursor-pointer object-contain opacity-80 select-none"
            onClick={handleLoginClick}
            draggable={false}
            title="Iniciar sesión"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />

          {loggedInUser && (
            <>
              <motion.span
                className="font-miles text-base text-text-main select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
              </motion.span>
              
              <motion.button
                onClick={onLogout}
                className="bg-accent hover:bg-opacity-80 border-none text-primary px-3 py-1.5 rounded-md cursor-pointer font-bodoni text-sm transition-colors duration-300 whitespace-nowrap"
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

