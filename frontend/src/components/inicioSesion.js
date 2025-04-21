import React, { useState } from "react";

// SVG de persona
const UserIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: "60px", height: "60px", fill: "#333" }}>
    <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
  </svg>
);

const InicioSesion = ({ onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      alert("Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);

    try {
      await onLogin({ usuario, contrasena });
    } catch (error) {
      alert("Error al iniciar sesión. Verifica tus datos.");
      console.error("Error en inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", // 👈 flotante encima de todo
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // 👈 siempre encima
        fontFamily: "'Merriweather', serif",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "rgba(247, 247, 247, 0.97)",
          borderRadius: "15px",
          width: "400px",
          padding: "40px 20px 20px 20px",
          textAlign: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        {/* Botón X para cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "2vh",
            right: "2vh",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#333",
          }}
        >
          X
        </button>

        {/* Icono centrado arriba */}
        <div
          style={{
            position: "absolute",
            bottom: "99%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <UserIcon />
        </div>

        {/* Título */}
        <h2
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
          }}
        >
          Inicio de Sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "70%",
              margin: "10px auto",
              padding: "10px",
              fontSize: "15px",
              border: "1px solid #bbb",
              borderRadius: "8px",
              outline: "none",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={{
              width: "70%",
              margin: "10px auto",
              padding: "10px",
              fontSize: "15px",
              border: "1px solid #bbb",
              borderRadius: "8px",
              outline: "none",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              margin: "20px auto 0 auto",
              padding: "8px 20px",
              fontSize: "15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#333",
              cursor: loading ? "not-allowed" : "pointer",
              display: "block",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Iniciando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
