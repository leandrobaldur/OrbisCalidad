import React, { useEffect, useState } from 'react';
import './empresasPanel.css';

const EmpresasPanel = () => {
  const [empresas, setEmpresas] = useState([]);
  const [imagenLateral, setImagenLateral] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  // Datos estáticos simulados
  useEffect(() => {
    const empresasFake = [
      {
        nombre: 'Empresa Demo',
        descripcion: 'Empresa de ejemplo para pruebas',
        imagen: 'https://via.placeholder.com/80x80?text=Logo',
        infoAdicional: 'Esta empresa se dedica a servicios de desarrollo web, consultoría y más.'
      },
      {
        nombre: 'Otra Empresa',
        descripcion: 'Otra empresa de prueba',
        imagen: 'https://via.placeholder.com/80x80?text=Logo2',
        infoAdicional: 'Empresa enfocada en soluciones tecnológicas para la industria alimentaria.'
      }
    ];
    setEmpresas(empresasFake);
    setImagenLateral('https://via.placeholder.com/300x300?text=Imagen+Lateral');
  }, []);

  const abrirModal = (empresa) => {
    setEmpresaSeleccionada(empresa);
  };

  const cerrarModal = () => {
    setEmpresaSeleccionada(null);
  };

  return (
    <div className="empresas-panel-container">
      {/* Parte izquierda: imagen lateral */}
      <div className="imagen-lateral">
        {imagenLateral && <img src={imagenLateral} alt="Imagen lateral" />}
      </div>

      {/* Parte derecha: lista de empresas */}
      <div className="empresas-panel">
        <h2 className="empresas-titulo">Empresas</h2>
        <div className="empresas-grid">
          {empresas.map((empresa, index) => (
            <div
              key={index}
              className="empresa-card"
              onClick={() => abrirModal(empresa)}
            >
              <img src={empresa.imagen} alt={empresa.nombre} className="empresa-imagen" />
              <h3 className="empresa-nombre">{empresa.nombre}</h3>
              <p className="empresa-descripcion">{empresa.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {empresaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarModal}>X</button>
            <img src={empresaSeleccionada.imagen} alt={empresaSeleccionada.nombre} className="modal-img" />
            <h2>{empresaSeleccionada.nombre}</h2>
            <p><strong>Descripción:</strong> {empresaSeleccionada.descripcion}</p>
            <p><strong>Información adicional:</strong> {empresaSeleccionada.infoAdicional}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpresasPanel;
