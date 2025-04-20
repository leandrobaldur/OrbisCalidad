import React, { useState } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [formulario, setFormulario] = useState({
    denominacion_social: '',
    nombre_comercial: '',
    fecha_fundacion: '',
    fecha_cierre: '',
    nit: '',
    eslogan: '',
    descripcion: '',
    url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formulario,
      fecha_cierre: formulario.fecha_cierre || null
    };

    try {
      const response = await axios.post('http://localhost:3000/empresas/ingresarEmpresa', payload);
      alert('✅ Empresa registrada exitosamente');
      console.log('✅ Respuesta del backend:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('❌ Error del backend:', error.response.data);
        console.error('❌ Código de estado:', error.response.status);
        console.error('❌ Headers:', error.response.headers);
      } else if (error.request) {
        console.error('❌ No se recibió respuesta del servidor. Request:', error.request);
      } else {
        console.error('❌ Error en la configuración de la solicitud:', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded shadow-md overflow-auto max-h-[85vh]">
        <h1 className="text-xl font-bold mb-4">Registro de Empresa</h1>

        <div className="mb-4">
          <label className="block mb-1">Denominación Social</label>
          <input name="denominacion_social" value={formulario.denominacion_social} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nombre Comercial</label>
          <input name="nombre_comercial" value={formulario.nombre_comercial} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha Fundación</label>
          <input type="date" name="fecha_fundacion" value={formulario.fecha_fundacion} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha Cierre (opcional)</label>
          <input type="date" name="fecha_cierre" value={formulario.fecha_cierre} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">NIT</label>
          <input name="nit" value={formulario.nit} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Eslogan</label>
          <input name="eslogan" value={formulario.eslogan} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descripción</label>
          <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} className="w-full border px-3 py-2 rounded" required></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nombre de Imagen (URL)</label>
          <input name="url" value={formulario.url} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Registrar Empresa
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;
