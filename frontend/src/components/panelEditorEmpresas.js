import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FichaExpandidaEditable from './fichaExpandidaEditable';
import RegistroEmpresa from './registroEmpresa';

const PanelEditorEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [showFicha, setShowFicha] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);
  const [busqueda, setBusqueda] = useState('');

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
    <div className="min-h-screen w-full bg-[#F6EEE3] p-[1vw] flex flex-col items-center"> {/* Fondo principal con Ivrae */}
      <div className="bg-[#FFFFFF] w-full max-w-[85vw] min-h-[70vh] rounded-lg shadow-lg overflow-hidden"> {/* Contenedor principal con blanco puro para contraste */}

        {/* HEADER */}
        <div className="bg-[#FF4201] px-[3vw] py-[1vh] flex flex-col sm:flex-row justify-between items-center gap-4"> {/* Header con Clementina */}
          <span className="text-[#F6EEE3] text-[1rem] sm:text-[1.2rem] w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0"> {/* Texto del header con Ivrae */}
            EMPRESAS (Modo Edición)
          </span>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[1.5vw] w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-[1.3vw] h-[1.3vw] hidden sm:block" />

            {/* BUSCADOR */}
            <div className="relative w-full max-w-[40vw]">
              <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="rounded-full px-[1vw] py-[0.5vw] pl-[2.5vw] w-full bg-[#199ECA] text-[#000000] focus:outline-none text-[0.9rem] placeholder-[#000000]/70" // Fondo del buscador con Skyne, texto y placeholder con Negro
              />
              <img
                src="/icons/lupa.png"
                alt="Buscar"
                className="absolute left-[0.8vw] top-1/2 -translate-y-1/2 w-[1vw] h-[1vw]"
              />
            </div>

            {/* ÍCONOS */}
            <div className="flex gap-[2vw] items-center mt-2 sm:mt-0">
              {/* Aquí podrías considerar cambiar los iconos o usar un filtro CSS si los iconos tienen un color fijo y quieres que coincidan con la paleta */}
              <img src="/media/busqueda/medalla.png" alt="Medalla" className="w-[2vw] h-[2.5vw]" />
              <img src="/media/busqueda/plus.png" alt="Plus" className="w-[2vw] h-[2.5vw] cursor-pointer" onClick={() => setShowRegistro(true)} />
              <img src="/media/busqueda/cerebro.png" alt="Cerebro" className="w-[2vw] h-[2.5vw]" />
              <img src="/media/busqueda/mapa.png" alt="Mapa" className="w-[2vw] h-[3vw]" />
            </div>
          </div>
        </div>

        {/* BOTÓN DE NUEVA EMPRESA */}
        <div className="flex justify-center py-4">
          <button
            className="bg-[#FF4201] text-[#F6EEE3] font-bold rounded-full px-4 py-2 border border-[#FF4201] hover:bg-[#2C00FE] hover:text-[#F6EEE3] transition" // Botón con Clementina, texto con Ivrae, hover con Virel
            onClick={() => setShowRegistro(true)}
          >
            + Nueva Empresa
          </button>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.9vw] px-[2vw] pb-[2vw]">
          {empresasFiltradas.map((empresa, index) => {
            const imageUrl = `${CLOUDINARY_BASE_URL}/${empresa.url}`;
            return (
              <div
                key={empresa.id_empresa || index}
                onClick={() => handleEmpresaClick(empresa.id_empresa)}
                className="cursor-pointer relative bg-[#000000] rounded-xl overflow-hidden shadow-md group hover:scale-105 transition-all duration-300" // Fondo de tarjeta con Negro
                style={{ height: '200px' }}
              >
                <img
                  src={imageUrl}
                  alt={empresa.denominacion_social}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent flex items-end p-4"> {/* Gradiente de negro para el texto */}
                  <span className="text-[#F6EEE3] font-bold text-lg drop-shadow-lg"> {/* Texto de la tarjeta con Ivrae */}
                    {empresa.denominacion_social || 'Sin nombre comercial'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      {showFicha && (
        <FichaExpandidaEditable
          empresa={empresaSeleccionada}
          onClose={() => setShowFicha(false)}
        />
      )}

      {/* MODAL DE REGISTRO */}
      {showRegistro && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-60 z-50 flex justify-center items-center p-4"> {/* Fondo del modal con Negro y opacidad */}
          <div className="bg-[#F6EEE3] p-6 rounded-xl shadow-lg max-w-[900px] w-full max-h-[90vh] overflow-auto relative"> {/* Contenido del modal con Ivrae */}
            <button
              onClick={() => setShowRegistro(false)}
              className="absolute top-3 right-4 text-[#FF4201] hover:text-[#2C00FE] text-xl font-bold" // Botón de cerrar con Clementina, hover con Virel
            >
              ×
            </button>
            <RegistroEmpresa ancho="100%" alto="80vh" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelEditorEmpresas;