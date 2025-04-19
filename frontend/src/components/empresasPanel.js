import React, { useEffect, useState } from 'react';
import './empresasPanel.css';

const EmpresasPanel = () => {
  const [empresas, setEmpresas] = useState([]);
  const [imagenLateral, setImagenLateral] = useState('');
  const [ordenAntigüedad, setOrdenAntigüedad] = useState('desc'); // 'asc' o 'desc'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Datos estáticos de empresas más realistas
    const empresasFake = [
      {
        nombre: 'ENTEL',
        imagen: 'https://via.placeholder.com/300x150?text=ENTEL',
        rubro: 'Telecomunicaciones',
        slogan: 'Conectando personas',
        descripcion: 'ENTEL es una empresa líder en telecomunicaciones en Chile. Ofrece servicios de telefonía móvil, internet y televisión para hogares y empresas.',
        fundacion: 1964,
        sede: 'Santiago, Chile',
        empleados: '4.500+',
        sitioWeb: 'www.entel.cl'
      },
      {
        nombre: 'BANCO ESTADO',
        imagen: 'https://via.placeholder.com/300x150?text=BANCO+ESTADO',
        rubro: 'Servicios financieros',
        slogan: 'Para todos los chilenos',
        descripcion: 'BancoEstado es el único banco público de Chile. Ofrece servicios financieros a todos los chilenos, con énfasis en la inclusión financiera y el apoyo a las pequeñas empresas.',
        fundacion: 1953,
        sede: 'Santiago, Chile',
        empleados: '10.000+',
        sitioWeb: 'www.bancoestado.cl'
      },
      {
        nombre: 'FALABELLA',
        imagen: 'https://via.placeholder.com/300x150?text=FALABELLA',
        rubro: 'Retail',
        slogan: 'Hacemos que tu hogar sea único',
        descripcion: 'Falabella es una de las tiendas por departamentos más grandes de América Latina, con presencia en Chile, Argentina, Perú y Colombia. Ofrece productos de moda, hogar, electrónica y más.',    
        fundacion: 1889,
        sede: 'Santiago, Chile',
        empleados: '95.000+',
        sitioWeb: 'www.falabella.com'
      },
      {
        nombre: 'COPEC',
        imagen: 'https://via.placeholder.com/300x150?text=COPEC',
        rubro: 'Energía',
        slogan: 'La energía que mueve Chile',
        descripcion: 'Copec es la principal distribuidora de combustibles en Chile. También opera en el sector forestal, pesquero y de lubricantes, a través de diversas filiales.',
        fundacion: 1934,
        sede: 'Santiago, Chile',
        empleados: '13.000+',
        sitioWeb: 'www.copec.cl'
      },
    ];
    setEmpresas(empresasFake);
    setImagenLateral('https://via.placeholder.com/150?text=Lateral');
  }, []);

  // Función para manejar el click en el botón de antigüedad
  const handleAntigüedadClick = () => {
    // Cambia el orden ascendente/descendente
    setOrdenAntigüedad(ordenAntigüedad === 'asc' ? 'desc' : 'asc');

    // Aquí implementarías la lógica de ordenación
    console.log(`Ordenando por antigüedad: ${ordenAntigüedad === 'asc' ? 'descendente' : 'ascendente'}`); 
  };

  // Funciones para manejar los clicks en los botones de iconos
  const handleIconClick = (iconNumber) => {
    console.log(`Icono ${iconNumber} clickeado`);
    // Aquí puedes agregar la lógica específica para cada icono
  };

  // Función para manejar el click en una tarjeta de empresa
  const handleEmpresaClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

  return (
    <div className="empresas-wrapper">
      {/* Barra superior */}
      <div className="barra-superior">
        <button
          className="barra-izquierda boton-antiguedad"
          onClick={handleAntigüedadClick}
        >
          ANTIGÜEDAD <span>{ordenAntigüedad === 'asc' ? '↑' : '↓'}</span>
        </button>
        <div className="barra-centro">
          <input type="text" placeholder="Buscar empresa..." />
          <span className="icono-busqueda">🔍</span>
        </div>
        <div className="barra-derecha">
          <button className="boton-icono" onClick={() => handleIconClick(1)}>
            <img src="/iconos/icon1.png" alt="icono1" />
          </button>
          <button className="boton-icono" onClick={() => handleIconClick(2)}>
            <img src="/iconos/icon2.png" alt="icono2" />
          </button>
          <button className="boton-icono" onClick={() => handleIconClick(3)}>
            <img src="/iconos/icon3.png" alt="icono3" />
          </button>
          <button className="boton-icono" onClick={() => handleIconClick(4)}>
            <img src="/iconos/icon4.png" alt="icono4" />
          </button>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="empresas-panel-container">
        <div className="imagen-lateral">
          <img src={imagenLateral} alt="Imagen lateral" />
        </div>

        <div className="empresas-panel">
          <div className="empresas-grid">
            {empresas.map((empresa, i) => (
              <div
                className="empresa-card"
                key={i}
                onClick={() => handleEmpresaClick(empresa)}
              >
                <div className="empresa-img-contenedor">
                  {empresa.imagen && (
                    <img src={empresa.imagen} alt={empresa.nombre} />
                  )}
                  {/* Mostrar solo el nombre por defecto */}
                  <div className="empresa-nombre-default">
                    {empresa.nombre}
                  </div>
                  {/* Overlay con detalles que aparece al hacer hover */}
                  <div className="empresa-overlay">
                    <div className="nombre">{empresa.nombre}</div>
                    <div className="rubro">{empresa.rubro}</div>
                    <div className="slogan">{empresa.slogan}</div>
                  </div>
                </div>
                <div className="empresa-info-box" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
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
                  <p><strong>Año de fundación:</strong> {selectedEmpresa.fundacion}</p>
                  <p><strong>Sede principal:</strong> {selectedEmpresa.sede}</p>
                  <p><strong>Número de empleados:</strong> {selectedEmpresa.empleados}</p>
                  <p><strong>Sitio web:</strong> {selectedEmpresa.sitioWeb}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-visitar">Visitar sitio web</button>
              <button className="btn-contactar">Contactar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresasPanel;