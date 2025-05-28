import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [modoEliminar, setModoEliminar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

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
  }, [mostrarModal]);

  const inputStyle = "w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]";

  const handleRegistrarUsuario = async () => {
    if (!nuevoUsuario.trim() || !nuevaContrasenia.trim()) {
      setMensaje("Completa todos los campos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: nuevoUsuario.trim(),
          contrasenia: nuevaContrasenia.trim(),
          id_usuario: 1
        }),
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
        fetch('http://localhost:3000/usuarios')
          .then(res => res.json())
          .then(setUsuarios)
          .catch(err => console.error("Error al recargar usuarios:", err));
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor");
    }
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
          style={{ width: '100%', height: '9vh', padding: '1rem 2.5rem' }} // py-4 = 1rem, px-10 = 2.5rem 
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

      {/* MODAL */}
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
                className="w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]"
                value={nuevoUsuario}
                onChange={(e) => setNuevoUsuario(e.target.value)}
                variants={itemVariants}
                key="usuario-input"
              />
              <motion.input
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 mb-4 rounded-md border border-[#D4B86A] text-[#333333]"
                value={nuevaContrasenia}
                onChange={(e) => setNuevaContrasenia(e.target.value)}
                variants={itemVariants}
                key="password-input"
              />

              <div className="flex justify-between gap-4">
                <motion.button
                  onClick={() => {
                    setMostrarModal(false);
                    setNuevoUsuario("");
                    setNuevaContrasenia("");
                    setMensaje(null);
                  }}
                  className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F]"
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
                          id_usuario: 1
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
                  className="flex-1 bg-[#F4E9CD] text-white py-2 rounded-md hover:bg-[#1A7B5F]"
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
          <AnimatePresence>
      {mostrarModalEliminar && usuarioSeleccionado && (
        <motion.div
          className="fixed inset-0 bg-[#333333] bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => {
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
                className="flex-1 bg-[#D4B86A] text-white py-2 rounded-md hover:bg-[#1D4C7F]"
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

                    // Actualizar lista
                    const usuariosActualizados = usuarios.filter(u => u.id_usuario !== usuarioSeleccionado.id_usuario);
                    setUsuarios(usuariosActualizados);

                    setMostrarModalEliminar(false);
                    setUsuarioSeleccionado(null);
                    setModoEliminar(false);
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                className="flex-1 bg-[#520000] text-white py-2 rounded-md hover:bg-[#8B0000]"
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

    </motion.div>
  );
};

export default PanelEditorUsuarios;
