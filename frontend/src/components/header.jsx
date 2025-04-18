import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaUserCircle } from "react-icons/fa";
import InicioSesion from "./inicioSesion";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Efecto inicial + escucha cambios de login en localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };

    checkLoginStatus(); // Al montar el componente

    window.addEventListener("storage", checkLoginStatus); // Si otro componente cambia el login
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLoginClick = () => setShowLogin(true);

  const handleLoginSuccess = ({ usuario, contrasena }) => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
    setShowLogin(false);
  };

  const handleCloseLogin = () => setShowLogin(false);

  const handleUserClick = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
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
      <header style={styles.header}>
        <FaComments size={28} style={styles.icon} />
        <img src="/media/header/logo.png" alt="Logo Bicentenario" style={styles.logo} />
        <div>
          <FaUserCircle
            size={30}
            style={styles.icon}
            onClick={loggedIn ? handleUserClick : handleLoginClick}
            title={loggedIn ? "Panel de administrador" : "Iniciar sesión"}
          />
          {loggedIn && menuOpen && (
            <div style={styles.dropdown}>
              <div
                style={styles.dropdownItem}
                onClick={() => {
                  navigate("/editor-empresas");
                  setMenuOpen(false);
                }}
              >
                Admin.Empresas
              </div>
              <div
                style={styles.dropdownItem}
                onClick={() => {
                  navigate("/editor-usuarios");
                  setMenuOpen(false);
                }}
              >
                Admin.Usuarios
              </div>
              <div
                style={{
                  ...styles.dropdownItem,
                  color: "red",
                  borderBottom: "none",
                }}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </div>
            </div>
          )}
        </div>
      </header>

      {showLogin && (
        <InicioSesion onLogin={handleLoginSuccess} onClose={handleCloseLogin} />
      )}
    </>
  );
};

export default Header;
