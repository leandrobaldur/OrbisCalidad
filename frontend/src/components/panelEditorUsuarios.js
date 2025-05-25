import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'; // Importa motion y AnimatePresence

// Variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "beforeChildren", // Anima el contenedor antes que sus hijos
      staggerChildren: 0.1, // Retraso entre la animación de los hijos
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Variantes de animación para los elementos internos
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PanelEditorUsuarios = () => {
  const [usuario, setUsuario] = useState("Usuario");
  const [datos, setDatos] = useState("datos...");
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(51, 51, 51, 0.6)", // Fondo oscuro translúcido con Gris Oscuro
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit" // Aplica la variante de salida cuando 'visible' es falso
        >
          <motion.div
            style={{
              backgroundColor: "#D4B86A", // Dorado/Camel para el "borde" exterior del modal
              borderRadius: "1rem",
              padding: "0.8rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.2)",
            }}
            variants={itemVariants} // Anima el contenedor intermedio
          >
            <motion.div
              style={{
                backgroundColor: "#F6F0E0", // Fondo principal del modal con Beige/Crema
                padding: "1.25rem",
                borderRadius: "0.75rem",
                width: "90vw",
                maxWidth: "500px",
                fontFamily: "sans-serif",
                position: "relative",
                boxSizing: "border-box",
              }}
              variants={itemVariants} // Anima el contenido principal del modal
            >
              <motion.button
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
                  color: "#1D4C7F", // Color del botón de cerrar con Azul Oscuro
                  transition: "color 0.2s ease-in-out",
                }}
                whileHover={{ scale: 1.1, color: "#1A7B5F" }} // Hover con Verde Oscuro y escala
                whileTap={{ scale: 0.9 }}
                variants={itemVariants} // Anima el botón de cerrar
              >
                ✖
              </motion.button>

              <motion.input
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                  border: "none",
                  borderBottom: "2px solid #D4B86A", // Borde inferior del input con Dorado/Camel
                  outline: "none",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  padding: "0.5rem 0",
                  boxSizing: "border-box",
                  color: "#333333", // Color del texto con Gris Oscuro
                }}
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
                variants={itemVariants} // Anima el input de usuario
              />

              <motion.textarea
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "2px solid #D4B86A", // Borde inferior del textarea con Dorado/Camel
                  outline: "none",
                  fontSize: "1rem",
                  color: "#333333", // Color del texto con Gris Oscuro
                  resize: "vertical",
                  padding: "0.5rem 0",
                  minHeight: "5rem",
                  boxSizing: "border-box",
                }}
                value={datos}
                onChange={(e) => setDatos(e.target.value)}
                placeholder="datos..."
                variants={itemVariants} // Anima el textarea
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PanelEditorUsuarios;