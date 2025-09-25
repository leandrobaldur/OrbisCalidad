import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Importa tu logo aquí ---
import logo from '../assets/logo.png';

// --- TAMAÑOS RESPONSIVOS CON PROPORCIONES ÁUREAS (MÁS PEQUEÑOS) ---
const SIZES = {
  LOGO_SIZE: "clamp(60px, 8vw, 90px)", // Reducido de 12vw a 8vw
  TITLE_SIZE: "clamp(1.4rem, 3vw, 1.8rem)", // Reducido de 4vw a 3vw
  LABEL_SIZE: "clamp(0.8rem, 1.6vw, 1rem)", // Reducido de 2vw a 1.6vw
  INPUT_SIZE: "clamp(0.9rem, 1.8vw, 1.1rem)", // Reducido de 2.2vw a 1.8vw
  BUTTON_SIZE: "clamp(1rem, 2vw, 1.2rem)", // Reducido de 2.5vw a 2vw
  MESSAGE_SIZE: "clamp(0.8rem, 1.6vw, 1rem)", // Reducido de 2vw a 1.6vw
  ICON_SIZE: "clamp(16px, 2.4vw, 22px)", // Reducido de 3vw a 2.4vw
  CLOSE_SIZE: "clamp(1.4rem, 3vw, 1.8rem)", // Reducido de 4vw a 3vw
  MODAL_WIDTH: "clamp(280px, 70vw, 400px)", // Reducido de 90vw a 70vw y max de 500px a 400px
  MODAL_PADDING: "clamp(1.2rem, 3vw, 1.8rem)", // Reducido de 4vw a 3vw
};

// --- DATOS ESTÁTICOS DE USUARIOS (CON ROL) ---
const USUARIOS_STATICOS = [
  { usuario: "admin", contrasenia: "admin123", id_rol: 1 },
  { usuario: "user", contrasenia: "password456", id_rol: 2 },
  { usuario: "test", contrasenia: "test789", id_rol: 2 },
];

// Componente del ícono de ojo (mostrar contraseña)
const EyeIconShow = ({ color, size = SIZES.ICON_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// Componente del ícono de ojo (ocultar contraseña)
const EyeIconHide = ({ color, size = SIZES.ICON_SIZE }) => (
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
      boxShadow: "0 0 0 2px #F29E38", // Borde naranja de la paleta
      transition: { duration: 0.2 },
    },
  };
  
  // Variantes de animación para botones
  const buttonVariants = {
    hover: { 
      backgroundColor: "#0A3A5A", 
      scale: 1.02, 
      transition: { duration: 0.15 } 
    },
    tap: { scale: 0.98 },
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
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };
  
  // Variantes de animación para el icono superior
  const iconVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.2, type: "spring", stiffness: 120 } 
    },
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

    //ESTATICOS
    // --- LÓGICA DE LOGIN CON DATOS ESTÁTICOS ---
    setTimeout(() => {
      // Simula una demora de red de 1 a 2 segundos
      const usuarioEncontrado = USUARIOS_STATICOS.find(
        (user) => user.usuario === usuario
      );

      if (usuarioEncontrado && usuarioEncontrado.contrasenia === contrasenia) {
        setMensaje("¡Sesión iniciada correctamente!");
        onLogin(usuarioEncontrado); // Usa el objeto de usuario estático
        setTimeout(() => {
          setIsVisible(false);
        }, 1500);
      } else {
        setMensaje("Credenciales incorrectas");
      }
      setLoading(false);
    }, Math.random() * 1000 + 1000); // Demora aleatoria entre 1 y 2 segundos
  };
    /*try {
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
  };*/

  // Función para cerrar el modal
  const handleClose = () => {
    setIsVisible(false);
  };

  // Función que se ejecuta cuando la animación de salida termina
  const onExitComplete = () => {
    if (onClose) onClose(); // Llama a la función onClose pasada por props
  }

  // Función para obtener el color del mensaje
  const getMessageColor = () => {
    return mensaje === "¡Sesión iniciada correctamente!" ? "text-green-600" : "text-red-500";
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-surface-elevated rounded-2xl text-center shadow-2xl border border-stroke/30 relative overflow-hidden"
            style={{
              width: SIZES.MODAL_WIDTH,
              padding: SIZES.MODAL_PADDING,
            }}
          >
            {/* Botón de cerrar (la X) - completamente sin fondo */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2, color: "#F29E38" }}
              className="absolute top-4 right-5 border-none cursor-pointer text-text-muted p-1 outline-none transition-all duration-200"
              style={{ 
                fontSize: SIZES.CLOSE_SIZE,
                backgroundColor: 'transparent'
              }}
            >
              &times;
            </motion.button>

            {/* Contenedor del logo */}
            <div 
              className="flex justify-center items-center mx-auto"
              style={{
                width: SIZES.LOGO_SIZE,
                height: SIZES.LOGO_SIZE,
                marginBottom: "clamp(1.5rem, 3vw, 2rem)", // Reducido proporcionalmente
              }}
            >
              <motion.img
                src={logo}
                alt="Logo de la aplicación"
                className="w-full h-full object-contain block"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </div>

            {/* Título del modal */}
            <h2 
              className="font-bodoni font-bold text-text-main uppercase tracking-wider"
              style={{
                fontSize: SIZES.TITLE_SIZE,
                letterSpacing: "clamp(0.05rem, 0.2rem, 0.3rem)", // Reducido proporcionalmente
                marginBottom: "clamp(1.5rem, 3vw, 2rem)", // Reducido proporcionalmente
              }}
            >
              Inicio de Sesión
            </h2>

            {/* Mensajes de feedback (éxito/error) */}
            {mensaje && (
              <p 
                className={`font-bold font-bodoni ${getMessageColor()}`}
                style={{ 
                  fontSize: SIZES.MESSAGE_SIZE,
                  marginBottom: "clamp(1.2rem, 2.5vw, 1.5rem)", // Reducido proporcionalmente
                  minHeight: "clamp(20px, 3vw, 25px)", // Reducido proporcionalmente
                }}
              >
                {mensaje}
              </p>
            )}

            {/* Formulario de inicio de sesión */}
            <form onSubmit={handleSubmit} className="text-left">
              {/* Campo de Usuario */}
              <label 
                htmlFor="usuario" 
                className="block text-left font-bodoni font-medium text-text-main"
                style={{ 
                  fontSize: SIZES.LABEL_SIZE,
                  marginBottom: "clamp(0.5rem, 1vw, 0.8rem)", // Reducido proporcionalmente
                }}
              >
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
                className="w-full bg-surface border border-stroke rounded-xl text-text-main font-miles box-border focus:outline-none focus:border-accent transition-colors duration-200"
                style={{
                  padding: "clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 16px)", // Reducido proporcionalmente
                  fontSize: SIZES.INPUT_SIZE,
                  marginBottom: "clamp(1rem, 2.5vw, 1.5rem)", // Reducido proporcionalmente
                }}
              />

              {/* Campo de Contraseña */}
              <label 
                htmlFor="contrasenia" 
                className="block text-left font-bodoni font-medium text-text-main"
                style={{ 
                  fontSize: SIZES.LABEL_SIZE,
                  marginBottom: "clamp(0.5rem, 1vw, 0.8rem)", // Reducido proporcionalmente
                }}
              >
                Contraseña
              </label>
              <div 
                className="relative w-full"
                style={{ marginBottom: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="contrasenia"
                  placeholder="Introduce tu contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full bg-surface border border-stroke rounded-lg text-text-main font-miles box-border focus:outline-none focus:border-accent transition-all duration-200"
                  style={{
                    padding: "clamp(10px, 2vw, 14px) clamp(12px, 2.5vw, 16px)",
                    paddingRight: "clamp(40px, 6vw, 50px)",
                    fontSize: SIZES.INPUT_SIZE,
                  }}
                />
                {/* Botón para mostrar/ocultar contraseña - completamente sin fondo */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 border-none cursor-pointer p-1 flex items-center justify-center text-text-muted transition-colors duration-200"
                  style={{ 
                    right: "clamp(8px, 1.5vw, 12px)",
                    backgroundColor: 'transparent'
                  }}
                  whileHover={{ opacity: 0.7, scale: 1.1 }}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeIconHide color="#78909C" size={SIZES.ICON_SIZE} />
                  ) : (
                    <EyeIconShow color="#78909C" size={SIZES.ICON_SIZE} />
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
                className="w-full bg-primary text-surface-elevated border-none rounded-xl font-bodoni font-bold uppercase cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80"
                style={{
                  padding: "clamp(12px, 2.5vw, 16px)", // Reducido proporcionalmente
                  fontSize: SIZES.BUTTON_SIZE,
                  marginTop: "clamp(1.2rem, 3vw, 1.8rem)", // Reducido proporcionalmente
                }}
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