import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PanelEditorUsuarios = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const usuarios = [
    { nombre: 'Juan Pérez', rol: 'Administrador' },
    { nombre: 'María López', rol: 'Editor' },
    { nombre: 'Carlos Ruiz', rol: 'Moderador' },
    { nombre: 'Ana Torres', rol: 'Usuario' },
    { nombre: 'Luis Gómez', rol: 'Invitado' },
    { nombre: 'Valeria Ríos', rol: 'Administrador' },
    { nombre: 'José Silva', rol: 'Editor' },
    { nombre: 'Camila Díaz', rol: 'Moderador' }
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f0df] p-6 flex flex-col items-center">
      <h1 className="text-3xl text-[#9fa56c] font-bold font-mono tracking-wide mb-8">Panel de edición</h1>

      <div className="bg-[#202020] w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#2b2b2b] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#e1e4c5] text-lg">DATOS</span>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-5 h-5 mt-1" />
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar..."
                className="rounded-full px-4 py-1 pl-10 w-full bg-[#e1e4c5] text-black focus:outline-none"
              />
              <img src="/icons/lupa.png" alt="Buscar" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
            <div className="flex gap-2 text-[#e1e4c5]">
              <span>🏅</span>
              <span>➕50</span>
              <span>🧠</span>
              <span>🗺️</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-4 flex justify-end">
          <button
            className="bg-[#9fa56c] text-white p-3 rounded-full text-sm font-semibold hover:bg-[#8a944e] transition"
            onClick={() => setModalVisible(true)}
          >
            ➕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6">
          {usuarios.map((usuario, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-black shadow-md flex flex-col justify-center items-start"
            >
              <span className="text-[#2b2b2b] font-semibold text-lg">Usuario</span>
              <input
                type="text"
                value={usuario.nombre}
                disabled
                className="w-full mt-2 mb-3 p-2 rounded-md bg-[#e1e4c5] text-black"
              />
              <span className="text-[#2b2b2b] font-semibold text-lg">Rol</span>
              <input
                type="text"
                value={usuario.rol}
                disabled
                className="w-full mt-2 p-2 rounded-md bg-[#e1e4c5] text-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de error con animación */}
      <AnimatePresence>
        {modalVisible && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="bg-[#f2f0df] rounded-xl p-6 max-w-sm w-[90%] shadow-xl relative border-4 border-[#9fa56c]"
              variants={modalVariants}
            >
              <button
                onClick={() => setModalVisible(false)}
                className="absolute top-3 right-4 text-[#1d4c7f] text-xl font-bold hover:text-[#1a7b5f] transition"
              >
                ✖
              </button>
              <h2 className="text-xl text-[#2b2b2b] font-bold mb-2">Permisos denegados</h2>
              <p className="text-[#444] mb-3">No tienes los permisos necesarios para acceder a esta función.</p>
              <div className="text-[#d44] font-semibold">Error 403</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PanelEditorUsuarios;
