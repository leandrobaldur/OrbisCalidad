import React, { useState } from "react";

// Ícono de persona (SVG) más grande y sin fondo
const UserIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: "60px", height: "60px", fill: "#333" }}>
    <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
  </svg>
);

const InicioSesion = ({ onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario || !contrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }
    if (onLogin) {
      onLogin({ usuario, contrasena });
    } else {
      console.log({ usuario, contrasena });
    }
  };

  // Contenedor oscuro con más padding vertical para mayor espacio arriba/abajo
  const estilosFondoOscuro = {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    maxWidth: "700px",
    margin: "40px auto",
    padding: "80px 50px", // Aumentamos el alto extra
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    fontFamily: "'Merriweather', serif",
  };

  // Recuadro de login (beige)
  const estilosRecuadro = {
    position: "relative",
    backgroundColor: "rgba(245,230,210,0.95)", // Tono beige
    borderRadius: "15px",
    width: "400px",
    padding: "40px 20px 20px 20px",
    textAlign: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  };

  // Ícono de persona: la parte inferior del ícono justo toca la parte superior del recuadro
  const estilosIcono = {
    position: "absolute",
    bottom: "100%",         // Hace que la base del icono coincida con la parte superior del recuadro
    left: "50%",
    transform: "translateX(-50%)",
  };

  // Botón "X" para cerrar, parte superior derecha
  const estilosCerrar = {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#333",
  };

  // Título en mayúsculas
  const estilosTitulo = {
    marginTop: "30px",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  };

  // Inputs más cortos (70% de ancho)
  const estilosInput = {
    width: "70%",
    margin: "10px auto",
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #bbb",
    borderRadius: "8px",
    outline: "none",
    textAlign: "center",
    backgroundColor: "#fff",
  };

  // Botón Enviar sin bordes
  const estilosBoton = {
    margin: "20px auto 0 auto",
    padding: "8px 20px",
    fontSize: "15px",
    border: "none", // Sin bordes
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#333",
    cursor: "pointer",
    display: "block",
  };

  return (
    <div style={estilosFondoOscuro}>
      <div style={estilosRecuadro}>
        <button style={estilosCerrar} onClick={onClose}>
          X
        </button>
        <div style={estilosIcono}>
          <UserIcon />
        </div>
        <h2 style={estilosTitulo}>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            style={estilosInput}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            style={estilosInput}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button type="submit" style={estilosBoton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
