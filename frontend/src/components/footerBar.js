import React from "react";

const estilosFooterBar = {
  contenedor: {
    backgroundColor: "#f8f9fa",
    padding: "20px 0",
    textAlign: "center",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  tutor: {
    fontSize: "14px",
    color: "#555",
    margin: 0,
  },
  enlaces: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    listStyle: "none",
    padding: 0,
  },
  enlace: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "14px",
  },
};

const FooterBar = () => {
  return (
    <footer style={estilosFooterBar.contenedor}>
      <div style={estilosFooterBar.inner}>
        <p style={estilosFooterBar.tutor}>
          Tutorizado por: Alberto Navarro
        </p>
        <ul style={estilosFooterBar.enlaces}>
          <li>
            <a style={estilosFooterBar.enlace} href="/contacto">
              Contacto
            </a>
          </li>
          <li>
            <a style={estilosFooterBar.enlace} href="/acerca-de">
              Acerca de
            </a>
          </li>
          <li>
            <a style={estilosFooterBar.enlace} href="/privacidad">
              Privacidad
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterBar;
