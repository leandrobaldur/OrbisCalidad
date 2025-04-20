import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FichaExpandidaEditable from '../components/fichaExpandidaEditable';

const DashboardPage = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrimeraEmpresa = async () => {
      try {
        const res = await axios.get('http://localhost:3000/empresas');
        const lista = res.data;

        if (lista.length > 0) {
          const primera = lista[0];
          const detalle = await axios.get(`http://localhost:3000/empresa/${primera.id_empresa}`);
          setEmpresa(detalle.data);
        }
      } catch (error) {
        console.error('Error al obtener empresa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrimeraEmpresa();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {loading && <p className="text-gray-700">Cargando datos desde el backend...</p>}
      {!loading && empresa && (
        <FichaExpandidaEditable
          empresa={empresa}
          onClose={() => alert('Cambios cancelados')}
        />
      )}
      {!loading && !empresa && (
        <p className="text-red-500">No hay empresas disponibles en la base de datos.</p>
      )}
    </div>
  );
};

export default DashboardPage;
