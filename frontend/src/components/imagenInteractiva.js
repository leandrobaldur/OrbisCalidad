// src/components/imagenInteractiva.jsx
import React, { useState } from "react";

const ImagenInteractiva = ({ items, imagenDefault, ancho = "60vw" }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  const anchoNum = parseFloat(ancho);
  const margenLateral = (anchoNum * 0.05) + "vw"; // 5% del ancho como margen lateral
  const iconoWidth = (anchoNum * 0.4) / items.length + "vw"; // Distribuir 90% del ancho entre los íconos

  return (
    <div
      className="flex flex-col"
      style={{ width: ancho, aspectRatio: '4 / 3', marginLeft: 0 }}
    >
      {/* Barra de iconos */}
      <div
        className="w-full bg-black flex items-center py-[0.5vw] gap-[1vw]"
        style={{ paddingLeft: margenLateral, paddingRight: margenLateral, justifyContent: "space-between" }}
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

      {/* Panel de contenido */}
      <div
        className="w-full bg-gray-100 text-black flex flex-col items-center gap-[1vw] flex-grow overflow-auto"
        style={{ paddingLeft: margenLateral, paddingRight: margenLateral, paddingTop: "2vw", paddingBottom: "2vw" }}
      >
        {seleccionado ? (
          <>
            <h2 className="text-[1.2vw] font-bold text-center">{seleccionado.subtitulo}</h2>
            <img
              src={seleccionado.imagen}
              alt="contenido"
              className="max-w-full h-[20vw] object-contain"
            />
            <p className="text-center max-w-2xl text-[1vw]">{seleccionado.texto}</p>
          </>
        ) : (
          <img
            src={imagenDefault}
            alt="default"
            className="w-full h-[30vw] object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ImagenInteractiva;