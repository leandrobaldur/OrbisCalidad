import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FichaExpandidaEditable from './fichaExpandidaEditable';
import RegistroEmpresa from './registroEmpresa';

const PanelEditorEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [premios, setPremios] = useState([]);
  const [selectedPremio, setSelectedPremio] = useState('');
  const [mostrarComboPremios, setMostrarComboPremios] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/buscarEmpresas`)
      .then(res => setEmpresas(res.data))
      .catch(err => console.error('Error al buscar empresas:', err));
  }, []);

  const togglePremios = () => {
    if (mostrarComboPremios) {
      setMostrarComboPremios(false);
      setPremios([]);
    } else {
      axios.get('http://localhost:3000/premios')
        .then(res => {
          setPremios(res.data);
          setMostrarComboPremios(true);
        })
        .catch(err => console.error('Error al cargar premios:', err));
    }
  };

  const filtrarPorPremio = (e) => {
    const idPremio = e.target.value;
    setSelectedPremio(idPremio);
    if (idPremio === '') {
      axios.get(`http://localhost:3000/buscarEmpresas`)
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al buscar empresas:', err));
    } else {
      axios.get(`http://localhost:3000/empresas/premio/${idPremio}`)
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al filtrar empresas:', err));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0000] p-[1vw] flex flex-col items-center">
      <div className="bg-[#202020] w-full max-w-[85vw] min-h-[70vh] rounded-lg shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#2b2b2b] px-[3vw] py-[1vh] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#F9F9FA] text-[1rem] sm:text-[1.2rem] w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            EMPRESAS (Modo Edición)
          </span>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[1.5vw] w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-[1.3vw] h-[1.3vw] hidden sm:block" />

            {/* BUSCADOR */}
            <div className="relative w-full max-w-[40vw]">
              <input
                type="text"
                placeholder="Buscar por empresa o propietario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-full px-3 py-1 pl-8 sm:pl-10 w-full bg-[#e1e4c5] text-black focus:outline-none text-sm sm:text-base"
              />
              <img
                src="/icons/lupa.png"
                alt="Buscar"
                className="absolute left-[0.8vw] top-1/2 -translate-y-1/2 w-[1vw] h-[1vw]"
              />
            </div>
            <div className="flex gap-3 sm:gap-4 items-center mt-2 sm:mt-0">
              <img
                src="/icons/medalla.png"
                alt="Medalla"
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                onClick={togglePremios}
              />
              {mostrarComboPremios && (
                <select
                  onChange={filtrarPorPremio}
                  value={selectedPremio}
                  className="bg-[#e1e4c5] text-black text-sm px-2 py-2 rounded text-xs"
                >
                  <option value="">Todos los premios</option>
                  {premios.map(premio => (
                    <option key={premio.id_premio} value={premio.id_premio}>
                      {premio.descripcion}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex items-center">
                <img src="/icons/plus.png" alt="Plus" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-[#e1e4c5] text-sm sm:text-base">50</span>
              </div>
              <img src="/icons/cerebro.png" alt="Cerebro" className="w-4 h-4 sm:w-5 sm:h-5" />
              <img src="/icons/mapa.png" alt="Mapa" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* BOTÓN DE NUEVA EMPRESA */}
        <div className="flex justify-center py-4">
          <button
            className="bg-white text-black font-bold rounded-full px-4 py-2 border border-black hover:bg-gray-200 transition"
            onClick={() => setShowRegistro(true)}
          >
            + Nueva Empresa
          </button>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          {empresas
            .filter(empresa => {
              const nombreEmpresa = empresa.nombre_comercial?.toLowerCase() || '';
              const nombrePropietario = empresa.nombre_propietario?.toLowerCase() || '';
              const search = searchTerm.toLowerCase();
              return (
                nombreEmpresa.includes(search) ||
                nombrePropietario.includes(search)
              );
            })
            .map((empresa, index) => (
              <div
                key={empresa.id_empresa || index}
                className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-black shadow-md flex flex-col justify-center items-start"
              >
                <span className="text-[#2b2b2b] font-bold text-lg sm:text-xl">
                  {empresa.nombre_comercial || 'Sin nombre comercial'}
                </span>
                <span className="text-gray-600 text-sm sm:text-base mt-1">
                  {empresa.denominacion_social || 'Sin razón social'}
                </span>
                <em className="text-gray-500 text-sm italic mt-1">
                  Propietario: {empresa.nombre_propietario || 'Sin propietario'}
                </em>
              </div>
            ))}
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
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-[900px] w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setShowRegistro(false)}
              className="absolute top-3 right-4 text-black hover:text-red-600 text-xl font-bold"
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
