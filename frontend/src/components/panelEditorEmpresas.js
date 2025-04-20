import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmpresasPanel = () => {
  const [empresas, setEmpresas] = useState([]);
  const [imagenLateral, setImagenLateral] = useState('');
  const [ordenAntigüedad, setOrdenAntigüedad] = useState('desc');
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/empresas')
      .then(res => setEmpresas(res.data))
      .catch(err => console.error('Error al obtener empresas:', err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0000] p-[2.5vw] flex flex-col items-center">
      <div className="bg-[#202020] w-full max-w-[90vw] min-h-[75vh] rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#2b2b2b] px-[2vw] py-[3vh] flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#F9F9FA] text-[1rem] sm:text-[1.2rem] w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            EMPRESAS
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[1.5vw] w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-[1.3vw] h-[1.3vw] hidden sm:block" />
            <div className="relative w-full max-w-[40vw]">
              <input
                type="text"
                placeholder="Buscar..."
                className="rounded-full px-[1vw] py-[0.5vw] pl-[2.5vw] w-full bg-[#FCFCFD] text-black focus:outline-none text-[0.9rem]"
              />
              <img
                src="/icons/lupa.png"
                alt="Buscar"
                className="absolute left-[0.8vw] top-1/2 -translate-y-1/2 w-[1vw] h-[1vw]"
              />
            </div>
            <div className="flex gap-[1vw] items-center mt-2 sm:mt-0">
              <img src="/icons/medalla.png" alt="Medalla" className="w-[2.5vw] h-[2.5vw]" />
              <img src="/icons/plus.png" alt="Plus" className="w-[2.5vw] h-[2.5vw]" />
              <img src="/icons/cerebro.png" alt="Cerebro" className="w-[2.5vw] h-[2.5vw]" />
              <img src="/icons/mapa.png" alt="Mapa" className="w-[2.5vw] h-[2.5vw]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1.9vw] px-[2vw] py-[2vw]">
          {empresas.map((empresa, index) => (
            <div
  key={empresa.id_empresa || index}
  className="bg-white rounded-xl min-h-[15vh] min-w-[18vw] text-black shadow-md flex flex-col justify-center"
  style={{ paddingLeft: '40px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px' }}
>
  <span
    className="text-[#2b2b2b] font-bold text-[1.2rem] sm:text-[1.5rem]"
    style={{ display: 'block', marginBottom: '0.5rem' }}
  >
    {empresa.denominacion_social || 'Sin nombre comercial'}
  </span>
  <span
    className="text-gray-600 text-sm sm:text-base"
    style={{ display: 'block' }}
  >
    {empresa.id_empresa || 'Sin razón social'}
  </span>
</div>
  
          


          


          
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpresasPanel;
