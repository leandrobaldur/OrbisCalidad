import React from 'react';
import { FaComments, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const styles = {
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2.5rem",
      backgroundColor: "white",
    },
    icon: {
      color: "black",
    },
    logo: {
      height: "64px",
      objectFit: "contain",
    },
  };

  return (
    <header style={styles.header}>
      <FaComments size={28} style={styles.icon} />
      <img src="/media/header/logo.png" alt="Logo Bicentenario" style={styles.logo} />
      <FaUserCircle size={30} style={styles.icon} />
    </header>
  );
};

export default Header;
