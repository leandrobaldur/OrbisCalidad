import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InicioSesion from "./inicioSesion";
import axios from "axios";

const Header = () => {
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
        {/* Icono diálogo usando imagen */}
        <img
          src="/media/header/translate.png" // ajusta nombre según archivo
          alt="Icono Diálogo"
          style={styles.iconImg}
          draggable={false}
        />

        {/* Centro: logos y título */}
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

        {/* Icono usuario usando imagen */}
        <img
          src="/media/header/login.png" // ajusta nombre según archivo
          alt={loggedIn ? "Panel de administrador" : "Iniciar sesión"}
          style={styles.iconImg}
          onClick={loggedIn ? handleUserClick : handleLoginClick}
          draggable={false}
          title={loggedIn ? "Panel de administrador" : "Iniciar sesión"}
        />

        {/* Menú desplegable */}
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
      </header>

      {showLogin && (
        <InicioSesion onLogin={handleLoginSuccess} onClose={handleCloseLogin} />
      )}
    </>
  );
};

export default Header;
