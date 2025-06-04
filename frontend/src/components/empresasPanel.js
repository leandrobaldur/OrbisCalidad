import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import './empresasPanel.css';
import RegistroEmpresa from './registroEmpresa'; // Ajusta la ruta según tu estructura

const EmpresasPanel = ({ loggedInUser }) => {
  // Estados para datos
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ordenAntiguedad, setOrdenAntiguedad] = useState('asc');
  const [filtroActivo, setFiltroActivo] = useState(null); // '50años'|'premio'|'rubro'|'departamento'
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalEditable, setModalEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  // Lista de rubros para mostrar (solo lectura)
  const [rubrosDisponibles, setRubrosDisponibles] = useState([]);

  // Base URL para Cloudinary
  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload';

  // Roles para edición
  const esAdmin = loggedInUser?.id_rol === 1;
  const esColaborador = loggedInUser?.id_rol === 2;
  const puedeEditar = esAdmin || esColaborador;
  const recargarEmpresas = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/empresas/resumen');
      const mapped = data.map(mapEmpresaResumen);
      setFullEmpresas(mapped);
      setEmpresas(mapped);
    } catch (error) {
      console.error('Error recargando empresas:', error);
    }
  };

  // Mapear respuesta del API para resumen
  const mapEmpresaResumen = e => ({
    id: e.id_empresa,
    nombre: e.nombre_comercial,
    rubro: e.nombre_actividad || '',
    descripcion_actividad: e.descripcion_actividad || '',
    slogan: e.vision || '',
    descripcion: e.descripcion || '',
    fecha_fundacion: e.fecha_fundacion || '',
    fundacion: e.fecha_fundacion ? new Date(e.fecha_fundacion).getFullYear() : '',
    sede: e.sedes?.[0]?.ciudad || '',
    departamento: e.sedes?.[0]?.departamento || '',
    empleados: e.nombre_tamanio || '',
    sitioWeb: e.direccion_web || '',
    imagen: e.urlLogo
      ? (e.urlLogo.startsWith('http') ? e.urlLogo : `${CLOUDINARY_BASE_URL}/${e.urlLogo}`)
      : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
    tienePremios: e.premios?.length > 0 || false,
    rubros: e.rubros || [],
    operacionesInternacionales: e.operaciones_internacionales || [],
    familia: e.familia || [],
    premios: e.premios || [],
    id_actividad: e.id_actividad || 0,   // agrega id_actividad para uso interno
    id_tamanio: e.id_tamanio || 0
        // agrega id_tamano para uso interno
  });

  // Fetch inicial de empresas y rubros
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/empresas/resumen');
        const mapped = data.map(mapEmpresaResumen);
        setFullEmpresas(mapped);
        setEmpresas(mapped);
      } catch (error) {
        console.error('Error al cargar empresas:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRubros = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/rubros'); // Ajusta endpoint si necesario
        if (Array.isArray(data)) {
          setRubrosDisponibles(data);
        } else {
          setRubrosDisponibles([]);
        }
      } catch (error) {
        console.error('Error al cargar rubros:', error);
        setRubrosDisponibles([]);
      }
    };

    fetchEmpresas();
    fetchRubros();
  }, []);
// Dentro del componente EmpresasPanel (después de los hooks y funciones existentes):

const [showCrearModal, setShowCrearModal] = useState(false);
const [nuevoEmpresaData, setNuevoEmpresaData] = useState({
  denominacion_social: '',
  nombre_comercial: '',
  fecha_fundacion: '',
  nit: '',
  vision: '',
  mision: '',
  descripcion: '',
  url: '',
  direccion_web: '',
  id_actividad: '',
  id_tamanio: '',
});

const [actividades, setActividades] = useState([]);
const [tamanios, setTamanios] = useState([]);

// Cargar actividades y tamanios para los combos en la creación
useEffect(() => {
  const fetchActividades = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/actividades');
      setActividades(data);
    } catch (error) {
      console.error('Error cargando actividades:', error);
    }
  };
  const fetchTamanios = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/tamanios');
      setTamanios(data);
    } catch (error) {
      console.error('Error cargando tamaños:', error);
    }
  };
  fetchActividades();
  fetchTamanios();
}, []);

  // Manejar cambios en formulario creación
  const handleNuevoChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpresaData(prev => ({ ...prev, [name]: value }));
  };

  const handleCrearEmpresa = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nuevoEmpresaData.denominacion_social.trim()) {
      alert('Denominación social es obligatoria');
      return;
    }
    if (!nuevoEmpresaData.nit || isNaN(Number(nuevoEmpresaData.nit))) {
      alert('NIT válido es obligatorio');
      return;
    }
    if (!nuevoEmpresaData.fecha_fundacion) {
      alert('Fecha de fundación es obligatoria');
      return;
    }
    if (!nuevoEmpresaData.id_actividad) {
      alert('Selecciona una actividad');
      return;
    }
    if (!nuevoEmpresaData.id_tamanio) {
      alert('Selecciona un tamaño');
      return;
    }

    try {
      const payload = {
        ...nuevoEmpresaData,
        id_usuario: loggedInUser.id_usuario,
        fecha_fundacion: new Date(nuevoEmpresaData.fecha_fundacion).toISOString(),
        nit: Number(nuevoEmpresaData.nit),
        id_actividad: Number(nuevoEmpresaData.id_actividad),
        id_tamanio: Number(nuevoEmpresaData.id_tamanio),
      };

      await axios.post('http://localhost:3000/ingresarEmpresa', payload);
      setShowCrearModal(false);
      // Recargar empresas
      const { data } = await axios.get('http://localhost:3000/empresas/resumen');
      setFullEmpresas(data.map(mapEmpresaResumen));
      setEmpresas(data.map(mapEmpresaResumen));
    } catch (error) {
      console.error('Error creando empresa:', error);
      alert('Error al crear empresa. Intenta nuevamente.');
    }
  };


  // Filtrar y ordenar
  useEffect(() => {
    let lista = [...fullEmpresas];
    const term = busqueda.trim().toLowerCase();

    if (term) {
      lista = lista.filter(e =>
        (e.nombre || '').toLowerCase().includes(term) ||
        (e.rubro || '').toLowerCase().includes(term) ||
        (e.departamento || '').toLowerCase().includes(term)
      );
    }

    lista.sort((a, b) => {
      const dateA = a.fecha_fundacion ? new Date(a.fecha_fundacion) : new Date(0);
      const dateB = b.fecha_fundacion ? new Date(b.fecha_fundacion) : new Date(0);
      return ordenAntiguedad === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, ordenAntiguedad]);

  // Manejar filtros (sin cambios)
  const aplicarFiltro = (tipoFiltro) => {
    if (filtroActivo === tipoFiltro) {
      setEmpresas(fullEmpresas);
      setFiltroActivo(null);
      return;
    }

    setFiltroActivo(tipoFiltro);

    if (tipoFiltro === '50años') {
      const añoActual = new Date().getFullYear();
      const empresas50 = fullEmpresas.filter(e => añoActual - e.fundacion > 50);
      const otrasEmpresas = fullEmpresas.filter(e => añoActual - e.fundacion <= 50);
      setEmpresas(empresas50.concat(otrasEmpresas));
    }
    else if (tipoFiltro === 'premio') {
      const conPremios = fullEmpresas.filter(e => e.tienePremios);
      const sinPremios = fullEmpresas.filter(e => !e.tienePremios);
      setEmpresas(conPremios.concat(sinPremios));
    }
    else if (tipoFiltro === 'rubro') {
      const agrupadasPorRubro = fullEmpresas.reduce((acc, empresa) => {
        const rubro = empresa.rubro || 'Sin rubro';
        if (!acc[rubro]) acc[rubro] = [];
        acc[rubro].push(empresa);
        return acc;
      }, {});
      const listaAgrupada = Object.values(agrupadasPorRubro).flat();
      setEmpresas(listaAgrupada);
    }
    else if (tipoFiltro === 'departamento') {
      const agrupadasPorDepto = fullEmpresas.reduce((acc, empresa) => {
        const depto = empresa.departamento || 'Sin departamento';
        if (!acc[depto]) acc[depto] = [];
        acc[depto].push(empresa);
        return acc;
      }, {});
      const listaAgrupada = Object.values(agrupadasPorDepto).flat();
      setEmpresas(listaAgrupada);
    }
  };

  // Abrir modal detalle solo lectura (sin cambios)
  const openModal = async (empresa) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/empresa/${empresa.id}`);
      setSelectedEmpresa({
        id: data.id_empresa,
        denominacion_social: data.denominacion_social || '',
        nombre: data.nombre_comercial || '',
        slogan: data.vision || '',
        descripcion: data.descripcion || '',
        rubro: data.nombre_actividad || '',
        id_actividad: data.id_actividad || 0,
        descripcion_actividad: data.descripcion_actividad || '',
        fundacion: data.fecha_fundacion ? new Date(data.fecha_fundacion).getFullYear() : '',
        sede: data.sedes?.[0]?.ciudad || '',
        departamento: data.sedes?.[0]?.departamento || '',
        empleados: data.nombre_tamanio || '',
        sitioWeb: data.direccion_web || '',
        imagen: data.urlLogo ? (data.urlLogo.startsWith('http') ? data.urlLogo : `${CLOUDINARY_BASE_URL}/${data.urlLogo}`) : 'https://via.placeholder.com/300.png?text=Sin+Imagen',
        premios: data.premios || [],
        rubros: data.rubros || [],
        operacionesInternacionales: data.operaciones_internacionales || [],
        familia: data.familia || [],
        id_tamano: data.id_tamano || 0
      });
      setModalEditable(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de la empresa:', error);
    }
  };

  // Abrir modal editable (sin select para relaciones, solo texto y mantener id oculto)
  const openModalEditable = async (empresa) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/empresa/${empresa.id}`);
      console.log('Datos empresa para editar:', data); // <-- verificar que id_actividad esté correcto
      setSelectedEmpresa({
        id: data.id_empresa,
        denominacion_social: data.denominacion_social || '',
        nombre: data.nombre_comercial || '',
        slogan: data.vision || '',
        descripcion: data.descripcion || '',
        rubro: data.nombre_actividad || '',         // texto solo lectura
        id_actividad: data.id_actividad || 0,       // id oculto, no editable
        descripcion_actividad: data.descripcion_actividad || '',
        fundacion: data.fecha_fundacion ? new Date(data.fecha_fundacion).getFullYear() : '',
        sede: data.sedes?.[0]?.ciudad || '',
        departamento: data.sedes?.[0]?.departamento || '',
        empleados: data.nombre_tamanio || '',
        sitioWeb: data.direccion_web || '',
        imagen: data.urlLogo ? (data.urlLogo.startsWith('http') ? data.urlLogo : `${CLOUDINARY_BASE_URL}/${data.urlLogo}`) : '',
        premios: data.premios || [],
        rubros: data.rubros || [],
        operacionesInternacionales: data.operaciones_internacionales || [],
        familia: data.familia || [],
        id_tamano: data.id_tamano || 0              // id oculto, no editable
      });
      setModalEditable(true);
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles de la empresa para editar:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

const handleGuardarCambios = async (empresaEditada) => {
  try {
    setLoading(true);

    if (!empresaEditada.denominacion_social || empresaEditada.denominacion_social.trim() === '') {
      alert("Debe ingresar la denominación social.");
      setLoading(false);
      return;
    }

    if (!empresaEditada.nit || empresaEditada.nit === 0) {
      alert("Debe ingresar un NIT válido.");
      setLoading(false);
      return;
    }

    if (!empresaEditada.id) {
      alert("No se encontró el ID de la empresa para actualizar.");
      setLoading(false);
      return;
    }

    const payload = {
      id_usuario: loggedInUser.id_usuario || 0,
      denominacion_social: empresaEditada.denominacion_social.trim(),
      nombre_comercial: empresaEditada.nombre || '',
      fecha_fundacion: empresaEditada.fundacion ? new Date(empresaEditada.fundacion, 0, 1).toISOString() : null,
      nit: empresaEditada.nit,
      vision: empresaEditada.slogan || '',
      mision: empresaEditada.mision?.trim() || "No disponible",
      descripcion: empresaEditada.descripcion || '',
      url: empresaEditada.url?.trim() || "http://example.com",
      direccion_web: empresaEditada.sitioWeb || '',
      id_actividad: empresaEditada.id_actividad || 1,
      id_tamanio: empresaEditada.id_tamanio || 1,
    };

    console.log('Actualizando empresa id:', empresaEditada.id, 'con datos:', payload);

    await axios.put(`http://localhost:3000/actualizarEmpresa/${empresaEditada.id}`, payload);

    setFullEmpresas(prev => prev.map(e => e.id === empresaEditada.id ? {...e, ...empresaEditada} : e));
    setEmpresas(prev => prev.map(e => e.id === empresaEditada.id ? {...e, ...empresaEditada} : e));

    setShowModal(false);
  } catch (error) {
    console.error('Error al guardar cambios:', error);
    alert("Error al guardar los cambios. Intenta nuevamente.");
  } finally {
    setLoading(false);
  }
};


  const visitarSitio = () => {
    if (!selectedEmpresa?.sitioWeb) return;
    const url = selectedEmpresa.sitioWeb.startsWith('http')
      ? selectedEmpresa.sitioWeb
      : `https://${selectedEmpresa.sitioWeb}`;
    window.open(url, '_blank');
  };

  // EditableEmpresaModal - relaciones NO editables, solo mostrar como texto + ocultos para id_actividad y id_tamano
  const EditableEmpresaModal = ({ empresa, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...empresa });

    // Actualizar formData si cambia empresa
    useEffect(() => {
      setFormData({ ...empresa });
    }, [empresa]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        // Ignorar id_actividad y id_tamano si vienen de campos ocultos (no editables)
        if (name === 'id_actividad' || name === 'id_tamano') return;
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      };


    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    const labelStyle = { fontWeight: '700', marginBottom: '6px', display: 'block', marginTop: '15px', fontSize: '15px', color: '#222' };
    const inputStyle = {
      width: '100%',
      marginBottom: '14px',
      padding: '10px 14px',
      fontSize: '16px',
      borderRadius: '7px',
      border: '1.8px solid #ccc',
      boxSizing: 'border-box',
      fontFamily: "'Poppins', sans-serif",
      transition: 'border-color 0.3s ease',
    };
    const disabledInputStyle = {
      ...inputStyle,
      backgroundColor: '#f2f2f2',
      color: '#777',
      cursor: 'not-allowed',
    };
    const headingStyle = {
      marginBottom: '35px',
      fontWeight: '900',
      fontSize: '26px',
      color: '#166D3B',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      userSelect: 'none',
    };
    const buttonBaseStyle = {
      padding: '12px 25px',
      borderRadius: '8px',
      fontWeight: '700',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      border: 'none',
      minWidth: '120px',
    };
    const cancelButtonStyle = {
      ...buttonBaseStyle,
      backgroundColor: '#bbb',
      color: '#333',
    };
    const saveButtonStyle = {
      ...buttonBaseStyle,
      backgroundColor: '#166D3B',
      color: '#fff',
    };

    return (
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', padding: '1% 20px' }}>
        <h2 style={headingStyle}>Modo de Edición</h2>

        <label style={labelStyle}>Denominación Social:</label>
        <input
          name="denominacion_social"
          type="text"
          value={formData.denominacion_social}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Nombre Comercial:</label>
        <input
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Eslogan / Visión:</label>
        <input
          name="slogan"
          type="text"
          value={formData.slogan}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
          style={inputStyle}
        />

        {/* Rubro solo lectura */}


        <label style={labelStyle}>Rubro (actividad):</label>
        <input
          type="text"
          value={formData.rubro || ''}
          style={disabledInputStyle}
          disabled
          title="Campo no editable"
        />
{/* Campo oculto para enviar el id_actividad */}
        <input
          type="hidden"
          name="id_actividad"
          value={formData.id_actividad || 0}
        />

        <label style={labelStyle}>Tamaño (Empleados):</label>
        <input
          type="text"
          value={formData.empleados || ''}
          style={disabledInputStyle}
          disabled
          title="Campo no editable"
        />
        {/* Campo oculto para enviar el id_tamano */}
        <input
          type="hidden"
          name="id_tamano"
          value={formData.id_tamano || 0}
        />
        <label style={labelStyle}>Actividad:</label>
        <textarea
          name="descripcion_actividad"
          value={formData.descripcion_actividad}
          onChange={handleChange}
          rows={2}
          style={inputStyle}
        />

        <label style={labelStyle}>Año Fundación:</label>
        <input
          name="fundacion"
          type="number"
          value={formData.fundacion}
          onChange={handleChange}
          min="1800"
          max={new Date().getFullYear()}
          style={inputStyle}
        />

        <label style={labelStyle}>Sede (Ciudad):</label>
        <input
          name="sede"
          type="text"
          value={formData.sede}
          style={disabledInputStyle}
          disabled
          title="Campo no editable"
          readOnly
        />

        <label style={labelStyle}>Departamento:</label>
        <input
          name="departamento"
          type="text"
          value={formData.departamento}
          style={disabledInputStyle}
          disabled
          title="Campo no editable"
          readOnly
        />

        {/* Tamaño solo lectura */}
        <label style={labelStyle}>Tamaño (Empleados):</label>
        <input
          type="text"
          value={formData.empleados || ''}
          style={disabledInputStyle}
          disabled
          title="Campo no editable"
        />

        {/* ID Tamaño oculto para enviar */}
        <input
          type="hidden"
          name="id_tamano"
          value={formData.id_tamano || 0}
        />

        <label style={labelStyle}>Sitio Web:</label>
        <input
          name="sitioWeb"
          type="text"
          value={formData.sitioWeb}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>NIT:</label>
        <input
          name="nit"
          type="number"
          value={formData.nit || ''}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>URL (opcional):</label>
        <input
          name="url"
          type="text"
          value={formData.url || ''}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={labelStyle}>Misión:</label>
        <textarea
          name="mision"
          value={formData.mision || ''}
          onChange={handleChange}
          rows={2}
          style={inputStyle}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
          <button
            type="button"
            onClick={onClose}
            style={cancelButtonStyle}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#999'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#bbb'}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={saveButtonStyle}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#145a2a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#166D3B'}
          >
            Guardar
          </button>
        </div>
      </form>
    );
  };

  // Modal solo lectura
  const DetalleEmpresaModal = ({ empresa, onClose }) => (
    <>
      <div className="modal-header">
        <h2>{empresa.nombre}</h2>
        <button className="close-modal" onClick={onClose}>×</button>
      </div>
      <div className="modal-body" style={{display: 'flex', gap: '15px'}}>
        <div className="modal-info" style={{flex: 1}}>
          <h3>{empresa.slogan}</h3>
          <p className="descripcion">{empresa.descripcion}</p>
          <div className="info-detalle">
            <p><strong>Rubro:</strong> {empresa.rubro}</p>
            {empresa.descripcion_actividad && <p><strong>Actividad:</strong> {empresa.descripcion_actividad}</p>}
            <p><strong>Fundación:</strong> {empresa.fundacion}</p>
            {empresa.sede && <p><strong>Sede:</strong> {empresa.sede}</p>}
            {empresa.departamento && <p><strong>Departamento:</strong> {empresa.departamento}</p>}
            {empresa.empleados && <p><strong>Tamaño:</strong> {empresa.empleados}</p>}
            {empresa.sitioWeb && <p><strong>Sitio web:</strong> {empresa.sitioWeb}</p>}
            {empresa.rubros?.length > 0 && (
              <p><strong>Rubros adicionales:</strong> {empresa.rubros.join(', ')}</p>
            )}
            {empresa.operacionesInternacionales?.length > 0 && (
              <p><strong>Operaciones internacionales:</strong> {empresa.operacionesInternacionales.join(', ')}</p>
            )}
            {empresa.familia?.length > 0 && (
              <p><strong>Familiar:</strong> Sí ({empresa.familia.length} registros)</p>
            )}
            {empresa.premios?.length > 0 && (
              <div className="premios-section">
                <strong>Premios:</strong>
                <ul>
                  {empresa.premios.map((premio, idx) => (
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
      <div className="modal-footer" style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
        {empresa.sitioWeb && (
          <button className="btn-visitar" onClick={visitarSitio}>
            Visitar sitio web
          </button>
        )}
        <button className="btn-contactar" onClick={() => window.location.href = `mailto:info@desconocido.com`}>Contactar</button>
      </div>
    </>
  );

  // Renderizar empresas con botón editar si puede
  const renderEmpresas = () => {
    return empresas.map((e, i) => (
      <motion.div
        key={e.id}
        className="empresa-card"
        onClick={() => openModal(e)}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        style={{ position: 'relative' }}
      >
        <div className="empresa-img-contenedor">
          
          <div className="empresa-nombre-default">{e.nombre}</div>
          <div className="empresa-overlay">
            <div className="nombre">{e.nombre}</div>
            <div className="rubro">{e.rubro}</div>
            <div className="slogan">{e.slogan}</div>
          </div>
          {puedeEditar && (
            <button
              onClick={(ev) => {
                ev.stopPropagation();
                openModalEditable(e);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(250, 242, 242, 0.3)', // gris claro con 10% opacidad

                border: 'none',
                borderRadius: '4px',
                color: 'white',
                padding: '5px 10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              title="Editar empresa"
            >
              Editar
            </button>
          )}
        </div>
      </motion.div>
    ));
  };

  if (loading) {
    return <div className="cargando">Cargando empresas...</div>;
  }

  return (
    <motion.div className="empresas-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 } }>
      {/* BARRA SUPERIOR */}
      <div className="barra-superior">


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
          <img 
            src="/media/empresasPage/bolivia.jpg" 
            alt="Imagen lateral" 
            style={{ border: 'none', outline: 'none' }} 
          />
        { loggedInUser?.id_rol === 1 && (
          <>
            <button
              className="boton-crear-empresa"
              onClick={() => setShowRegistroModal(true)}
              title="Crear nueva empresa"
              style={{
                marginTop: '10px',
                backgroundColor: '#053015',
                color: 'white',
                borderRadius: '6px',
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              +
            </button>

            {showRegistroModal && (
              <div 
                className="modal-overlay" 
                onClick={() => setShowRegistroModal(false)}
                style={{
                  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  zIndex: 9999,
                }}
              >
                <div 
                  className="modal-content" 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    maxWidth: '600px',
                    width: '90%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '20px',
                  }}
                >
                  <RegistroEmpresa 
                    onRegistroExitoso={() => {
                      setShowRegistroModal(false);
                      recargarEmpresas();
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
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
              {modalEditable ? (
                <EditableEmpresaModal
                  empresa={selectedEmpresa}
                  onClose={closeModal}
                  onSave={handleGuardarCambios}
                />
              ) : (
                <DetalleEmpresaModal
                  empresa={selectedEmpresa}
                  onClose={closeModal}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmpresasPanel;
