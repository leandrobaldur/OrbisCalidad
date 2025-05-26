import React from 'react';
import { Link } from 'react-router-dom';

// Suponemos id_rol: 1 es Administrador
const ROL_ADMIN = 1;

// Mapeo de IDs de rol a nombres legibles (esto lo definimos aquí o lo pasamos como prop si viene del backend)
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

// El Navbar ahora recibe la información del usuario logeado
const Navbar = ({ loggedInUser, onLogout }) => { // <--- Recibe loggedInUser y onLogout
  const baseLinks = [
    { label: "NOSOTROS", path: "/historia" },
    { label: "DASHBOARDS", path: "/dashboards" },
    { label: "INICIO", path: "/" },
    { label: "EMPRESAS", path: "/empresas" },
    { label: "CONTACTO", path: "/contacto" },
  ];

  // Si el usuario es administrador, añadir el enlace al Panel de Usuarios
  let finalLinks = [...baseLinks];
  if (loggedInUser && loggedInUser.id_rol === ROL_ADMIN) {
    finalLinks.push({ label: "ADMIN USUARIOS", path: "/panel-usuarios" });
  }

  const styles = {
    navbar: {
      width: "100%",
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2rem",
      padding: "01rem 0",
      backgroundColor: "rgb(243, 235, 231)",
      borderBottom: "1px solid #e5e7eb",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
    },
    link: (isInicio) => ({
      font: "Century Gothic",
      fontSize: "1.146rem",
      letterSpacing: "0.1em",
      fontWeight: isInicio ? "600" : "300",
      color: "#1f2937",
      textDecoration: "none",
    }),
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginLeft: "2rem", // Espacio a la izquierda de los enlaces
      color: "#333",
      fontSize: "0.95rem",
    },
    logoutButton: {
      padding: '6px 12px',
      backgroundColor: '#FF4201',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginLeft: '1rem',
    }
  };

  return (
    <nav style={styles.navbar}>
      {finalLinks.map((item, index) => (
        <React.Fragment key={index}>
          <Link
            to={item.path}
            style={styles.link(item.label === "INICIO")}
          >
            {item.label}
          </Link>
          {index < finalLinks.length - 1 && (
            <span style={{ color: "#ccc", fontWeight: "100" }}>|</span>
          )}
        </React.Fragment>
      ))}

      {/* Mostrar información del usuario y botón de cerrar sesión si está logeado */}
      {loggedInUser && (
        <div style={styles.userInfo}>
          <span>
            {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
          </span>
          <button style={styles.logoutButton} onClick={onLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;