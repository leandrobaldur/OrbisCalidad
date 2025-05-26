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

  const styles = {
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2.5rem 0.5rem 2.5rem",
      backgroundColor: "#f3efe8",
      position: "relative",
      zIndex: 50,
    },
    iconImg: {
      height: "4.5vh",
      width: "4.5vh",
      cursor: "pointer",
      objectFit: "contain",
      userSelect: "none",
      opacity: 0.8,
    },
    logoSmall: {
      height: "40px",
      objectFit: "contain",
      opacity: 0.7,
      cursor: "default",
    },
    centerContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      userSelect: "none",
    },
    title: {
      fontFamily: "'Trajan Pro', serif",
      fontSize: "clamp(20px, 4vw, 60px)",
      color: "black",
      whiteSpace: "nowrap",
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
        <img
          src="/media/header/translate.png"
          alt="Icono Diálogo"
          style={styles.iconImg}
          draggable={false}
        />

        <div style={styles.centerContainer}>
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            style={styles.logoSmall}
            draggable={false}
          />
          <h1 style={styles.title}>LEGADO BOLIVIANO</h1>
          <img
            src="/media/header/logo.png"
            alt="Logo Bicentenario"
            style={styles.logoSmall}
            draggable={false}
          />
        </div>

        <img
          src="/media/header/login.png"
          alt={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
          style={styles.iconImg}
          onClick={loggedInUser ? handleUserClick : handleLoginClick}
          draggable={false}
          title={loggedInUser ? "Panel de administrador" : "Iniciar sesión"}
        />

        {loggedInUser && menuOpen && (
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
              style={{ ...styles.dropdownItem, color: "red", borderBottom: "none" }}
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

      {showLogin && (
        <InicioSesion onLogin={(user) => {
          onLogout(); // Limpia antes por seguridad si hubiera sesión previa
          onLogin(user);
          setShowLogin(false);
        }} onClose={handleCloseLogin} />
      )}
    </>
  );
};

export default Header;
