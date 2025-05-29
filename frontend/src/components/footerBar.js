import React from "react";
import { motion } from "framer-motion"; // Importamos motion para animaciones

// --- PALETA DE COLORES (tomada de tus imágenes y modal de login) ---
const PALETTE = {
  BACKGROUND_PRIMARY: "#F6EEE3", // Beige claro del fondo de Legado Boliviano y modal
  PRIMARY_ACCENT_BLUE: "#2F4F8B", // Azul oscuro fuerte (del botón de login)
  SECONDARY_ACCENT_GOLD: "#E1B85D", // Dorado (para foco, del login)
  TEXT_DARK: "#25384F", // Un gris azulado oscuro para el texto principal (del login)
  TEXT_MUTED: "#78909C", // Gris más suave para detalles
  CONTOUR_COLOR: "#000000", // Color del contorno negro (siempre se ve bien para marcos)
};

const FooterBar = () => {
  const estilosFooterBar = {
    contenedor: {
      backgroundColor: PALETTE.BACKGROUND_PRIMARY, // Fondo beige claro
      padding: "25px 0", // Reducimos el padding para hacerlo más compacto (antes 35px)
      textAlign: "center",
      borderTop: `1px solid ${PALETTE.TEXT_MUTED}40`, // Contorno superior más sutil
      boxShadow: `0 -2px 8px rgba(0,0,0,0.08)`, // Sombra más sutil hacia arriba
      fontFamily: "'Playfair Display', serif", // Fuente profesional
      marginTop: "50px", // Espacio para separar el footer del contenido principal
    },
    inner: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px",
    },
    tutor: {
      fontSize: "16px", // Texto más pequeño (antes 18px)
      color: PALETTE.TEXT_DARK, // Color oscuro del texto
      margin: "0 0 10px 0", // Espacio inferior reducido
      fontWeight: 500,
      letterSpacing: "0.3px", // Espaciado entre letras más sutil
    },
    enlaces: {
      marginTop: "8px", // Espacio reducido
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "25px", // Espacio entre enlaces reducido
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    enlace: {
      textDecoration: "none",
      color: PALETTE.PRIMARY_ACCENT_BLUE, // Azul de acento
      fontSize: "15px", // Tamaño de fuente ligeramente más pequeño (antes 17px)
      fontWeight: 600,
      transition: "color 0.3s ease, transform 0.2s ease",
      letterSpacing: "0.3px",
    },
    // Estilos para el hover de los enlaces
    enlaceHover: {
      color: PALETTE.SECONDARY_ACCENT_GOLD, // Dorado al pasar el ratón
      transform: "translateY(-1px)", // Pequeño levantamiento más sutil
    }
  };

  return (
    <footer style={estilosFooterBar.contenedor}>
      <div style={estilosFooterBar.inner}>
        <p style={estilosFooterBar.tutor}>
          Tutorizado por: Alberto Navarro
        </p>
        <ul style={estilosFooterBar.enlaces}>
          <li>
            <motion.a
              style={estilosFooterBar.enlace}
              href="/contacto"
              whileHover={estilosFooterBar.enlaceHover}
              whileTap={{ scale: 0.98 }} // Animación de tap más suave
            >
              Contacto
            </motion.a>
          </li>
          <li>
            <motion.a
              style={estilosFooterBar.enlace}
              href="/acerca-de"
              whileHover={estilosFooterBar.enlaceHover}
              whileTap={{ scale: 0.98 }}
            >
              Acerca de
            </motion.a>
          </li>
          <li>
            <motion.a
              style={estilosFooterBar.enlace}
              href="/privacidad"
              whileHover={estilosFooterBar.enlaceHover}
              whileTap={{ scale: 0.98 }}
            >
              Privacidad
            </motion.a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterBar;