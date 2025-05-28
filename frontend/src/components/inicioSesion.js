import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Importa tu logo aquí ---
import logo from '../assets/logo.png';// Asegúrate de que la ruta sea correcta

// --- fácilmente AJUSTABLES ---
const USER_ICON_ACTUAL_SIZE = "100px"; // Icono del logo más grande
const TITLE_FONT_SIZE = "40px"; // Título más grande y prominente
const SMALL_ICON_SVG_SIZE = "26px"; // Iconos de ojo un poco más grandes
const LABEL_FONT_SIZE = "19px"; // Etiquetas de input más grandes
const INPUT_FONT_SIZE = "20px"; // Texto dentro del input más grande
const BUTTON_FONT_SIZE = "24px"; // Texto del botón más grande
const MESSAGE_FONT_SIZE = "18px"; // Mensajes grandes

// --- AJUSTES ESPECÍFICOS ---
const MODAL_WIDTH = "530px"; // Ancho del modal reducido (550px - 20px)
const MODAL_PADDING_VERTICAL = "40px"; // Ajuste para reducir la altura (originalmente 50px)
const MODAL_PADDING_HORIZONTAL = "40px"; // Ajuste para reducir el ancho (originalmente 50px)

const CLOSE_BUTTON_FONT_SIZE = "40px"; // Tamaño de la "X" aumentado
// --- FIN DE AJUSTABLES ---

// --- PALETA DE COLORES (sin cambios, ya que se ve bien con la imagen) ---
const PALETTE = {
  BACKGROUND_MODAL: "#F6EEE3", // Beige claro del fondo
  PRIMARY_ACCENT_BLUE: "#2F4F8B", // Azul oscuro fuerte
  SECONDARY_ACCENT_GOLD: "#E1B85D", // Dorado (para foco)
  SUCCESS_GREEN: "#166D3B", // Verde oscuro para mensajes de éxito
  TEXT_DARK: "#25384F", // Un gris azulado oscuro para el texto principal
  TEXT_MUTED: "#78909C", // Gris más suave para detalles
  ERROR_RED: "#E57373", // Rojo estándar para errores
  WHITE: "#FFFFFF",
  CONTOUR_COLOR: "#000000", // Color del contorno negro
  BUTTON_HOVER_BLUE: "#4A6FA8", // Un azul ligeramente más claro para el hover del botón
};

// Componente del ícono de ojo (mostrar contraseña)
const EyeIconShow = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// Componente del ícono de ojo (ocultar contraseña)
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

  // Variantes de animación para inputs
  const inputVariants = {
    focus: {
      scale: 1.01,
      boxShadow: `0 0 0 2px ${PALETTE.SECONDARY_ACCENT_GOLD}`, // Borde dorado más visible al enfocar
      transition: { duration: 0.2 },
    },
  };
  // Variantes de animación para botones
  const buttonVariants = {
    hover: { backgroundColor: PALETTE.BUTTON_HOVER_BLUE, scale: 1.02, transition: { duration: 0.15 } },
    tap: { scale: 0.98 }, // Efecto al presionar
  };

  // Variantes de animación para el fondo
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  // Variantes de animación para el modal
  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };
  // Variantes de animación para el icono superior
  const iconVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 120 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.1 } },
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null); // Limpia mensajes anteriores

    if (!usuario || !contrasenia) {
      setMensaje("Por favor, rellena todos los campos");
      return;
    }

    setLoading(true); // Activa el estado de carga
    try {
      // --- LA LLAMADA FETCH PARA EL LOGIN ESTÁ IMPLEMENTADA AQUÍ MISMO ---
      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasenia }),
      });
      const data = await res.json();

      if (res.ok && data.encontrado === 1) {
        setMensaje("¡Sesión iniciada correctamente!");
        onLogin(data.usuario); // Llama a la función onLogin pasada por props
        setTimeout(() => {
          setIsVisible(false); // Cierra el modal después de un tiempo
        }, 1500);
      } else {
        setMensaje(data.mensaje || "Credenciales incorrectas"); // Muestra mensaje de error
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsVisible(false);
  };

  // Función que se ejecuta cuando la animación de salida termina
  const onExitComplete = () => {
    if (onClose) onClose(); // Llama a la función onClose pasada por props
  }

  // Estilos base para las etiquetas de los inputs
  const labelStyle = {
    fontSize: LABEL_FONT_SIZE,
    color: PALETTE.TEXT_DARK,
    marginBottom: "10px",
    display: "block",
    textAlign: "left",
    fontWeight: 500, // Menos negrita para Playfair Display en etiquetas
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY
  };

  // Estilos base para los inputs de texto
  const inputBaseStyle = {
    width: "100%",
    padding: "16px 18px",
    fontSize: INPUT_FONT_SIZE,
    border: `1px solid ${PALETTE.TEXT_MUTED}`,
    borderRadius: "10px",
    backgroundColor: PALETTE.WHITE,
    color: PALETTE.TEXT_DARK,
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY (para placeholder y texto)
    boxSizing: "border-box",
    marginBottom: "30px",
  };

  // Estilos específicos para el input de contraseña
  const passwordInputStyle = {
    ...inputBaseStyle,
    paddingRight: "60px", // Espacio adicional para el icono del ojo
    marginBottom: "0",
  };

  // Estilos del contenedor del icono de usuario (ahora el logo)
  const iconContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
    // Asegurarse que el logo se ajuste al tamaño definido por USER_ICON_ACTUAL_SIZE
    width: USER_ICON_ACTUAL_SIZE,
    height: USER_ICON_ACTUAL_SIZE,
    margin: '0 auto 40px auto', // Centrar el contenedor del logo
  };

  // Estilos del modal principal
  const modalStyle = {
    backgroundColor: PALETTE.BACKGROUND_MODAL,
    borderRadius: "20px",
    width: MODAL_WIDTH, // ANCHO DEL MODAL REDUCIDO AQUÍ
    padding: `${MODAL_PADDING_VERTICAL} ${MODAL_PADDING_HORIZONTAL}`, // ALTURA DEL MODAL REDUCIDA AQUÍ
    textAlign: "center",
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY
    boxShadow: `0 10px 30px ${PALETTE.CONTOUR_COLOR}40`, // Sombra más grande
    border: `2px solid ${PALETTE.CONTOUR_COLOR}`, // Contorno negro más grueso
    position: "relative",
  };

  // Estilos para los mensajes (éxito/error)
  const mensajeStyle = {
    marginBottom: "30px",
    fontWeight: "bold",
    color: mensaje === "¡Sesión iniciada correctamente!" ? PALETTE.SUCCESS_GREEN : PALETTE.ERROR_RED,
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY
    fontSize: MESSAGE_FONT_SIZE,
    minHeight: "30px", // Asegura un espacio constante para el mensaje
  };

  // Estilos para el contenedor del input de contraseña
  const passwordInputContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "30px",
  };

  // Estilos para el botón de mostrar/ocultar contraseña
  const passwordToggleButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PALETTE.TEXT_MUTED,
    lineHeight: 1,
  };

  // Estilos para el título "Inicio de Sesión"
  const titleStyle = {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 700, // Extra negrita para Playfair Display
    color: PALETTE.TEXT_DARK,
    marginBottom: "45px",
    textTransform: "uppercase", // Mantenemos uppercase para impacto
    letterSpacing: "3px", // Espaciado entre letras para el título (más prominente)
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY
  };

  // Estilos para el botón de cerrar (la "X")
  const closeButtonStyle = {
    position: "absolute",
    top: "18px",
    right: "22px",
    background: "none",
    border: "none",
    fontSize: CLOSE_BUTTON_FONT_SIZE, // ¡TAMAÑO DE LA "X" AUMENTADO AQUÍ!
    cursor: "pointer",
    color: PALETTE.TEXT_MUTED,
    lineHeight: 1,
    padding: "5px",
    outline: "none",
    transition: "transform 0.2s ease-in-out",
  };

  // Estilos para el botón de enviar
  const submitButtonStyle = {
    width: "100%",
    padding: "18px",
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: 700, // Extra negrita para Playfair Display
    border: "none",
    borderRadius: "10px",
    backgroundColor: PALETTE.PRIMARY_ACCENT_BLUE,
    color: PALETTE.WHITE,
    cursor: loading ? "not-allowed" : "pointer",
    textTransform: "uppercase", // Mantenemos uppercase
    opacity: loading ? 0.8 : 1,
    fontFamily: "'Playfair Display', serif", // APLICANDO PLAYFAIR DISPLAY
    marginTop: "25px",
    transition: "background-color 0.15s ease-in-out",
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
            {/* Botón de cerrar (la X) */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2, color: PALETTE.ERROR_RED }}
              style={closeButtonStyle}
            >
              &times;
            </motion.button>

            {/* Contenedor del ícono de usuario (ahora el logo) */}
            <div style={iconContainerStyle}>
              <motion.img
                src={logo} // Usamos tu logo importado aquí
                alt="Logo de la aplicación"
                style={{
                  width: '100%', // El logo ocupará el 100% del contenedor
                  height: '100%', // El logo ocupará el 100% del contenedor
                  objectFit: 'contain', // Asegura que el logo se vea completo
                  display: 'block'
                }}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </div>

            {/* Título del modal */}
            <h2 style={titleStyle}>Inicio de Sesión</h2>

            {/* Mensajes de feedback (éxito/error) */}
            {mensaje && <p style={mensajeStyle}>{mensaje}</p>}

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              {/* Campo de Usuario */}
              <label htmlFor="usuario" style={labelStyle}>
                Usuario
              </label>
              <motion.input
                type="text"
                id="usuario"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                style={inputBaseStyle}
              />

              {/* Campo de Contraseña */}
              <label htmlFor="contrasenia" style={labelStyle}>
                Contraseña
              </label>
              <div style={passwordInputContainerStyle}>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="contrasenia"
                  placeholder="Introduce tu contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  variants={inputVariants}
                  whileFocus="focus"
                  style={passwordInputStyle}
                />
                {/* Botón para mostrar/ocultar contraseña */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={passwordToggleButtonStyle}
                  whileHover={{ opacity: 0.7, scale: 1.1 }}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeIconHide color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                  ) : (
                    <EyeIconShow color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                  )}
                </motion.button>
              </div>

              {/* Botón de Enviar */}
              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={submitButtonStyle}
              >
                {loading ? "Accediendo..." : "ACCEDER"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InicioSesion;