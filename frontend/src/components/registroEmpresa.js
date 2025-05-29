import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'; // Importamos motion y AnimatePresence

// Componente de Alerta Reutilizable
const StatusAlert = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-[#F6F0E0]' : 'bg-[#F6F0E0]'; // Manteniendo el mismo fondo claro
  const textColor = isSuccess ? 'text-[#052018]' : 'text-[#8B0000]'; // Verde oscuro para éxito, rojo oscuro para error
  const accentColor = isSuccess ? 'bg-[#1A7B5F]' : 'bg-[#8B0000]'; // Verde para éxito, rojo para error
  const buttonBgColor = isSuccess ? 'bg-[#1A7B5F]' : 'bg-[#8B0000]';
  const buttonHoverColor = isSuccess ? 'hover:bg-[#052018]' : 'hover:bg-[#520000]';
  const icon = isSuccess ? '✓' : '✕';
  const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';

  return (
    <motion.div
      className="fixed inset-0 bg-[#333333] bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className={`${bgColor} p-8 rounded-xl shadow-2xl text-center max-w-sm w-full relative overflow-hidden`}
      >
        <div className={`absolute top-0 left-0 w-full h-1 ${accentColor}`}></div> {/* Top accent */}
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 400, delay: 0.1 }}
            className={`${iconColor} text-6xl`}
          >
            {icon}
          </motion.div>
        </div>
        <h3 className={`text-2xl font-bold ${textColor} mb-3`}>
          {isSuccess ? '¡Éxito!' : '¡Error!'}
        </h3>
        <p className="text-[#333333] mb-6">{message}</p>
        <motion.button
          onClick={onClose}
          className={`${buttonBgColor} text-white py-2 px-6 rounded-md ${buttonHoverColor} transition-colors duration-200`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Aceptar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};


const RegistroEmpresa = ({ ancho = '100%', alto = '100%', onRegistroExitoso }) => {
  const [formulario, setFormulario] = useState({
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
  const [loading, setLoading] = useState(false);

  // Estados para la alerta personalizada
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState(''); // 'success' o 'error'

  // Función para mostrar la alerta
  const handleShowAlert = (message, type) => {
    setMensajeAlerta(message);
    setTipoAlerta(type);
    setMostrarAlerta(true);
  };

  // Función para cerrar la alerta y realizar acciones post-alerta
  const handleAlertClose = () => {
    setMostrarAlerta(false);
    if (tipoAlerta === 'success') {
      // Si fue un registro exitoso, limpiar el formulario y llamar al callback
      setFormulario({
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
      onRegistroExitoso && onRegistroExitoso(); // Llama al callback si está definido
    }
    // No hacer nada especial para el error, solo cerrar la alerta
  };


  // Cargar opciones de actividades y tamaños al montar
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [actRes, tamRes] = await Promise.all([
          axios.get('http://localhost:3000/actividades'),
          axios.get('http://localhost:3000/tamanios')
        ]);

        const actividadesData = Array.isArray(actRes.data.actividades)
          ? actRes.data.actividades
          : Array.isArray(actRes.data)
            ? actRes.data
            : [];

        const tamaniosData = Array.isArray(tamRes.data.tamanios)
          ? tamRes.data.tamanios
          : [];

        setActividades(actividadesData);
        setTamanios(tamaniosData);

      } catch (error) {
        console.error('Error cargando actividades o tamaños:', error);
        handleShowAlert('Error al cargar datos de actividades y tamaños. Intenta de nuevo.', 'error');
      }
    };
    fetchDatos();
  }, []);


  // Manejo de cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  // Validación básica (usando la nueva alerta)
  const validarFormulario = () => {
    if (!formulario.denominacion_social.trim()) {
      handleShowAlert('La denominación social es obligatoria.', 'error');
      return false;
    }
    if (!formulario.nombre_comercial.trim()) {
      handleShowAlert('El nombre comercial es obligatorio.', 'error');
      return false;
    }
    if (!formulario.fecha_fundacion) {
      handleShowAlert('La fecha de fundación es obligatoria.', 'error');
      return false;
    }
    if (!formulario.nit || isNaN(Number(formulario.nit))) {
      handleShowAlert('El NIT válido es obligatorio.', 'error');
      return false;
    }
    if (!formulario.id_actividad) {
      handleShowAlert('Debes seleccionar una actividad.', 'error');
      return false;
    }
    if (!formulario.id_tamanio) {
      handleShowAlert('Debes seleccionar un tamaño.', 'error');
      return false;
    }
    return true;
  };

  // Manejo del submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const payload = {
        ...formulario,
        nit: Number(formulario.nit),
        id_actividad: Number(formulario.id_actividad),
        id_tamanio: Number(formulario.id_tamanio),
        // Asegúrate de que la fecha se formatee correctamente para tu backend
        fecha_fundacion: new Date(formulario.fecha_fundacion).toISOString().split('T')[0], // YYYY-MM-DD
      };
      await axios.post('http://localhost:3000/ingresarEmpresa', payload);
      
      handleShowAlert('Empresa registrada exitosamente.', 'success'); // Muestra la alerta de éxito
      
      // La limpieza del formulario y onRegistroExitoso se mueven a handleAlertClose
    } catch (error) {
      console.error('Error al registrar empresa:', error);
      handleShowAlert('Error al registrar empresa. Intenta nuevamente.', 'error'); // Muestra la alerta de error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-gray-100 p-6 rounded shadow-md max-w-xl mx-auto"
      style={{ width: ancho, height: alto, overflowY: 'auto' }}
    >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">Registro de Empresa</h1>

        <label className="block mb-2 font-semibold text-gray-700">Denominación Social *</label>
        <input
          type="text"
          name="denominacion_social"
          value={formulario.denominacion_social}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Nombre Comercial *</label>
        <input
          type="text"
          name="nombre_comercial"
          value={formulario.nombre_comercial}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Fecha Fundación *</label>
        <input
          type="date"
          name="fecha_fundacion"
          value={formulario.fecha_fundacion}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">NIT *</label>
        <input
          type="number"
          name="nit"
          value={formulario.nit}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Visión</label>
        <input
          type="text"
          name="vision"
          value={formulario.vision}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Misión</label>
        <textarea
          name="mision"
          value={formulario.mision}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          rows={3}
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          rows={3}
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Nombre de Imagen (URL)</label>
        <input
          type="text"
          name="url"
          value={formulario.url}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Dirección Web</label>
        <input
          type="text"
          name="direccion_web"
          value={formulario.direccion_web}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          disabled={loading}
        />

        <label className="block mb-2 font-semibold text-gray-700">Actividad *</label>
        <select
          name="id_actividad"
          value={formulario.id_actividad}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-4"
          required
          disabled={loading}
        >
          <option value="">-- Seleccione una actividad --</option>
          {Array.isArray(actividades) && actividades.map(act => (
            <option key={act.id_actividad} value={act.id_actividad}>
              {act.nombre_actividad}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold text-gray-700">Tamaño *</label>
        <select
          name="id_tamanio"
          value={formulario.id_tamanio}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-6"
          required
          disabled={loading}
        >
          <option value="">-- Seleccione un tamaño --</option>
          {Array.isArray(tamanios) && tamanios.map(tam => (
            <option key={tam.id_tamanio} value={tam.id_tamanio}>
              {tam.nombre_tamanio}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrar Empresa'}
        </button>
      </form>

      {/* ALERTA DE ESTADO (ÉXITO/ERROR) */}
      <AnimatePresence>
        {mostrarAlerta && (
          <StatusAlert
            message={mensajeAlerta}
            type={tipoAlerta}
            onClose={handleAlertClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistroEmpresa;