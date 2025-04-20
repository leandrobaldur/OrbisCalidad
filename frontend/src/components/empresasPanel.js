import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FichaExpandida from './fichaExpandida'; // Asegúrate que esté en el mismo nivel o ajustá el path

const EmpresasPanel = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [showFicha, setShowFicha] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/empresas')
      .then(res => setEmpresas(res.data))
      .catch(err => console.error('Error al obtener empresas:', err));
  }, []);

  const handleEmpresaClick = async (id_empresa) => {
    try {
      const res = await axios.get(`http://localhost:3000/empresa/${id_empresa}`);
      setEmpresaSeleccionada(res.data);
      setShowFicha(true);
    } catch (err) {
      console.error('Error al obtener detalles de empresa:', err);
    }
  };

  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  return (
    <div className="min-h-screen w-full bg-[#0000] p-[1vw] flex flex-col items-center">
      <div className="bg-[#202020] w-full max-w-[85vw] min-h-[70vh] rounded-lg shadow-lg overflow-hidden">
        {/* encabezado */}
        <div className="bg-[#2b2b2b] px-[3vw] py-[1vh] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#F9F9FA] text-[1rem] sm:text-[1.2rem]">
            EMPRESAS
          </span>
          {/* filtros, buscador, íconos (sin cambios) */}
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.9vw] px-[2vw] py-[2vw]">
          {empresas.map((empresa, index) => {
            const imageUrl = `${CLOUDINARY_BASE_URL}/${empresa.url}`;
            return (
              <div
                key={empresa.id_empresa || index}
                onClick={() => handleEmpresaClick(empresa.id_empresa)}
                className="cursor-pointer relative bg-black rounded-xl overflow-hidden shadow-md group hover:scale-105 transition-all duration-300"
                style={{ height: '200px' }}
              >
                <img
                  src={imageUrl}
                  alt={empresa.denominacion_social}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {empresa.denominacion_social || 'Sin nombre comercial'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showFicha && (
        <FichaExpandida
          empresa={empresaSeleccionada}
          onClose={() => setShowFicha(false)}
        />
      )}
    </div>
  );
};

export default EmpresasPanel;
