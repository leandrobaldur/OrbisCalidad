import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    // Cargar opciones de actividades y tamaños al montar
    useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [actRes, tamRes] = await Promise.all([
          axios.get('http://localhost:3000/actividades'),
          axios.get('http://localhost:3000/tamanios')
        ]);

        // Extraer el arreglo correcto según la estructura recibida
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
      }
    };
    fetchDatos();
  }, []);


  // Manejo de cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  // Validación básica
  const validarFormulario = () => {
    if (!formulario.denominacion_social.trim()) {
      alert('Denominación social es obligatoria');
      return false;
    }
    if (!formulario.nombre_comercial.trim()) {
      alert('Nombre comercial es obligatorio');
      return false;
    }
    if (!formulario.fecha_fundacion) {
      alert('Fecha de fundación es obligatoria');
      return false;
    }
    if (!formulario.nit || isNaN(Number(formulario.nit))) {
      alert('NIT válido es obligatorio');
      return false;
    }
    if (!formulario.id_actividad) {
      alert('Debes seleccionar una actividad');
      return false;
    }
    if (!formulario.id_tamanio) {
      alert('Debes seleccionar un tamaño');
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
        fecha_fundacion: new Date(formulario.fecha_fundacion).toISOString(),
      };
      await axios.post('http://localhost:3000/ingresarEmpresa', payload);
      alert('✅ Empresa registrada exitosamente');
      onRegistroExitoso && onRegistroExitoso();
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
    } catch (error) {
      console.error('Error al registrar empresa:', error);
      alert('Error al registrar empresa. Intenta nuevamente.');
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
    </div>
  );
};

export default RegistroEmpresa;
