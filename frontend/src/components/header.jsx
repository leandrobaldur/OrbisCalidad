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

  // Función para obtener el nombre del rol
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
      minWidth: "200px",
      padding: "0", // Importante para controlar el espacio interno directamente en los ítems
    },
    dropdownItem: {
      padding: "10px 16px",
      textAlign: "left",
      cursor: "pointer",
      backgroundColor: "white",
      borderBottom: "1px solid #eee",
      color: "#333", // Color de texto predeterminado para ítems
    },
    dropdownItemHover: {
      backgroundColor: '#f5f5f5',
    },
    logoutButton: {
        backgroundColor: "white",
        border: "none", // Eliminar borde para que parezca un ítem más
        color: "red",
        padding: "10px 16px",
        borderRadius: "0 0 8px 8px", // Bordes redondeados solo abajo
        fontWeight: "bold",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        fontSize: "inherit",
        transition: "background-color 0.3s ease",
    }
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
          src="/media/header/login.png" // Este es el ícono que abre el menú
          alt={loggedInUser ? "Panel de usuario" : "Iniciar sesión"}
          style={styles.iconImg}
          onClick={loggedInUser ? handleUserClick : handleLoginClick}
          draggable={false}
          title={loggedInUser ? "Panel de usuario" : "Iniciar sesión"}
        />

        {loggedInUser && menuOpen && (
          <div style={styles.dropdown}>
            {/* Información del usuario y rol */}
            <div
              style={styles.dropdownItem}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.dropdownItem.backgroundColor)}
            >
              {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
            </div>
            {/* Botón de Cerrar Sesión */}
            <button
              style={{...styles.logoutButton, borderBottom: "none"}} // Asegurar que no tenga borde inferior
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fcebeb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </header>

      {showLogin && (
        <InicioSesion
          onLogin={(user) => {
            onLogout(); // Limpia antes por seguridad si hubiera sesión previa
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