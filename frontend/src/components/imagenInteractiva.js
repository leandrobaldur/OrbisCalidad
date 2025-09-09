import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImagenInteractiva = ({ items, imagenDefault, ancho = "60vw" }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  // La lógica para el ancho dinámico se mantiene, ya que es parte del core del componente.
  const anchoNum = parseFloat(ancho);
  const margenLateral = (anchoNum * 0.05) + "vw";
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
      {/* --- Barra de iconos --- */}
      <div
        // APLICAMOS ESTILOS DE LA PALETA: bg-surface y border-primary
        className="w-full flex items-center justify-between py-[0.5vw] gap-[1vw] bg-surface border-t-[1.2vh] border-b-[1.2vh] border-primary"
        style={{
          paddingLeft: margenLateral,
          paddingRight: margenLateral,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{ flex: `1 1 ${iconoWidth}`, display: 'flex', justifyContent: 'center' }}
          >
            <motion.img
              src={item.icono}
              alt={`icono-${index}`}
              className="h-[3vw] cursor-pointer"
              whileHover={{ scale: 1.1, opacity: 0.8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSeleccionado(item)}
            />
          </div>
        ))}
      </div>

      {/* --- Panel de contenido animado --- */}
      <div
        // APLICAMOS ESTILOS DE LA PALETA: bg-background
        className="w-full bg-background flex flex-col items-center gap-[1.5vw] flex-grow overflow-auto"
        style={{ paddingLeft: margenLateral, paddingRight: margenLateral, paddingTop: "2vw", paddingBottom: "2vw" }}
      >
        <AnimatePresence mode="wait">
          {seleccionado ? (
            <motion.div
              key={seleccionado.subtitulo}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="flex flex-col items-center"
            >
              {/* APLICAMOS FUENTE Y COLOR: font-bodoni y text-primary */}
              <h2 className="text-[1.2vw] font-bodoni text-primary text-center tracking-wider">
                {seleccionado.subtitulo}
              </h2>

              <motion.img
                src={seleccionado.imagen}
                alt="contenido"
                className="max-w-full h-[20vw] object-contain my-4" // Añadimos margen vertical
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              {/* APLICAMOS FUENTE Y COLOR: font-miles y text-text-main */}
              <motion.p
                className="text-center max-w-2xl text-[1vw] font-miles text-text-main"
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
              className="w-full h-full max-h-[30vw] object-contain"
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
