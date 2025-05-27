import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import './empresasPanel.css';

const EmpresasPanel = () => {
  // Estados para datos
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAntiguedad, setOrdenAntiguedad] = useState('asc');
  const [filtroActivo, setFiltroActivo] = useState(null); // '50años'|'premio'|'rubro'|'departamento'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empresasAgrupadas, setEmpresasAgrupadas] = useState({});
  const [loading, setLoading] = useState(true);

  // Placeholder lateral
  const imagenLateral = 'https://via.placeholder.com/150x150.png?text=Lateral';

  // Base URL para Cloudinary
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  // Mapear respuesta del API
  const mapEmpresaResumen = e => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad,
    descripcion_actividad: e.descripcion_actividad,
    slogan: e.vision,
    descripcion: e.descripcion,
    fecha_fundacion: e.fecha_fundacion,
    fundacion: new Date(e.fecha_fundacion).getFullYear(),
    sede: e.sedes?.[0]?.ciudad,
    departamento: e.sedes?.[0]?.departamento,
    empleados: e.nombre_tamanio,
    sitioWeb: e.direccion_web,
    imagen: e.urlLogo ? 
      (e.urlLogo.startsWith('http') ? e.urlLogo : `${CLOUDINARY_BASE_URL}/${e.urlLogo}`) 
      : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
    tienePremios: e.premios?.length > 0,
    rubros: e.rubros || [],
    operacionesInternacionales: e.operaciones_internacionales || [],
    familia: e.familia || [],
    premios: e.premios || []
  });

  // Fetch inicial
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/empresas/resumen');
        const mapped = data.map(mapEmpresaResumen);
        setFullEmpresas(mapped);
        setEmpresas(mapped);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar empresas:', error);
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  // Filtrar y ordenar
  useEffect(() => {
    let lista = [...fullEmpresas];
    const term = busqueda.trim().toLowerCase();

    // Búsqueda
    if (term) {
      lista = lista.filter(e =>
        e.nombre.toLowerCase().includes(term) || 
        (e.rubro && e.rubro.toLowerCase().includes(term)) ||
        (e.departamento && e.departamento.toLowerCase().includes(term))
      );
    }

    // Orden por antigüedad
    lista.sort((a, b) => {
      const dateA = new Date(a.fecha_fundacion);
      const dateB = new Date(b.fecha_fundacion);
      return ordenAntiguedad === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, ordenAntiguedad]);

  // Manejar filtros
  const aplicarFiltro = (tipoFiltro) => {
    if (filtroActivo === tipoFiltro) {
      // Si el filtro ya está activo, lo desactivamos
      setEmpresas(fullEmpresas);
      setEmpresasAgrupadas({});
      setFiltroActivo(null);
      return;
    }

    setFiltroActivo(tipoFiltro);
    
    if (tipoFiltro === '50años') {
      const añoActual = new Date().getFullYear();
      const empresas50 = fullEmpresas.filter(e => añoActual - e.fundacion > 50);
      const otrasEmpresas = fullEmpresas.filter(e => añoActual - e.fundacion <= 50);
      
      setEmpresasAgrupadas({
        'Empresas con más de 50 años': empresas50,
        'Otras empresas': otrasEmpresas
      });
    } 
    else if (tipoFiltro === 'premio') {
      const conPremios = fullEmpresas.filter(e => e.tienePremios);
      const sinPremios = fullEmpresas.filter(e => !e.tienePremios);
      
      setEmpresasAgrupadas({
        'Empresas con premios': conPremios,
        'Empresas sin premios': sinPremios
      });
    } 
    else if (tipoFiltro === 'rubro') {
      const agrupadasPorRubro = fullEmpresas.reduce((acc, empresa) => {
        const rubro = empresa.rubro || 'Sin rubro';
        if (!acc[rubro]) {
          acc[rubro] = [];
        }
        acc[rubro].push(empresa);
        return acc;
      }, {});
      
      setEmpresasAgrupadas(agrupadasPorRubro);
    } 
    else if (tipoFiltro === 'departamento') {
      const agrupadasPorDepto = fullEmpresas.reduce((acc, empresa) => {
        const depto = empresa.departamento || 'Sin departamento';
        if (!acc[depto]) {
          acc[depto] = [];
        }
        acc[depto].push(empresa);
        return acc;
      }, {});
      
      setEmpresasAgrupadas(agrupadasPorDepto);
    }
  };

  // Abrir modal con detalles
  const openModal = async (empresa) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/empresa/${empresa.id}`);
      setSelectedEmpresa({
        nombre: data.nombre_comercial,
        slogan: data.vision,
        descripcion: data.descripcion,
        rubro: data.nombre_actividad,
        descripcion_actividad: data.descripcion_actividad,
        fundacion: new Date(data.fecha_fundacion).getFullYear(),
        sede: data.sedes?.[0]?.ciudad,
        departamento: data.sedes?.[0]?.departamento,
        empleados: data.nombre_tamanio,
        sitioWeb: data.direccion_web,
        imagen: data.urlLogo || 'https://via.placeholder.com/300.png?text=Sin+Imagen',
        premios: data.premios || [],
        rubros: data.rubros || [],
        operacionesInternacionales: data.operaciones_internacionales || [],
        familia: data.familia || []
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de la empresa:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

  const visitarSitio = () => {
    if (!selectedEmpresa.sitioWeb) return;
    const url = selectedEmpresa.sitioWeb.startsWith('http')
      ? selectedEmpresa.sitioWeb
      : `https://${selectedEmpresa.sitioWeb}`;
    window.open(url, '_blank');
  };

  const contactarEmpresa = () => {
    window.location.href = `mailto:info@desconocido.com`;
  };

  // Renderizar empresas agrupadas o normales
  const renderEmpresas = () => {
    if (filtroActivo && Object.keys(empresasAgrupadas).length > 0) {
      return Object.entries(empresasAgrupadas).map(([grupo, empresasGrupo]) => (
        empresasGrupo.length > 0 && (
          <React.Fragment key={grupo}>
            <div className="grupo-separador">
              <h3>----- {grupo} -----</h3>
            </div>
            {empresasGrupo.map((e, i) => (
              <motion.div
                key={e.id}
                className="empresa-card"
                onClick={() => openModal(e)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="empresa-img-contenedor">
                  <img src={e.imagen} alt={e.nombre} />
                  <div className="empresa-nombre-default">{e.nombre}</div>
                  <div className="empresa-overlay">
                    <div className="nombre">{e.nombre}</div>
                    <div className="rubro">{e.rubro}</div>
                    <div className="slogan">{e.slogan}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        )
      ));
    }

    return empresas.map((e, i) => (
      <motion.div
        key={e.id}
        className="empresa-card"
        onClick={() => openModal(e)}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
      >
        <div className="empresa-img-contenedor">
          <img src={e.imagen} alt={e.nombre} />
          <div className="empresa-nombre-default">{e.nombre}</div>
          <div className="empresa-overlay">
            <div className="nombre">{e.nombre}</div>
            <div className="rubro">{e.rubro}</div>
            <div className="slogan">{e.slogan}</div>
          </div>
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return <div className="cargando">Cargando empresas...</div>;
  }

  return (
    <motion.div className="empresas-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* BARRA SUPERIOR */}
      <div className="barra-superior">
        <button
          className={`boton-antiguedad ${ordenAntiguedad}`}
          onClick={() => setOrdenAntiguedad(prev => prev === 'asc' ? 'desc' : 'asc')}
          title={`Ordenar por antigüedad (${ordenAntiguedad === 'asc' ? 'más antiguas primero' : 'más recientes primero'})`}
        >
          {ordenAntiguedad === 'asc' ? 'Más antiguas ↑' : 'Más recientes ↓'}
        </button>

        <div className="barra-centro">
          <input
            type="text"
            placeholder="Buscar empresa..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <span className="icono-busqueda">🔍</span>
        </div>
        <div className="barra-derecha">
          <button 
            className={`boton-icono ${filtroActivo==='50años'?'activo':''}`} 
            onClick={() => aplicarFiltro('50años')}
            title="Filtrar por antigüedad (>50 años)"
          >
            <img src="media/busqueda/plus.png" alt=">50 años" />
            <span>+50 años</span>
          </button>
          <button 
            className={`boton-icono ${filtroActivo==='premio'?'activo':''}`} 
            onClick={() => aplicarFiltro('premio')}
            title="Filtrar por premios"
          >
            <img src="media/busqueda/medalla.png" alt="premio" />
            <span>Premios</span>
          </button>
          <button 
            className={`boton-icono ${filtroActivo==='rubro'?'activo':''}`} 
            onClick={() => aplicarFiltro('rubro')}
            title="Filtrar por rubros"
          >
            <img src="media/busqueda/cerebro.png" alt="rubro" />
            <span>Rubros</span>
          </button>
          <button 
            className={`boton-icono ${filtroActivo==='departamento'?'activo':''}`} 
            onClick={() => aplicarFiltro('departamento')}
            title="Filtrar por departamentos"
          >
            <img src="media/busqueda/mapa.png" alt="departamento" />
            <span>Deptos.</span>
          </button>
        </div>
      </div>

      {/* PANEL PRINCIPAL */}
      <div className="empresas-panel-container">
        <div className="imagen-lateral">
          <img src={imagenLateral} alt="Imagen lateral" />
        </div>
        <div className="empresas-panel">
          <div className="empresas-grid">
            {renderEmpresas()}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && selectedEmpresa && (
          <motion.div className="modal-overlay" onClick={closeModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" onClick={e => e.stopPropagation()} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="modal-header">
                <h2>{selectedEmpresa.nombre}</h2>
                <button className="close-modal" onClick={closeModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-imagen">
                  <img src={selectedEmpresa.imagen} alt={selectedEmpresa.nombre} />
                </div>
                <div className="modal-info">
                  <h3>{selectedEmpresa.slogan}</h3>
                  <p className="descripcion">{selectedEmpresa.descripcion}</p>
                  <div className="info-detalle">
                    <p><strong>Rubro:</strong> {selectedEmpresa.rubro}</p>
                    {selectedEmpresa.descripcion_actividad && <p><strong>Actividad:</strong> {selectedEmpresa.descripcion_actividad}</p>}
                    <p><strong>Fundación:</strong> {selectedEmpresa.fundacion}</p>
                    {selectedEmpresa.sede && <p><strong>Sede:</strong> {selectedEmpresa.sede}</p>}
                    {selectedEmpresa.departamento && <p><strong>Departamento:</strong> {selectedEmpresa.departamento}</p>}
                    {selectedEmpresa.empleados && <p><strong>Tamaño:</strong> {selectedEmpresa.empleados}</p>}
                    {selectedEmpresa.sitioWeb && <p><strong>Sitio web:</strong> {selectedEmpresa.sitioWeb}</p>}
                    
                    {selectedEmpresa.rubros?.length > 0 && (
                      <p><strong>Rubros adicionales:</strong> {selectedEmpresa.rubros.join(', ')}</p>
                    )}
                    
                    {selectedEmpresa.operacionesInternacionales?.length > 0 && (
                      <p><strong>Operaciones internacionales:</strong> {selectedEmpresa.operacionesInternacionales.join(', ')}</p>
                    )}
                    
                    {selectedEmpresa.familia?.length > 0 && (
                      <p><strong>Familiar:</strong> Sí ({selectedEmpresa.familia.length} registros)</p>
                    )}
                    
                    {selectedEmpresa.premios?.length > 0 && (
                      <div className="premios-section">
                        <strong>Premios:</strong>
                        <ul>
                          {selectedEmpresa.premios.map((premio, idx) => (
                            <li key={idx}>
                              {premio.entidad_otorgadora} ({premio.anio}) - {premio.descripcion} ({premio.tipo})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedEmpresa.sitioWeb && (
                  <button className="btn-visitar" onClick={visitarSitio}>
                    Visitar sitio web
                  </button>
                )}
                <button className="btn-contactar" onClick={contactarEmpresa}>Contactar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmpresasPanel;