import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ROL_ADMIN = 1;

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

const Navbar = ({ loggedInUser, onLogout }) => {
  const location = useLocation();

  const baseLinks = [
    { label: "NOSOTROS", path: "/historia" },
    { label: "DASHBOARDS", path: "/dashboards" },
    { label: "REVISTA", path: "/revistaPage" },
    { label: "INICIO", path: "/" },
    { label: "EMPRESAS", path: "/empresas" },
    { label: "CONTACTO", path: "/contacto" },
  ];

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
      padding: "1rem 0",
      backgroundColor: "rgb(243, 235, 231)",
      borderBottom: "1px solid #e5e7eb",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
      flexWrap: "wrap",
    },
    link: (isInicio, isActive) => ({
      fontFamily: "Century Gothic",
      fontSize: "1.146rem",
      letterSpacing: "0.1em",
      fontWeight: "300",
      position: "relative",
      textDecoration: "none",
      paddingBottom: "4px",
      cursor: "pointer",
      userSelect: "none",
      display: "inline-block",
    }),
    separator: {
      color: "#ccc",
      fontWeight: "100",
      userSelect: "none",
    },
    userInfo: {
      marginLeft: "2rem",
      fontFamily: "Century Gothic",
      fontSize: "1rem",
      color: "#1f2937",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    logoutButton: {
      backgroundColor: "#b91c1c",
      border: "none",
      color: "white",
      padding: "0.3rem 0.8rem",
      borderRadius: "4px",
      fontWeight: "600",
      cursor: "pointer",
      fontFamily: "Century Gothic",
      fontSize: "0.9rem",
      userSelect: "none",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <motion.nav
      style={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {finalLinks.map((item, index) => {
        const isActive = location.pathname === item.path;
        const isInicio = item.label === "INICIO";

        return (
          <React.Fragment key={index}>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link to={item.path} style={styles.link(isInicio, isActive)}>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    style={{
                      height: 2,
                      backgroundColor: "#010C16",
                      borderRadius: 4,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                )}
              </Link>
            </motion.div>

            {index < finalLinks.length - 1 && (
              <motion.span
                style={styles.separator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                |
              </motion.span>
            )}
          </React.Fragment>
        );
      })}

      {loggedInUser && (
        <div style={styles.userInfo}>
          <span>
            {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
          </span>
          <button
            style={styles.logoutButton}
            onClick={onLogout}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7f1212")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
