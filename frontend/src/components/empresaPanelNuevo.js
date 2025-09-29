import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Mantenemos AnimatePresence para el modal importado
import MapaBolivia from './mapaBolivia';
import EmpresaBuscador from './empresaBuscador';
import EmpresaLista from './empresaLista';
import EmpresaModal from './empresaModal'; // Importamos el modal refactorizado

// --- Datos Estáticos (con Hitos actualizados) ---
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
    hitos: [
      { nombre: 'Lanzamiento de Plataforma', fecha: '2015' },
      { nombre: 'Alianza Estratégica Regional', fecha: '2020' },
      { nombre: 'Certificación ISO 27001', fecha: '2023' },
    ],
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
    hitos: [
      { nombre: 'Primera Exportación', fecha: '1980' },
      { nombre: 'Adopción de Tecnologías Sostenibles', fecha: '2018' },
    ],
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
    hitos: [
      { nombre: 'Proyecto de Infraestructura Nacional', fecha: '2005' },
    ],
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
    hitos: [
      { nombre: 'Ampliación de Flota Norte', fecha: '2000' },
      { nombre: 'Apertura de Centro en Tarija', fecha: '2008' },
      { nombre: 'Digitalización de Servicios', fecha: '2015' },
      { nombre: 'Socio Logístico Principal', fecha: '2022' },
    ],
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
  const [vistaGrid, setVistaGrid] = useState(false); // false = Vertical/Lista, true = Cuadrícula/Grid

  const mapEmpresaResumen = (e) => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad || '',
    slogan: e.vision || '',
    descripcion: e.descripcion || 'Descripción no disponible.',
    departamento: e.sedes?.[0]?.departamento || '',
    imagen: e.urlLogo ? (e.urlLogo.startsWith('http') ? e.urlLogo : `${CLOUDINARY_BASE_URL}/${e.urlLogo}`) : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
    hitos: e.hitos || [], 
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

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const toggleVista = () => {
    setVistaGrid(prev => !prev);
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6 h-screen overflow-hidden">
      {/* Columna Izquierda: Mapa (Layout y altura reducida) */}
      <div className="w-full md:w-1/2 lg:w-1/2 bg-gray-100 rounded-lg p-4 shadow-md flex-shrink-0 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 flex-shrink-0">Empresas por Departamento</h2>

        {/* CONTENEDOR DEL MAPA */}
        <div className="w-full h-[68%] flex-shrink-0">
          <MapaBolivia
            onDepartamentoClick={handleDepartamentoClick}
            empresas={fullEmpresas}
          />
        </div>

        {/* ESPACIO DE RELLENO */}
        <div className="flex-grow">
          {/* Información adicional o vacío */}
        </div>
      </div>

      {/* Columna Derecha: Buscador y Empresas */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 flex-grow flex flex-col h-full z-0">
        {/* Modal de la empresa */}
        <AnimatePresence>
          {showModal && (
            // 💡 Llamada al componente importado
            <EmpresaModal empresa={selectedEmpresa} onClose={handleCloseModal} />
          )}
        </AnimatePresence>

        {/* BUSCADOR */}
        <EmpresaBuscador
          busqueda={busqueda}
          onBusquedaChange={handleBusquedaChange}
          vistaGrid={vistaGrid}
          onVistaToggle={toggleVista}
        />

        {/* LISTA DE EMPRESAS */}
        <EmpresaLista
          empresas={empresas}
          loading={loading}
          vistaGrid={vistaGrid}
          onCardClick={handleCardClick}
        />

      </div>
    </div>
  );
};

export default EmpresasPanel;