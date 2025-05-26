import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- fácilmente AJUSTABLES ---
const USER_ICON_ACTUAL_SIZE = "50px"; 
const USER_ICON_CONTAINER_PADDING_VALUE = 13; 
const TITLE_FONT_SIZE = "27px"; 
const SMALL_ICON_SVG_SIZE = "20px"; 
// --- FIN DE AJUSTABLES ---

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
const ICON_CONTAINER_PADDING = `${USER_ICON_CONTAINER_PADDING_VALUE}px`;


const UserIcon = ({ color, size = USER_ICON_ACTUAL_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
  </svg>
);

const EyeIconShow = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeIconHide = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75C21.27 7.61 17 4.5 12 4.5c-1.6 0-3.14.35-4.54.96l1.56 1.56C9.74 7.13 10.85 7 12 7zm-1.07 5.53l2.81 2.81c-.71.15-1.44.26-2.19.26-2.76 0-5-2.24-5-5 0-.75.11-1.48.26-2.19l2.81 2.81c.11.7.42 1.34.81 1.81zM2.71 3.27L1.44 4.54l2.02 2.02C2.03 7.95 1.16 9.77 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.53 1.53 1.27-1.27L2.71 3.27z" />
  </svg>
);

const InicioSesion = ({ onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: `0 0 0 2px ${PALETTE.CLEMENTINA}`,
      transition: { duration: 0.3 },
    },
  };
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!usuario || !contrasenia) {
      setMensaje("Por favor, rellena todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasenia }),
      });
      const data = await res.json();

      if (res.ok && data.encontrado === 1) {
        setMensaje("Iniciaste sesión correctamente");
        onLogin(data.usuario);
        setTimeout(() => {
          setIsVisible(false);
        }, 1500);
      } else {
        setMensaje(data.mensaje || "Credenciales incorrectas");
      }
    } catch {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const onExitComplete = () => {
    if (onClose) onClose();
  }

  const inputBaseStyle = {
    width: "100%",
    // MODIFICADO: Ajuste de padding para centrar verticalmente el placeholder con la fuente 'Caveat'
    padding: "13px 15px 11px 15px", // (top:13, right:15, bottom:11, left:15) - Pruebe esto primero
    // Si todavía se ve un poco alto, puede probar "14px 15px 10px 15px"
    fontSize: "18px",
    border: `1px solid ${PALETTE.INPUT_BORDER}`,
    borderRadius: "8px",
    backgroundColor: PALETTE.WHITE,
    textAlign: "center",
    color: PALETTE.NEGRO,
    fontFamily: "'Caveat', cursive",
    boxSizing: "border-box",
    lineHeight: "18px", 
  };

  const passwordInputStyle = {
    ...inputBaseStyle,
    paddingRight: "45px", 
    marginBottom: 0, 
  };
  
  const iconContainerDiameter = parseInt(USER_ICON_ACTUAL_SIZE.replace('px','')) + 2 * USER_ICON_CONTAINER_PADDING_VALUE;

  const iconContainerStyle = {
    position: "absolute",
    top: `-${iconContainerDiameter / 2}px`, 
    left: "44%", 
    transform: "translateX(-50%)",
    backgroundColor: PALETTE.IVRAE,
    borderRadius: "50%",
    padding: ICON_CONTAINER_PADDING,
    boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle = {
    position: "relative",
    backgroundColor: PALETTE.IVRAE,
    borderRadius: "27px",
    width: "500px",
    padding: "45px 30px 30px", 
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif", 
    boxShadow: `0 0 0 10px ${PALETTE.SHADOW_CONTOUR_COLOR}`,
  };

  const mensajeStyle = {
    marginBottom: "15px", 
    fontWeight: "bold",
    color: mensaje === "Iniciaste sesión correctamente" ? PALETTE.VERDE : PALETTE.CLEMENTINA,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "15px",
    minHeight: "22px", 
  };

  const passwordInputContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "18px",
  };

  const passwordToggleButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "15px", 
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PALETTE.NEGRO,
    lineHeight: 1, 
  };


  return (
    <AnimatePresence onExitComplete={onExitComplete}>
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
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={iconContainerStyle}
            >
              <UserIcon color={PALETTE.NEGRO} size={USER_ICON_ACTUAL_SIZE} />
            </motion.div>

            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2 }}
              style={{
                position: "absolute",
                top: "10px", 
                right: "15px", 
                background: "none",
                border: "none",
                fontSize: "35px", 
                cursor: "pointer",
                color: PALETTE.NEGRO,
                lineHeight: 1,
                padding: "5px", 
              }}
            >
              &times;
            </motion.button>

            <h2
              style={{
                marginTop: `${iconContainerDiameter / 2 - 10}px`, 
                marginBottom: "20px", 
                fontSize: TITLE_FONT_SIZE,
                fontWeight: 600, 
                color: PALETTE.NEGRO,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "'Caveat', cursive", 
              }}
            >
              Inicio de Sesión
            </h2>

            {mensaje && <p style={mensajeStyle}>{mensaje}</p>}

            <form onSubmit={handleSubmit}>
              <motion.input
                type="text"
                placeholder="USUARIO"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                style={{...inputBaseStyle, marginBottom: "18px"}} 
              />
              <div style={passwordInputContainerStyle}>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  placeholder="CONTRASEÑA"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  variants={inputVariants}
                  whileFocus="focus"
                  style={passwordInputStyle}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={passwordToggleButtonStyle}
                  whileHover={{ opacity: 0.6 }} 
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? 
                    <EyeIconHide color={PALETTE.NEGRO} size={SMALL_ICON_SVG_SIZE} /> : 
                    <EyeIconShow color={PALETTE.NEGRO} size={SMALL_ICON_SVG_SIZE} />}
                </motion.button>
              </div>
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
                  backgroundColor: "rgba(22, 109, 59, 0.75)",
                  color: PALETTE.WHITE,
                  cursor: loading ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  opacity: loading ? 0.75 : 1,
                  fontFamily: "'Poppins', sans-serif",
                  marginTop: "10px", 
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