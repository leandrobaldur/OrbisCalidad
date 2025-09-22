import React, { useState, useEffect } from "react";
import { ReactComponent as BoliviaSVG } from "../assets/bolivia.svg";

const MapaBolivia = ({ onDepartamentoClick, empresas }) => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);

  const manejarClick = (e) => {
    const nombre = e.target.getAttribute("name");
    if (nombre) {
      setDepartamentoSeleccionado(nombre);
      if (onDepartamentoClick) {
        onDepartamentoClick(nombre);
      }
    }
  };

  useEffect(() => {
    // Código para cambiar el color de los departamentos
    const paths = document.querySelectorAll(".bolivia-map path");
    paths.forEach((path) => {
      const nombreDep = path.getAttribute("name");
      if (nombreDep === departamentoSeleccionado) {
        path.style.fill = "#000000ff"; // Color para el departamento seleccionado
      } else {
        path.style.fill = "#32302fff"; // Color por defecto
      }
    });
  }, [departamentoSeleccionado]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Mapa SVG Interactivo */}
      <div className="flex-grow w-full h-full flex items-center justify-center p-4">
        <BoliviaSVG
          className="bolivia-map w-full h-full cursor-pointer" // <-- Aquí está el cambio clave
          onClick={manejarClick}
        />
      </div>
    </div>
  );
};

export default MapaBolivia;