import React, { useState } from "react";

const estilosInicioSesion = {
  contenedor: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#eef2f5",
  },
  formulario: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  titulo: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  grupo: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  etiqueta: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  boton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

const InicioSesion = ({ onLogin }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      setError("Por favor, rellena todos los campos");
      return;
    }
    setError("");
    if (onLogin) {
      onLogin({ correo, contrasena });
    } else {
      console.log({ correo, contrasena });
    }
  };

  return (
    <div style={estilosInicioSesion.contenedor}>
      <form style={estilosInicioSesion.formulario} onSubmit={handleSubmit}>
        <h2 style={estilosInicioSesion.titulo}>Inicio de Sesión</h2>
        {error && <p style={estilosInicioSesion.error}>{error}</p>}
        <div style={estilosInicioSesion.grupo}>
          <label style={estilosInicioSesion.etiqueta} htmlFor="correo">
            Correo Electrónico:
          </label>
          <input
            style={estilosInicioSesion.input}
            type="email"
            id="correo"
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div style={estilosInicioSesion.grupo}>
          <label style={estilosInicioSesion.etiqueta} htmlFor="contrasena">
            Contraseña:
          </label>
          <input
            style={estilosInicioSesion.input}
            type="password"
            id="contrasena"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit" style={estilosInicioSesion.boton}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default InicioSesion;
