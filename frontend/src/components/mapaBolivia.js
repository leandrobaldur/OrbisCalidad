import React, { useState } from "react";
import { ReactComponent as BoliviaSVG } from "../assets/bolivia.svg"; // Asegúrate de tener este SVG

const MapaBolivia = () => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("Selecciona un departamento");

  const manejarClick = (e) => {
    const nombre = e.target.getAttribute("name");
    if (nombre) {
      setDepartamentoSeleccionado(nombre);
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-8 px-8 py-10">
      {/* Texto vertical "BOLIVIA" */}
      <div className="flex items-center justify-center mt-16">
        <div className="text-4xl font-bold tracking-widest rotate-90 text-black">
          BOLIVIA
        </div>
      </div>

      {/* Mapa SVG Interactivo */}
      <div className="w-[40vw]">
        <BoliviaSVG
          className="bolivia-map w-full h-auto cursor-pointer"
          onClick={manejarClick}
        />
      </div>

      {/* Texto vertical del departamento + descripción */}
      <div className="flex items-center gap-6 mt-16">
        <div className="text-3xl font-semibold rotate-90 text-black whitespace-nowrap">
          {departamentoSeleccionado.toUpperCase()}
        </div>

        <div className="w-64 h-40 bg-gray-100 border border-black p-4 text-sm text-gray-700 shadow-inner">
          <p>
            Aquí irá la descripción del departamento seleccionado. Esto se puede reemplazar con contenido dinámico más adelante.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapaBolivia;
