import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

// Variantes de animación para los elementos individuales
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Componente para la alerta de confirmación de éxito (reutilizado para registro y eliminación)
const SuccessConfirmationAlert = ({ message, onClose, fontMonoClass }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-[#333333] bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-[#F6F0E0] p-8 rounded-xl shadow-2xl text-center max-w-sm w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1A7B5F]"></div> {/* Top accent */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400, delay: 0.1 }}
            className="text-green-500 text-6xl" // Icono de checkmark verde
          >
            ✓
          </motion.div>
        </div>
        <h3 className={`text-2xl font-bold text-[#052018] mb-3 ${fontMonoClass}`}>¡Éxito!</h3>
        <p className="text-[#333333] mb-6">{message}</p>
        <motion.button
          onClick={onClose}
          className="bg-[#1A7B5F] text-white py-2 px-6 rounded-md hover:bg-[#052018] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aceptar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


const PanelEditorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [mensaje, setMensaje] = useState(null); // Para mensajes de error o validación dentro del modal de registro

  // Estados para la alerta de éxito de registro
  const [mostrarAlertaExito, setMostrarAlertaExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // Estados para la funcionalidad de eliminación
  const [modoEliminar, setModoEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  // Estados para la alerta de éxito de eliminación (NUEVOS)
  const [mostrarAlertaEliminarExito, setMostrarAlertaEliminarExito] = useState(false);
  const [mensajeEliminarExito, setMensajeEliminarExito] = useState("");


  const ROL_NOMBRE = {
    1: "Administrador",
    2: "Colaborador"
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      if (!response.ok) throw new Error("Error al obtener usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      // Puedes setear un mensaje de error global si lo deseas
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, [mostrarModal, mostrarAlertaExito, mostrarAlertaEliminarExito]); // Dependencia actualizada para recargar

  const inputStyle = "w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]";

  const handleRegistrarUsuario = async () => {
    if (!nuevoUsuario.trim() || !nuevaContrasenia.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    setMensaje(null); // Limpiar mensaje de error previo

    try {
      const response = await fetch('http://localhost:3000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: nuevoUsuario.trim(),
          contrasenia: nuevaContrasenia.trim(),
          id_usuario: 1 // Asegúrate que tu backend espera 'id_usuario' aquí para el registro
        }),
      });

      const data = await response.json();

if (!response.ok) {
  // Si el error es solo por "Error al registrar el log", ignóralo y continúa
  if (data.message && data.message.includes("Error al registrar el log")) {
    console.warn("Ignorando error de log en backend, usuario creado.");
  } else {
    // Error real, por ejemplo usuario duplicado
    setMensaje(data.message || "Error al registrar");
    return;
  }
}

      // Registro exitoso: mostrar alerta y cerrar modal
      setMensajeExito("El usuario ha sido creado exitosamente.");
      setMostrarAlertaExito(true);
      setMostrarModal(false);
      setNuevoUsuario("");
      setNuevaContrasenia("");
      cargarUsuarios();

    
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor. Intente de nuevo.");
    }
  };

  // Función que se ejecuta al hacer clic en "Aceptar" en la alerta de éxito de registro
  const handleSuccessAlertClose = () => {
    setMostrarAlertaExito(false); // Cierra la alerta de éxito
    setMostrarModal(false);     // Cierra el modal de registro
    setNuevoUsuario("");         // Limpia el campo de usuario
    setNuevaContrasenia("");     // Limpia el campo de contraseña
    setMensaje(null);            // Asegura que no haya mensajes de error en el modal de registro
    cargarUsuarios();            // Recarga la lista de usuarios para mostrar el nuevo
  };

  // Función que se ejecuta al hacer clic en "Aceptar" en la alerta de éxito de eliminación (NUEVA)
  const handleDeleteSuccessAlertClose = () => {
    setMostrarAlertaEliminarExito(false); // Cierra la alerta de éxito de eliminación
    setMostrarModalEliminar(false);    // Cierra el modal de confirmación de eliminación
    setUsuarioSeleccionado(null);      // Limpia el usuario seleccionado
    setModoEliminar(false);            // Sale del modo de eliminación
    cargarUsuarios();                  // Recarga la lista de usuarios
  };


  return (
    <motion.div
      className="min-h-screen w-full bg-[#F6F0E0] p-8 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.div
          className="bg-[#F1E3C1] rounded-lg shadow-lg overflow-hidden"
          style={{ width: '85%' }}
          variants={itemVariants}
        >

        <motion.div
          className="bg-[#052018] flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ width: '100%', height: '9vh', padding: '1rem 2.5rem' }}
          variants={itemVariants}
        >
          <motion.span className="text-[#F6F0E0] text-lg" variants={itemVariants} >
            USUARIOS
          </motion.span>
        </motion.div>

        <motion.div className="px-10 pb-0 flex justify-end mt-5 gap-4" variants={itemVariants}>
            <motion.button
              className={`w-14 h-14 rounded-[50px] flex justify-center items-center text-white text-2xl font-normal transition
                ${modoEliminar ? 'bg-[#8B0000]' : 'bg-[#520000]'}
                hover:bg-[#8B0000]`}
              onClick={() => {
                setModoEliminar(!modoEliminar);
                setUsuarioSeleccionado(null);
                setMostrarModalEliminar(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={itemVariants}
            >
              -
            </motion.button>


          <motion.button
            className="bg-[#052018] w-14 h-14 rounded-[50px] flex justify-center items-center text-white text-2xl font-normal hover:bg-white transition"
            onClick={() => setMostrarModal(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            +
          </motion.button>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6" variants={containerVariants}>
          <AnimatePresence>
            {usuarios.map((usuario) => (
              <motion.div
                key={usuario.id_usuario || usuario.usuario}
                className={`bg-[#F6F0E0] rounded-xl p-4 text-black shadow-md flex flex-col justify-center items-start cursor-pointer
                  ${modoEliminar && usuarioSeleccionado?.id_usuario === usuario.id_usuario ? 'border-4 border-red-600' : ''}
                `}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                onClick={() => {
                  if (modoEliminar) {
                    if (usuarioSeleccionado?.id_usuario === usuario.id_usuario) {
                      setUsuarioSeleccionado(null);
                      setMostrarModalEliminar(false);
                    } else {
                      setUsuarioSeleccionado(usuario);
                      setMostrarModalEliminar(true);
                    }
                  }
                }}
              >
                <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>
                  Usuario
                </motion.span>
                <motion.input
                  type="text"
                  value={usuario.usuario}
                  disabled
                  className="w-full mt-2 mb-3 p-2 rounded-md bg-[#F4E9CD] text-[#333333]"
                  variants={itemVariants}
                />
                <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>
                  Rol
                </motion.span>
                <motion.input
                  type="text"
                  value={ROL_NOMBRE[usuario.id_rol] || "Desconocido"}
                  disabled
                  className="w-full mt-2 p-2 rounded-md bg-[#F4E9CD] text-[#333333]"
                  variants={itemVariants}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* MODAL DE REGISTRO */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
              }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">Registrar nuevo colaborador</h2>

              {mensaje && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3 text-sm text-center text-red-600 font-medium"
                >
                  {mensaje}
                </motion.div>
              )}

              <motion.input
                type="text"
                placeholder="Nombre de usuario"
                className={inputStyle}
                value={nuevoUsuario}
                onChange={(e) => setNuevoUsuario(e.target.value)}
                variants={itemVariants}
              />
              <motion.input
                type="password"
                placeholder="Contraseña"
                className={inputStyle}
                value={nuevaContrasenia}
                onChange={(e) => setNuevaContrasenia(e.target.value)}
                variants={itemVariants}
              />

              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={() => {
                    setMostrarModal(false);
                    setNuevoUsuario("");
                    setNuevaContrasenia("");
                    setMensaje(null);
                  }}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleRegistrarUsuario}
                  className="flex-1 bg-[#052018] text-white py-2 rounded-md hover:bg-[#1A7B5F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  Registrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE ELIMINAR USUARIO (CONFIRMACIÓN INICIAL) */}
      <AnimatePresence>
        {mostrarModalEliminar && usuarioSeleccionado && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => { // Permite cerrar el modal haciendo clic fuera
              setMostrarModalEliminar(false);
              setUsuarioSeleccionado(null);
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
              }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
              onClick={e => e.stopPropagation()} // Para que no cierre al click dentro del modal
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">
                Eliminar usuario "{usuarioSeleccionado.usuario}"
              </h2>

              <p className="mb-6 text-center text-[#333333]">
                ¿Estás seguro que deseas eliminar este usuario?
              </p>

              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={() => {
                    setMostrarModalEliminar(false);
                    setUsuarioSeleccionado(null);
                  }}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={async () => {
                    try {
                      const response = await fetch(`http://localhost:3000/usuarios/${usuarioSeleccionado.id_usuario}`, {
                        method: 'DELETE',
                      });

                      if (!response.ok) {
                        const data = await response.json();
                        throw new Error(data.message || 'Error al eliminar usuario');
                      }

                      // NO ACTUALIZAR LA LISTA NI CERRAR EL MODAL AQUÍ INMEDIATAMENTE
                      setMensajeEliminarExito(`El usuario "${usuarioSeleccionado.usuario}" ha sido eliminado exitosamente.`);
                      setMostrarAlertaEliminarExito(true);

                    } catch (error) {
                      // Si hay un error en la eliminación, mostrar un alert tradicional o un mensaje en el modal
                      alert(error.message);
                    }
                  }}
                  className="flex-1 bg-[#520000] text-white py-2 rounded-md hover:bg-[#8B0000] transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Eliminar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ALERTA DE CONFIRMACIÓN DE ÉXITO DE REGISTRO */}
      <AnimatePresence>
        {mostrarAlertaExito && (
          <SuccessConfirmationAlert
            message={mensajeExito}
            onClose={handleSuccessAlertClose}
            fontMonoClass="font-mono"
          />
        )}
      </AnimatePresence>

      {/* ALERTA DE CONFIRMACIÓN DE ÉXITO DE ELIMINACIÓN (NUEVA) */}
      <AnimatePresence>
        {mostrarAlertaEliminarExito && (
          <SuccessConfirmationAlert
            message={mensajeEliminarExito}
            onClose={handleDeleteSuccessAlertClose}
            fontMonoClass="font-mono"
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default PanelEditorUsuarios;