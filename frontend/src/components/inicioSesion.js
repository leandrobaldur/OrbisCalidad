import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Colores base, ahora con VERDE agregado
const PALETTE = {
  CLEMENTINA: "#FF4201",
  SKYNE: "#199ECA",
  IVRAE: "#F6EEE3",
  NEGRO: "#000000",
  VERDE: "#166D3B",
  WHITE: "#FFFFFF",
  INPUT_BORDER: "#D0D0D0",
  SHADOW_CONTOUR_COLOR: "rgba(0, 0, 0, 0.4)",
};

const ICON_SVG_SIZE = "40px";
const ICON_CONTAINER_PADDING = "10px";

// SVG de persona
const UserIcon = ({ color, size = ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
  </svg>
);

const InicioSesion = ({ onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Animations variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };
  const modalVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
    exit: { y: -50, opacity: 0, transition: { duration: 0.3 } },
  };
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { delay: 0.4, type: "spring", stiffness: 150 } },
    exit: { scale: 0, transition: { duration: 0.2 } },
  };
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: `0 0 0 2px ${PALETTE.CLEMENTINA}`, transition: { duration: 0.3 } },
  };
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "12px 15px",
    fontSize: "18px",
    border: `1px solid ${PALETTE.INPUT_BORDER}`,
    borderRadius: "8px",
    backgroundColor: PALETTE.WHITE,
    boxSizing: "border-box",
    marginBottom: "18px",
    textAlign: "center",
    color: PALETTE.NEGRO,
    fontFamily: "'Caveat', cursive",
  };
  const iconContainerStyle = {
    position: "absolute",
    top: "-30px",
    left: "44%",
    transform: "translateX(-50%)",
    backgroundColor: PALETTE.IVRAE,
    borderRadius: "50%",
    padding: ICON_CONTAINER_PADDING,
    boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  };

  const modalStyle = {
    position: "relative",
    backgroundColor: PALETTE.IVRAE,
    borderRadius: "27px",
    width: "470px",
    padding: "45px 30px 30px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: `0 0 0 10px ${PALETTE.SHADOW_CONTOUR_COLOR}`,
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Una vez termine la animación de salida, llamamos a onClose
        onClose();
      }}
    >
      {isVisible && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={modalStyle}
          >
            {/* Icono centrado */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={iconContainerStyle}
            >
              <UserIcon color={PALETTE.NEGRO} />
            </motion.div>

            {/* Botón cerrar */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2 }}
              style={{
                position: "absolute",
                top: "8px",
                right: "20px",
                background: "none",
                border: "none",
                fontSize: "45px",
                cursor: "pointer",
                color: PALETTE.NEGRO,
                lineHeight: 1,
                padding: 0,
              }}
            >
              &times;
            </motion.button>

            {/* Título */}
            <h2
              style={{
                margin: "15px 0",
                fontSize: "18px",
                fontWeight: 600,
                color: PALETTE.NEGRO,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Inicio de Sesión
            </h2>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <motion.input
                type="text"
                placeholder="USUARIO"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                style={inputBaseStyle}
              />
              <motion.input
                type="password"
                placeholder="CONTRASEÑA"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                style={inputBaseStyle}
              />
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "15px",
                  fontWeight: 500,
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: PALETTE.VERDE,
                  color: PALETTE.WHITE,
                  cursor: loading ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  opacity: loading ? 0.75 : 1,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {loading ? "Iniciando..." : "ENVIAR"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default InicioSesion;