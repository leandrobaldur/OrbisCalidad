// ✅ COMPONENTE: RegistroEmpresa.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RegistroEmpresa = ({ ancho = '100%', alto = '100%' }) => {
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
    <div
      className="bg-gray-100 p-4 rounded shadow-md"
      style={{ width: ancho, height: alto, overflow: 'auto' }}
    >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full">
        <h1 className="text-xl font-bold mb-4">Registro de Empresa</h1>

        {[
          { name: 'denominacion_social', label: 'Denominación Social' },
          { name: 'nombre_comercial', label: 'Nombre Comercial' },
          { name: 'fecha_fundacion', label: 'Fecha Fundación', type: 'date' },
          { name: 'fecha_cierre', label: 'Fecha Cierre (opcional)', type: 'date' },
          { name: 'nit', label: 'NIT' },
          { name: 'eslogan', label: 'Eslogan' },
          { name: 'descripcion', label: 'Descripción', textarea: true },
          { name: 'url', label: 'Nombre de Imagen (URL)' }
        ].map(({ name, label, type, textarea }) => (
          <div className="mb-4" key={name}>
            <label className="block mb-1">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={formulario[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            ) : (
              <input
                type={type || 'text'}
                name={name}
                value={formulario[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required={name !== 'fecha_cierre'}
              />
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Registrar Empresa
        </button>
      </form>
    </div>
  );
};

export default RegistroEmpresa;
