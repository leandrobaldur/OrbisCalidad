import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImagenInteractiva = ({ items, imagenDefault, ancho = "60vw" }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  const anchoNum = parseFloat(ancho);
  const margenLateral = (anchoNum * 0.05) + "vw"; // 5% margen lateral
  const iconoWidth = (anchoNum * 0.4) / items.length + "vw";

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="flex flex-col"
      style={{ width: ancho, aspectRatio: '4 / 3', marginLeft: 0 }}
    >
      {/* Barra de iconos */}
      <div
        className="w-full flex items-center py-[0.5vw] gap-[1vw]"
        style={{
          paddingLeft: margenLateral,
          paddingRight: margenLateral,
          justifyContent: "space-between",
          backgroundColor: "#F5F2EE",
          borderTop: "1.2vh solid #03213B",
          borderBottom: "1.2vh solid #03213B"
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{ flex: `1 1 ${iconoWidth}`, display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={item.icono}
              alt={`icono-${index}`}
              className="h-[3vw] cursor-pointer hover:opacity-80"
              onClick={() => setSeleccionado(item)}
            />
          </div>
        ))}
      </div>

      {/* Panel de contenido animado */}
      <div
        className="w-full bg-[#f1efe1] text-black flex flex-col items-center gap-[1.5vw] flex-grow overflow-auto"
        style={{ paddingLeft: margenLateral, paddingRight: margenLateral, paddingTop: "2vw", paddingBottom: "2vw" }}
      >
        <AnimatePresence mode="wait">
          {seleccionado ? (
            <motion.div
              key={seleccionado.subtitulo} // clave para animar cambio de contenido
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="flex flex-col items-center"
            >
              <h2 className="text-[1.2vw] font-bold text-center text-[#03213B]">
                {seleccionado.subtitulo}
              </h2>

              <motion.img
                src={seleccionado.imagen}
                alt="contenido"
                className="max-w-full h-[20vw] object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.p
                className="text-center max-w-2xl text-[1vw]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {seleccionado.texto}
              </motion.p>
            </motion.div>
          ) : (
            <motion.img
              key="default"
              src={imagenDefault}
              alt="default"
              className="w-full h-[30vw] object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImagenInteractiva;
