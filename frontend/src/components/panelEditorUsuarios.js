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
        backgroundColor: "rgba(0, 0, 0, 0.3)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "1rem",
          padding: "1.2rem", 

        }}
      >

        <div
          style={{
            backgroundColor: "#fff",
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
              color: "#000",
            }}
          >
            ✖
          </button>


          <input
            style={{
              width: "100%",
              marginBottom: "1rem",
              border: "none",
              borderBottom: "2px solid #ddd",
              outline: "none",
              fontSize: "1.125rem",
              fontWeight: "500",
              padding: "0.5rem 0",
              boxSizing: "border-box",
            }}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
          />


          <textarea
            style={{
              width: "100%",
              border: "none",
              borderBottom: "2px solid #ddd",
              outline: "none",
              fontSize: "1rem",
              color: "#555",
              resize: "none",
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
