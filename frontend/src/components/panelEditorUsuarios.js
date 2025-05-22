import React, { useState } from "react";

const PanelEditorUsuarios = () => {
  const [usuario, setUsuario] = useState("Usuario");
  const [datos, setDatos] = useState("datos...");
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo oscuro translúcido con Negro
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          backgroundColor: "#199ECA", // Un toque de Skyne para el borde exterior del modal
          borderRadius: "1rem",
          padding: "0.8rem", // Padding reducido para que el Skyne se vea como un borde grueso
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.2)", // Sombra sutil
        }}
      >

        <div
          style={{
            backgroundColor: "#F6EEE3", // Fondo principal del modal con Ivrae
            padding: "1.25rem",
            borderRadius: "0.75rem",
            width: "90vw",
            maxWidth: "500px",
            fontFamily: "sans-serif",
            position: "relative",
            boxSizing: "border-box",
          }}
        >

          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.25rem",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#FF4201", // Color del botón de cerrar con Clementina
              transition: "color 0.2s ease-in-out", // Transición para el hover
            }}
            onMouseEnter={(e) => (e.target.style.color = "#2C00FE")} // Hover con Virel
            onMouseLeave={(e) => (e.target.style.color = "#FF4201")} // Regresar a Clementina
          >
            ✖
          </button>

          <input
            style={{
              width: "100%",
              marginBottom: "1rem",
              border: "none",
              borderBottom: "2px solid #199ECA", // Borde inferior del input con Skyne
              outline: "none",
              fontSize: "1.125rem",
              fontWeight: "500",
              padding: "0.5rem 0",
              boxSizing: "border-box",
              color: "#000000", // Color del texto con Negro
            }}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
          />

          <textarea
            style={{
              width: "100%",
              border: "none",
              borderBottom: "2px solid #199ECA", // Borde inferior del textarea con Skyne
              outline: "none",
              fontSize: "1rem",
              color: "#000000", // Color del texto con Negro
              resize: "vertical", // Permite redimensionar verticalmente
              padding: "0.5rem 0",
              minHeight: "5rem",
              boxSizing: "border-box",
            }}
            value={datos}
            onChange={(e) => setDatos(e.target.value)}
            placeholder="datos..."
          />
        </div>
      </div>
    </div>
  );
};

export default PanelEditorUsuarios;