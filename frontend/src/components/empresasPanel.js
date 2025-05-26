// 1. IMPORTS (poner al inicio de EmpresasPanel.js)
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import './empresasPanel.css';

// 2. COMPONENTE Y ESTADOS (después de imports)
const EmpresasPanel = () => {
  // Estados para datos
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAntiguedad, setOrdenAntiguedad] = useState('asc');
  const [filtro, setFiltro] = useState(null); // '50años'|'premio'|'internacional'|'familiar'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Placeholder lateral
  const imagenLateral = 'https://via.placeholder.com/150x150.png?text=Lateral';

  // Base URL para Cloudinary
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  // 3. MAPEAR RESPUESTA DEL API (antes de los useEffect)
  const mapEmpresaResumen = e => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad,
    slogan: e.vision,
    descripcion: e.descripcion,
    fundacion: new Date(e.fecha_fundacion).getFullYear(),
    sede: e.sedes?.[0]?.ciudad || '',
    empleados: `${e.items?.length || 0} items`,  // ajustar según tu campo
    sitioWeb: e.direccion_web,
    imagen: e.urlLogo || 'https://via.placeholder.com/300.png?text=Sin+Imagen'
  });

  // 4. FETCH INICIAL (useEffect para /empresas/resumen)
  useEffect(() => {
    axios.get('http://localhost:3000/empresas/resumen')
      .then(({ data }) => {
        const mapped = data.map(mapEmpresaResumen);
        setFullEmpresas(mapped);
        setEmpresas(mapped);
      })
      .catch(console.error);
  }, []);

  // 5. FILTRAR Y ORDENAR (useEffect que depende de fullEmpresas, busqueda, filtro, ordenAntiguedad)
  useEffect(() => {
    let lista = [...fullEmpresas];
    const añoActual = new Date().getFullYear();
    const term = busqueda.trim().toLowerCase();

    // Búsqueda: startsWith
    if (term) {
      lista = lista.filter(e =>
        e.nombre.toLowerCase().startsWith(term)
      );
    }

    // Filtros locales
    if (filtro === '50años') {
      lista = lista.filter(e => añoActual - e.fundacion > 50);
    } else if (filtro === 'internacional') {
      lista = lista.filter(e => e.operacionesInternacionales?.length > 0);
    } else if (filtro === 'familiar') {
      lista = lista.filter(e => e.familia?.length > 0);
    }
    // 'premio' se maneja en handler

    // Orden por antigüedad
    lista.sort((a, b) => {
      const ageA = añoActual - a.fundacion;
      const ageB = añoActual - b.fundacion;
      return ordenAntiguedad === 'asc' ? ageA - ageB : ageB - ageA;
    });

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, filtro, ordenAntiguedad]);

  // 6. HANDLERS
    // Cambia asc <-> desc
  const toggleOrdenAntiguedad = () => {
    setOrdenAntiguedad(prev => prev === 'asc' ? 'desc' : 'asc');
  };


  // Click iconos
  const handleIconClick = type => {
    if (type === 'premio') {
      if (filtro === 'premio') {
        setFiltro(null);
        setEmpresas(fullEmpresas);
      } else {
        axios.get('http://localhost:3000/empresas/premio/1')
          .then(({ data }) => setEmpresas(data.map(mapEmpresaResumen)))
          .catch(console.error);
        setFiltro('premio');
      }
    } else {
      setFiltro(prev => prev === type ? null : type);
    }
  };

  // Abrir modal con detalles
  const openModal = empresa => {
    axios.get(`http://localhost:3000/empresa/${empresa.id}`)
      .then(({ data }) => {
        setSelectedEmpresa({
          nombre: data.nombre_comercial,
          slogan: data.vision,
          descripcion: data.descripcion,
          rubro: data.descripcion_actividad,
          fundacion: new Date(data.fecha_fundacion).getFullYear(),
          sede: data.sedes?.[0]?.ciudad || '',
          empleados: `${data.items?.length || 0} items`,  
          sitioWeb: data.direccion_web,
          imagen: data.urlLogo || 'https://via.placeholder.com/300.png?text=Sin+Imagen'
        });
        setShowModal(true);
      })
      .catch(console.error);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

  const visitarSitio = () => {
    const url = selectedEmpresa.sitioWeb.startsWith('http')
      ? selectedEmpresa.sitioWeb
      : `https://${selectedEmpresa.sitioWeb}`;
    window.open(url, '_blank');
  };

  const contactarEmpresa = () => {
    window.location.href = `mailto:info@desconocido.com`;
  };

  // 7. JSX (return): coloca todo este bloque al final de EmpresasPanel
  return (
    <motion.div className="empresas-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* BARRA SUPERIOR */}
      <div className="barra-superior">
        <button className="boton-antiguedad" onClick={toggleOrdenAntiguedad}>
          ANTIGÜEDAD {ordenAntiguedad === 'asc' ? '↑' : '↓'}
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
          <button className={`boton-icono ${filtro==='50años'?'activo':''}`} onClick={() => handleIconClick('50años')}>
            <img src="media/busqueda/plus.png" alt=">50 años" />
          </button>
          <button className={`boton-icono ${filtro==='premio'?'activo':''}`} onClick={() => handleIconClick('premio')}>
            <img src="media/busqueda/medalla.png" alt="premio" />
          </button>
          <button className={`boton-icono ${filtro==='internacional'?'activo':''}`} onClick={() => handleIconClick('internacional')}>
            <img src="media/busqueda/cerebro.png" alt="internacional" />
          </button>
          <button className={`boton-icono ${filtro==='familiar'?'activo':''}`} onClick={() => handleIconClick('familiar')}>
            <img src="media/busqueda/mapa.png" alt="familiar" />
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
            {empresas.map((e, i) => (
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
                  <img src={e.imagen.startsWith('http') ? e.imagen : `${CLOUDINARY_BASE_URL}/${e.imagen}`} alt={e.nombre} />
                  <div className="empresa-nombre-default">{e.nombre}</div>
                  <div className="empresa-overlay">
                    <div className="nombre">{e.nombre}</div>
                    <div className="rubro">{e.rubro}</div>
                    <div className="slogan">{e.slogan}</div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                    <p><strong>Fundación:</strong> {selectedEmpresa.fundacion}</p>
                    <p><strong>Sede:</strong> {selectedEmpresa.sede}</p>
                    <p><strong>Empleados:</strong> {selectedEmpresa.empleados}</p>
                    <p><strong>Sitio web:</strong> {selectedEmpresa.sitioWeb}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-visitar" onClick={visitarSitio}>Visitar sitio web</button>
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
