import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelEditorEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [premios, setPremios] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedPremio, setSelectedPremio] = useState('');
  const [selectedRubro, setSelectedRubro] = useState('');
  const [selectedDepartamento, setSelectedDepartamento] = useState('');
  const [mostrarComboPremios, setMostrarComboPremios] = useState(false);
  const [mostrarComboRubros, setMostrarComboRubros] = useState(false);
  const [mostrarComboDepartamentos, setMostrarComboDepartamentos] = useState(false);
  const [filtrarAntiguas, setFiltrarAntiguas] = useState(false);

  const cargarEmpresas = () => {
    axios.get(`http://localhost:3000/buscarEmpresas`)
      .then(res => setEmpresas(res.data))
      .catch(err => console.error('Error al buscar empresas:', err));
  };

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const togglePremios = () => {
    if (mostrarComboPremios) {
      setMostrarComboPremios(false);
      setPremios([]);
      setSelectedPremio('');
      cargarEmpresas();
    } else {
      axios.get('http://localhost:3000/premios')
        .then(res => {
          setPremios(res.data);
          setMostrarComboPremios(true);
          setMostrarComboRubros(false);
          setMostrarComboDepartamentos(false);
        })
        .catch(err => console.error('Error al cargar premios:', err));
    }
  };

  const toggleRubros = () => {
    if (mostrarComboRubros) {
      setMostrarComboRubros(false);
      setRubros([]);
      setSelectedRubro('');
      cargarEmpresas();
    } else {
      axios.get('http://localhost:3000/rubros')
        .then(res => {
          setRubros(res.data);
          setMostrarComboRubros(true);
          setMostrarComboPremios(false);
          setMostrarComboDepartamentos(false);
        })
        .catch(err => console.error('Error al cargar rubros:', err));
    }
  };

  const toggleDepartamentos = () => {
    if (mostrarComboDepartamentos) {
      setMostrarComboDepartamentos(false);
      setDepartamentos([]);
      setSelectedDepartamento('');
      cargarEmpresas();
    } else {
      axios.get('http://localhost:3000/departamentos')
        .then(res => {
          setDepartamentos(res.data);
          setMostrarComboDepartamentos(true);
          setMostrarComboPremios(false);
          setMostrarComboRubros(false);
        })
        .catch(err => console.error('Error al cargar departamentos:', err));
    }
  };

  const filtrarPorPremio = (e) => {
    const idPremio = e.target.value;
    setSelectedPremio(idPremio);
    if (idPremio === '') {
      cargarEmpresas();
    } else {
      axios.get(`http://localhost:3000/empresas/premio/${idPremio}`)
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al filtrar empresas por premio:', err));
    }
  };

  const filtrarPorRubro = (e) => {
    const idRubro = e.target.value;
    setSelectedRubro(idRubro);
    if (idRubro === '') {
      cargarEmpresas();
    } else {
      axios.get(`http://localhost:3000/empresas/rubro/${idRubro}`)
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al filtrar empresas por rubro:', err));
    }
  };

  const filtrarPorDepartamento = (e) => {
    const idDepto = e.target.value;
    setSelectedDepartamento(idDepto);
    if (idDepto === '') {
      cargarEmpresas();
    } else {
      axios.get(`http://localhost:3000/empresas/departamento/${idDepto}`)
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al filtrar empresas por departamento:', err));
    }
  };

  const toggleAntiguedad = () => {
    const nuevoEstado = !filtrarAntiguas;
    setFiltrarAntiguas(nuevoEstado);

    if (nuevoEstado) {
      axios.get('http://localhost:3000/empresas/antiguas')
        .then(res => setEmpresas(res.data))
        .catch(err => console.error('Error al filtrar por antigüedad:', err));
    } else {
      cargarEmpresas();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f0df] p-3 sm:p-4 md:p-6 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#9fa56c] font-bold font-mono tracking-wide mb-4 sm:mb-6 md:mb-8">Panel de edición</h1>

      <div className="bg-[#202020] w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#2b2b2b] px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <span className="text-[#e1e4c5] text-base sm:text-lg w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">DATOS</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
            <div className="relative w-full max-w-md">
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
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4" 
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
                <img
                  src="/icons/plus.png"
                  alt="Filtrar por antigüedad"
                  className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 cursor-pointer ${filtrarAntiguas ? 'invert' : ''}`}
                  onClick={toggleAntiguedad}
                  title="Filtrar empresas con más de 10 años"
                />
              </div>
              <img
                src="/icons/cerebro.png"
                alt="Cerebro"
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                onClick={toggleRubros}
              />
              {mostrarComboRubros && (
                <select
                  onChange={filtrarPorRubro}
                  value={selectedRubro}
                  className="bg-[#e1e4c5] text-black text-sm px-2 py-2 rounded text-xs"
                >
                  <option value="">Todos los rubros</option>
                  {rubros.map(rubro => (
                    <option key={rubro.id_rublo} value={rubro.id_rublo}>
                      {rubro.nombre_rubro}
                    </option>
                  ))}
                </select>
              )}
              <img
                src="/icons/mapa.png"
                alt="Departamento"
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                onClick={toggleDepartamentos}
              />
              {mostrarComboDepartamentos && (
                <select
                  onChange={filtrarPorDepartamento}
                  value={selectedDepartamento}
                  className="bg-[#e1e4c5] text-black text-sm px-2 py-2 rounded text-xs"
                >
                  <option value="">Todos los departamentos</option>
                  {departamentos.map(depto => (
                    <option key={depto.id_departamento} value={depto.id_departamento}>
                      {depto.nombre_depto}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex justify-end">
          <button className="bg-[#9fa56c] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#8a944e] transition flex items-center">
            <img src="/icons/plus.png" alt="Añadir" className="w-3 h-3 sm:w-4 sm:h-4 mr-1 invert" />
            <span className="hidden xs:inline">Añadir rubro</span>
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
    </div>
  );
};

export default PanelEditorEmpresas;
