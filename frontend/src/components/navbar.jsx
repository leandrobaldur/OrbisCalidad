import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { label: "CONTACTO", path: "/contacto" },
    { label: "DASHBOARDS", path: "/dashboards" },
    { label: "INICIO", path: "/" },
    { label: "EMPRESAS", path: "/empresas" },
    { label: "NOSOTROS", path: "/historia" },

  ];

  const styles = {
    navbar: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.5rem",
      padding: "1rem 0",
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
    },
    link: (isInicio) => ({
      fontSize: "0.875rem",
      letterSpacing: "0.1em",
      fontWeight: isInicio ? "600" : "300",
      color: "#1f2937",
      textDecoration: "none",
    }),
  };

  return (
    <nav style={styles.navbar}>
      {links.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          style={styles.link(item.label === "INICIO")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
