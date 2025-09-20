import React from 'react';

const DashboardPage = () => {
  return (
    <div style={styles.container}>
      {/* Fondo desenfocado */}
      <div style={styles.background}></div>

      {/* Capa de contenido con texto */}
      <div style={styles.overlay}>
        <h1 style={styles.text}>NECESITAS PERMISOS PARA ACCEDER AL MATERIAL</h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: "'Merriweather', serif",
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/media/dashboardsPage/bg.jpg")', // 🔁 Cambia esta ruta según tu imagen
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(12px) brightness(0.6)', // ✨ desenfoque + oscurecer
    zIndex: 1,
  },
  overlay: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    backdropFilter: 'blur(2px)',
  },
  text: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0,0,0,0.7)',
    textTransform: 'uppercase',
  },
};

export default DashboardPage;
