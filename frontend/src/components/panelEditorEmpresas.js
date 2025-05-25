import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FichaExpandidaEditable from './fichaExpandidaEditable';
import RegistroEmpresa from './registroEmpresa';
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

const PanelEditorEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [showFicha, setShowFicha] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Asegúrate de que esta URL sea correcta para tu configuración de Cloudinary
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload'; 

  useEffect(() => {
    axios.get('http://localhost:3000/empresas')
      .then(res => setEmpresas(res.data))
      .catch(err => console.error('Error al obtener empresas:', err));
  }, [showRegistro]);

  const handleEmpresaClick = async (id_empresa) => {
    try {
      const res = await axios.get(`http://localhost:3000/empresas/${id_empresa}`);
      setEmpresaSeleccionada(res.data);
      setShowFicha(true);
    } catch (err) {
      console.error('Error al obtener detalles de empresa:', err);
    }
  };

  const empresasFiltradas = empresas.filter((e) =>
    e.denominacion_social.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen w-full bg-[#F6F0E0] p-[1vw] flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-[#FFFFFF] w-full max-w-[85vw] min-h-[70vh] rounded-lg shadow-lg overflow-hidden"
        variants={itemVariants}
      >
        {/* HEADER */}
        <motion.div
          className="bg-[#1D4C7F] px-[3vw] py-[1vh] flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={itemVariants}
        >
          <motion.span
            className="text-[#F6F0E0] text-[1rem] sm:text-[1.2rem] w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0"
            variants={itemVariants}
          >
            EMPRESAS (Modo Edición)
          </motion.span>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-[1.5vw] w-full" variants={itemVariants}>
            {/* NOTA: Para los iconos, se usaron filtros CSS para aproximar los colores. Es posible que necesiten ajustes finos o reemplazo de los propios iconos. */}
            <motion.img
              src="/icons/filtro.png"
              alt="Filtro"
              className="w-[1.3vw] h-[1.3vw] hidden sm:block"
              style={{ filter: 'invert(30%) sepia(20%) saturate(300%) hue-rotate(160deg) brightness(90%) contrast(90%)' }} // Verde oscuro similar
              variants={itemVariants}
            />
            {/* BUSCADOR */}
            <motion.div className="relative w-full max-w-[40vw]" variants={itemVariants}>
              <motion.input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="rounded-full px-[1vw] py-[0.5vw] pl-[2.5vw] w-full bg-[#D4B86A] text-[#333333] focus:outline-none text-[0.9rem] placeholder-[#333333]/70"
                variants={itemVariants}
              />
              <motion.img
                src="/icons/lupa.png"
                alt="Buscar"
                className="absolute left-[0.8vw] top-1/2 -translate-y-1/2 w-[1vw] h-[1vw]"
                style={{ filter: 'invert(20%) sepia(10%) saturate(1000%) hue-rotate(340deg) brightness(50%) contrast(90%)' }} // Gris oscuro similar
                variants={itemVariants}
              />
            </motion.div>

            {/* ÍCONOS */}
            <motion.div className="flex gap-[2vw] items-center mt-2 sm:mt-0" variants={itemVariants}>
              <motion.img
                src="/media/busqueda/medalla.png"
                alt="Medalla"
                className="w-[2vw] h-[2.5vw]"
                style={{ filter: 'sepia(100%) hue-rotate(20deg) saturate(600%) brightness(90%) contrast(100%)' }} // Dorado similar
                variants={itemVariants}
              />
              <motion.img
                src="/media/busqueda/plus.png"
                alt="Plus"
                className="w-[2vw] h-[2.5vw] cursor-pointer"
                onClick={() => setShowRegistro(true)}
                style={{ filter: 'invert(40%) sepia(80%) saturate(300%) hue-rotate(150deg) brightness(80%) contrast(100%)' }} // Verde oscuro similar
                variants={itemVariants}
              />
              <motion.img
                src="/media/busqueda/cerebro.png"
                alt="Cerebro"
                className="w-[2vw] h-[2.5vw]"
                style={{ filter: 'sepia(100%) hue-rotate(20deg) saturate(600%) brightness(90%) contrast(100%)' }} // Dorado similar
                variants={itemVariants}
              />
              <motion.img
                src="/media/busqueda/mapa.png"
                alt="Mapa"
                className="w-[2vw] h-[3vw]"
                style={{ filter: 'sepia(100%) hue-rotate(20deg) saturate(600%) brightness(90%) contrast(100%)' }} // Dorado similar
                variants={itemVariants}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* BOTÓN DE NUEVA EMPRESA */}
        <motion.div className="flex justify-center py-4" variants={itemVariants}>
          <motion.button
            className="bg-[#1D4C7F] text-[#F6F0E0] font-bold rounded-full px-4 py-2 border border-[#1D4C7F] hover:bg-[#333333] hover:text-[#F6F0E0] transition"
            onClick={() => setShowRegistro(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            + Nueva Empresa
          </motion.button>
        </motion.div>

        {/* TARJETAS */}
        <motion.div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.9vw] px-[2vw] pb-[2vw]" variants={itemVariants}>
          <AnimatePresence>
            {empresasFiltradas.map((empresa) => (
              <motion.div
                key={empresa.id_empresa}
                onClick={() => handleEmpresaClick(empresa.id_empresa)}
                className="cursor-pointer relative bg-[#333333] rounded-xl overflow-hidden shadow-md group hover:scale-105 transition-all duration-300"
                style={{ height: '200px' }}
                variants={itemVariants} // Cada tarjeta se anima individualmente
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <motion.img
                  src={`${CLOUDINARY_BASE_URL}/${empresa.url}`}
                  alt={empresa.denominacion_social}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                  variants={itemVariants}
                />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-[#333333]/70 to-transparent flex items-end p-4" variants={itemVariants}>
                  <motion.span className="text-[#F6F0E0] font-bold text-lg drop-shadow-lg" variants={itemVariants}>
                    {empresa.denominacion_social || 'Sin nombre comercial'}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* MODAL DE EDICIÓN */}
      <AnimatePresence>
        {showFicha && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#333333] bg-opacity-60 z-50 flex justify-center items-center p-4"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-lg max-w-[900px] w-full max-h-[90vh] overflow-auto relative"
            >
              <motion.button
                onClick={() => setShowFicha(false)}
                className="absolute top-3 right-4 text-[#1D4C7F] hover:text-[#1A7B5F] text-xl font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={itemVariants}
              >
                ×
              </motion.button>
              <FichaExpandidaEditable empresa={empresaSeleccionada} onClose={() => setShowFicha(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE REGISTRO */}
      <AnimatePresence>
        {showRegistro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#333333] bg-opacity-60 z-50 flex justify-center items-center p-4"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F6F0E0] p-6 rounded-xl shadow-lg max-w-[900px] w-full max-h-[90vh] overflow-auto relative"
            >
              <motion.button
                onClick={() => setShowRegistro(false)}
                className="absolute top-3 right-4 text-[#1D4C7F] hover:text-[#1A7B5F] text-xl font-bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                variants={itemVariants}
              >
                ×
              </motion.button>
              <RegistroEmpresa ancho="100%" alto="80vh" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PanelEditorEmpresas;