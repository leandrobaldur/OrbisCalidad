import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importa motion y AnimatePresence

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

// Variantes de animación para los elementos internos
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PanelEditorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const ROL_NOMBRE = {
    1: "Administrador",
    2: "Colaborador"
  };

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, [mostrarModal]); // Recargar usuarios cuando el modal se cierra (después de un posible registro)

  return (
    <motion.div
      className="min-h-screen w-full bg-[#F6F0E0] p-6 flex flex-col items-center" // Fondo principal con Beige/Crema claro
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl text-[#1D4C7F] font-bold font-mono tracking-wide mb-8" // Título con Azul Oscuro
        variants={itemVariants}
      >
        Panel de edición
      </motion.h1>

      <motion.div
        className="bg-[#333333] w-full max-w-6xl rounded-lg shadow-lg overflow-hidden" // Contenedor principal con Gris Oscuro
        variants={itemVariants}
      >
        <motion.div
          className="bg-[#1D4C7F] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4" // Header de datos con Azul Oscuro
          variants={itemVariants}
        >
          <motion.span className="text-[#F6F0E0] text-lg" variants={itemVariants}> {/* Texto "DATOS" con Beige/Crema claro */}
            DATOS
          </motion.span>
        </motion.div>

        <motion.div className="px-6 pb-4 flex justify-end" variants={itemVariants}>
          <motion.button
            className="bg-[#1A7B5F] text-white p-3 rounded-full text-sm font-semibold hover:bg-[#333333] transition" // Botón "+" con Verde Oscuro, hover con Gris Oscuro
            onClick={() => setMostrarModal(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            ➕
          </motion.button>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6" variants={containerVariants}>
          <AnimatePresence>
            {usuarios.map((usuario) => (
              <motion.div
                key={usuario.id_usuario || usuario.usuario} // Usar id_usuario si existe, sino usuario
                className="bg-[#F6F0E0] rounded-xl p-4 text-black shadow-md flex flex-col justify-center items-start" // Tarjetas de usuario con Beige/Crema claro
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>Usuario</motion.span> {/* Texto con Gris Oscuro */}
                <motion.input
                  type="text"
                  value={usuario.usuario}
                  disabled
                  className="w-full mt-2 mb-3 p-2 rounded-md bg-[#D4B86A] text-[#333333]" // Input deshabilitado con Dorado/Camel, texto con Gris Oscuro
                  variants={itemVariants}
                />
                <motion.span className="text-[#333333] font-semibold text-lg" variants={itemVariants}>Rol</motion.span> {/* Texto con Gris Oscuro */}
                <motion.input
                  type="text"
                  value={ROL_NOMBRE[usuario.id_rol] || "Desconocido"}
                  disabled
                  className="w-full mt-2 p-2 rounded-md bg-[#D4B86A] text-[#333333]" // Input deshabilitado con Dorado/Camel, texto con Gris Oscuro
                  variants={itemVariants}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50" // Fondo del modal con Gris Oscuro translúcido
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative" // Fondo del modal interno con Beige/Crema claro
            >
              <h2 className="text-xl font-bold text-[#333333] mb-4 text-center">Registrar nuevo colaborador</h2> {/* Título del modal con Gris Oscuro */}

              {mensaje && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3 text-sm text-center text-red-600 font-medium" // Mensaje de error (color rojo se mantiene por su significado)
                >
                  {mensaje}
                </motion.div>
              )}

              <motion.input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]" // Input con borde Dorado/Camel, texto Gris Oscuro
                value={nuevoUsuario}
                onChange={(e) => setNuevoUsuario(e.target.value)}
                variants={itemVariants}
              />
              <motion.input
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]" // Input con borde Dorado/Camel, texto Gris Oscuro
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
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F]" // Botón "Cancelar" con Dorado/Camel, hover con Azul Oscuro
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={async () => {
                    if (!nuevoUsuario || !nuevaContrasenia) {
                      setMensaje("Completa todos los campos.");
                      return;
                    }

                    try {
                      const response = await fetch('http://localhost:3000/usuarios/registro', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          usuario: nuevoUsuario,
                          contrasenia: nuevaContrasenia,
                          id_usuario: 1 // Asegúrate de que este ID sea manejado correctamente por tu backend
                        })
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        setMensaje(data.message || "Error al registrar");
                        return;
                      }

                      setMensaje("Usuario creado exitosamente");
                      setTimeout(() => {
                        setMostrarModal(false);
                        setNuevoUsuario("");
                        setNuevaContrasenia("");
                        setMensaje(null);
                        // recargar lista
                        fetch('http://localhost:3000/usuarios')
                          .then(res => res.json())
                          .then(setUsuarios)
                          .catch(err => console.error("Error al recargar usuarios:", err));
                      }, 1000);
                    } catch (err) {
                      console.error("Error:", err);
                      setMensaje("Error al conectar con el servidor");
                    }
                  }}
                  className="flex-1 bg-[#1A7B5F] text-white py-2 rounded-md hover:bg-[#333333]" // Botón "Registrar" con Verde Oscuro, hover con Gris Oscuro
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
    </motion.div>
  );
};

export default PanelEditorUsuarios;