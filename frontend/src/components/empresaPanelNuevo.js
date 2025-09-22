import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MapaBolivia from './mapaBolivia';

// --- Datos Estáticos (sin cambios) ---
const mockEmpresasResumen = [
  {
    id_empresa: 1,
    nombre_comercial: 'Innovatech Solutions',
    nombre_actividad: 'Tecnología',
    vision: 'Líderes en innovación digital.',
    fecha_fundacion: '1995-01-15T00:00:00.000Z',
    sedes: [{ ciudad: 'La Paz', departamento: 'La Paz' }],
    descripcion: 'Empresa dedicada a la creación de software innovador y soluciones tecnológicas.',
    urlLogo: 'https://res.cloudinary.com/diswqpy8v/image/upload/v1692290483/logos/innovatech_logo.png',
  },
  {
    id_empresa: 2,
    nombre_comercial: 'Agro Futuro',
    nombre_actividad: 'Agricultura',
    vision: 'Alimentando al mundo de forma sostenible.',
    fecha_fundacion: '1970-05-20T00:00:00.000Z',
    sedes: [{ ciudad: 'Santa Cruz', departamento: 'Santa Cruz' }],
    descripcion: 'Especialistas en la producción y exportación de productos agrícolas orgánicos y sostenibles.',
    urlLogo: 'https://res.cloudinary.com/diswqpy8v/image/upload/v1692290547/logos/agro_futuro.png',
  },
  {
    id_empresa: 3,
    nombre_comercial: 'Constructora Atlas',
    nombre_actividad: 'Construcción',
    vision: 'Construyendo el futuro, cimiento a cimiento.',
    fecha_fundacion: '1965-03-10T00:00:00.000Z',
    sedes: [{ ciudad: 'Cochabamba', departamento: 'Cochabamba' }],
    descripcion: 'Compañía con una amplia experiencia en la construcción de infraestructuras civiles y residenciales a gran escala.',
    urlLogo: 'https://res.cloudinary.com/diswqpy8v/image/upload/v1692290610/logos/atlas_logo.jpg',
  },
  {
    id_empresa: 4,
    nombre_comercial: 'Farmacias Salvi',
    nombre_actividad: 'Salud',
    vision: 'Cuidando la salud de las familias bolivianas.',
    fecha_fundacion: '1985-08-01T00:00:00.000Z',
    sedes: [{ ciudad: 'Sucre', departamento: 'Chuquisaca' }],
    descripcion: 'Cadena de farmacias con cobertura nacional, ofreciendo productos farmacéuticos y de cuidado personal de calidad.',
    urlLogo: '',
  },
  {
    id_empresa: 5,
    nombre_comercial: 'Exportadora Andina',
    nombre_actividad: 'Comercio Exterior',
    vision: 'Conectando lo andino con el mundo.',
    fecha_fundacion: '2001-02-25T00:00:00.000Z',
    sedes: [{ ciudad: 'El Alto', departamento: 'La Paz' }],
    descripcion: 'Empresa dedicada a la exportación de artesanías y productos textiles andinos a mercados internacionales.',
    urlLogo: '',
  },
  {
    id_empresa: 6,
    nombre_comercial: 'Logística Total S.R.L.',
    nombre_actividad: 'Servicios de Logística',
    vision: 'Soluciones logísticas eficientes y seguras.',
    fecha_fundacion: '1998-11-12T00:00:00.000Z',
    sedes: [{ ciudad: 'Santa Cruz', departamento: 'Santa Cruz' }],
    descripcion: 'Líderes en el sector de transporte y logística, con una amplia red de distribución nacional e internacional.',
    urlLogo: 'https://res.cloudinary.com/diswqpy8v/image/upload/v1692290650/logos/logistica_total.png',
  },
  {
    id_empresa: 7,
    nombre_comercial: 'Textiles del Sur',
    nombre_actividad: 'Manufactura',
    vision: 'Tradición y calidad en cada hilo.',
    fecha_fundacion: '1980-09-05T00:00:00.000Z',
    sedes: [{ ciudad: 'Tarija', departamento: 'Tarija' }],
    descripcion: 'Empresa familiar con una larga tradición en la fabricación de textiles de alta calidad.',
    urlLogo: '',
  },
  {
    id_empresa: 8,
    nombre_comercial: 'Turismo Sajama',
    nombre_actividad: 'Turismo',
    vision: 'Explorando las maravillas de Bolivia.',
    fecha_fundacion: '2010-06-18T00:00:00.000Z',
    sedes: [{ ciudad: 'Oruro', departamento: 'Oruro' }],
    descripcion: 'Agencia de viajes especializada en tours y expediciones por las maravillas naturales de Bolivia.',
    urlLogo: '',
  },
  {
    id_empresa: 9,
    nombre_comercial: 'Minería del Oro',
    nombre_actividad: 'Minería',
    vision: 'Riqueza y sostenibilidad.',
    fecha_fundacion: '1955-02-28T00:00:00.000Z',
    sedes: [{ ciudad: 'Potosí', departamento: 'Potosí' }],
    descripcion: 'Compañía minera dedicada a la extracción responsable de minerales, con un enfoque en la seguridad y el medio ambiente.',
    urlLogo: '',
  },
  {
    id_empresa: 10,
    nombre_comercial: 'Petróleo del Chaco',
    nombre_actividad: 'Energía',
    vision: 'Innovación en energía.',
    fecha_fundacion: '1999-04-22T00:00:00.000Z',
    sedes: [{ ciudad: 'Yacuiba', departamento: 'Tarija' }],
    descripcion: 'Empresa petrolera que opera en la región del Chaco, comprometida con la producción de energía y el desarrollo local.',
    urlLogo: '',
  },
  {
    id_empresa: 11,
    nombre_comercial: 'Servicios de Yacuses',
    nombre_actividad: 'Consultoría',
    vision: 'Asesoría experta.',
    fecha_fundacion: '2005-07-10T00:00:00.000Z',
    sedes: [{ ciudad: 'Trinidad', departamento: 'Beni' }],
    descripcion: 'Firma de consultoría que ofrece servicios de asesoramiento estratégico a empresas de diversos sectores.',
    urlLogo: '',
  },
  {
    id_empresa: 12,
    nombre_comercial: 'Transporte Riberalta',
    nombre_actividad: 'Logística',
    vision: 'Conectando el norte con el sur.',
    fecha_fundacion: '2008-01-30T00:00:00.000Z',
    sedes: [{ ciudad: 'Riberalta', departamento: 'Pando' }],
    descripcion: 'Compañía de transporte fluvial y terrestre que une las regiones del norte de Bolivia con el resto del país.',
    urlLogo: '',
  },
];
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

const EmpresasPanel = () => {
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [departamentoActivo, setDepartamentoActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  const mapEmpresaResumen = (e) => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad || '',
    slogan: e.vision || '',
    descripcion: e.descripcion || 'Descripción no disponible.',
    departamento: e.sedes?.[0]?.departamento || '',
    imagen: e.urlLogo ? (e.urlLogo.startsWith('http') ? e.urlLogo : `${CLOUDINARY_BASE_URL}/${e.urlLogo}`) : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
  });

  useEffect(() => {
    const mapped = mockEmpresasResumen.map(mapEmpresaResumen);
    setFullEmpresas(mapped);
    setEmpresas(mapped);
    setLoading(false);
  }, []);

  const handleDepartamentoClick = (departamento) => {
    if (departamentoActivo === departamento) {
      setDepartamentoActivo(null);
      setBusqueda('');
    } else {
      setDepartamentoActivo(departamento);
      setBusqueda('');
    }
  };

  useEffect(() => {
    let lista = [...fullEmpresas];
    const term = busqueda.trim().toLowerCase();

    if (term) {
      lista = lista.filter((e) =>
        (e.nombre || '').toLowerCase().includes(term) ||
        (e.rubro || '').toLowerCase().includes(term) ||
        (e.departamento || '').toLowerCase().includes(term)
      );
    } 
    else if (departamentoActivo) {
      lista = lista.filter(e => e.departamento === departamentoActivo);
    }
    
    setEmpresas(lista);
  }, [fullEmpresas, busqueda, departamentoActivo]);

  const handleCardClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

  const EmpresaCard = ({ empresa, onClick }) => (
    <motion.div
      className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(empresa)}
    >
      <div className="relative h-32 w-full flex-shrink-0">
        <img
          src={empresa.imagen}
          alt={`Logo de ${empresa.nombre}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 className="text-white text-lg font-bold text-center p-2">
            {empresa.nombre}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">{empresa.rubro}</p>
        <p className="text-sm text-gray-500">{empresa.departamento}</p>
      </div>
    </motion.div>
  );

  const EmpresaModal = ({ empresa, onClose }) => {
    if (!empresa) return null;
    return (
      <motion.div
        className="absolute inset-0 bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-center overflow-y-auto z-10" // <-- z-10 añadido
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{empresa.nombre}</h2>
          <p className="text-lg text-gray-600">{empresa.rubro}</p>
          <p className="text-sm text-gray-500 italic">"{empresa.slogan}"</p>
        </div>
        <div className="w-full flex-shrink-0 mb-4 rounded-lg overflow-hidden">
          <img
            src={empresa.imagen}
            alt={`Logo de ${empresa.nombre}`}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="w-full text-gray-700 text-center">
          <p className="text-base mb-2">{empresa.descripcion}</p>
          <p className="text-sm">
            <span className="font-semibold">Departamento:</span> {empresa.departamento}
          </p>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="p-4 flex flex-col md:flex-row gap-6 h-screen overflow-hidden">
      {/* Columna Izquierda: Mapa */}
      <div className="w-full md:w-1/2 lg:w-1/2 bg-gray-100 rounded-lg p-4 shadow-md flex-shrink-0 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Empresas por Departamento</h2>
        <div className="flex-grow w-full h-full">
          <MapaBolivia
            onDepartamentoClick={handleDepartamentoClick}
            empresas={fullEmpresas}
          />
        </div>
      </div>

      {/* Columna Derecha: Buscador y Empresas */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 flex-grow flex flex-col h-full z-0">
        {/* Modal de la empresa - se renderiza por encima de todo */}
        <AnimatePresence>
          {showModal && (
            <EmpresaModal empresa={selectedEmpresa} onClose={handleCloseModal} />
          )}
        </AnimatePresence>

        {/* Barra de búsqueda */}
        <div className="mb-4 flex-shrink-0">
          <input
            type="text"
            placeholder="Buscar por nombre, rubro o departamento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Contenedor de las empresas con scroll */}
        <div className="flex-grow overflow-y-auto pr-2 z-0"> 
          {loading ? (
            <div className="text-center p-8">Cargando empresas...</div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {empresas.length > 0 ? (
                  empresas.map((e) => (
                    <EmpresaCard key={e.id} empresa={e} onClick={handleCardClick} />
                  ))
                ) : (
                  <motion.div
                    className="p-8 text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No se encontraron empresas para esta búsqueda o departamento.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpresasPanel;