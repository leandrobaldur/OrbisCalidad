import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InicioSesion from "./inicioSesion";
import axios from "axios";

function Header({ loggedInUser, onLogout, onLogin }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLoginClick = () => setShowLogin(true);

  const handleLoginSuccess = async ({ usuario, contrasena }) => {
    try {
      const res = await axios.post("http://localhost:3000/usuarios/login", {
        usuario,
        contrasenia: contrasena,
      });

      if (res.data && res.data.encontrado === 1) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userInfo", JSON.stringify(res.data.usuario));
        setLoggedIn(true);
        setShowLogin(false);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleCloseLogin = () => setShowLogin(false);

  const handleUserClick = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

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

  const styles = {
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2.5rem",
      backgroundColor: "white",
      position: "relative",
      zIndex: 50,
    },
    icon: {
      color: "black",
      cursor: "pointer",
    },
    logo: {
      height: "64px",
      objectFit: "contain",
    },
    dropdown: {
      position: "absolute",
      top: "80px",
      right: "40px",
      backgroundColor: "white",
      border: "1px solid #e2e2e2",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      zIndex: 99,
    },
    dropdownItem: {
      padding: "10px 16px",
      width: "200px",
      textAlign: "left",
      cursor: "pointer",
      backgroundColor: "white",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <>
  <header className="w-full fixed top-0 h-24 flex justify-between items-center px-4 md:px-10 bg-primary backdrop-blur-sm z-40">
        {/* Izquierda: Logo */}
        <div className="flex-1" />

        {/* Centro: Título limpio */}
        <div
          className="flex items-center justify-center select-none cursor-pointer"
          onClick={() => navigate("/")}
          title="Inicio"
        >
          <img
            src="/media/header/logo.png"
            alt="Logo Orbis Empresarial"
            className="h-16 sm:h-20 md:h-20 lg:h-24 object-contain"
            draggable={false}
          />
        </div>

        {/* Derecha: Icono Login y datos de usuario */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.img
            src="/media/header/login-beige.svg"
            alt="Iniciar sesión"
            className="h-10 w-10 cursor-pointer object-contain select-none"
            onClick={handleLoginClick}
            draggable={false}
            title="Iniciar sesión"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />

          {loggedInUser && (
            <>
              <motion.span
                className="font-sans text-sm text-brand-slate select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
              </motion.span>

              <motion.button
                onClick={onLogout}
                className="bg-brand-dark hover:bg-brand-slate text-white px-4 py-2 rounded-md cursor-pointer font-sans text-sm transition-all duration-200 whitespace-nowrap"
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
}

export default Header;
