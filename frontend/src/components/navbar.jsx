import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { label: "NOSOTROS", path: "/historia" },
    { label: "DASHBOARDS", path: "/dashboards" }, // ruta futura
    { label: "INICIO", path: "/" },
    { label: "EMPRESAS", path: "/empresas" },
    { label: "CONTACTO", path: "/contacto" },
  ];

  const styles = {
    navbar: {
        width: "100%",
        position: "sticky",      // <-- esto lo hace "pegajoso"
        top: 0,                  // <-- se queda arriba al hacer scroll
        zIndex: 10,              // <-- para que no lo tape nada
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        padding: "01rem 0",
        backgroundColor: "rgb(243, 235, 231)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", // sutil sombra
    },
    link: (isInicio) => ({
      font: "Century Gothic",
      fontSize: "1.146rem",
      letterSpacing: "0.1em",
      fontWeight: isInicio ? "600" : "300",
      color: "#1f2937",
      textDecoration: "none",
    }),
  };

  return (
    <nav style={styles.navbar}>
    {links.map((item, index) => (
        <React.Fragment key={index}>
        <Link
            to={item.path}
            style={styles.link(item.label === "INICIO")}
        >
            {item.label}
        </Link>
        {index < links.length - 1 && (
            <span style={{ color: "#ccc", fontWeight: "100" }}>|</span>
        )}
        </React.Fragment>
    ))}
    </nav>
  );
};

export default Navbar;