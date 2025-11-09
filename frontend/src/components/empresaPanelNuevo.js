import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Mantenemos AnimatePresence para el modal importado
import MapaBolivia from './mapaBolivia';
import EmpresaBuscador from './empresaBuscador';
import EmpresaLista from './empresaLista';
import EmpresaModal from './empresaModal'; // Importamos el modal refactorizado
import { getEmpresasCards, getEmpresaPublicById } from '../services/empresaService';

const EmpresasPanel = () => {
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [departamentoActivo, setDepartamentoActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [vistaGrid, setVistaGrid] = useState(false); // false = Vertical/Lista, true = Cuadrícula/Grid

  useEffect(() => {
    const loadEmpresas = async () => {
      setLoading(true);
      setError(null);

      try {
  const cards = await getEmpresasCards({ limit: 100 });

        const baseEmpresas = cards.map((card) => ({
          id: card.id,
          nombre: card.nombre,
          rubro: '',
          slogan: '',
          descripcion: 'Descripción no disponible.',
          departamento: '',
          imagen: card.imagen,
          hitos: [],
        }));

        setFullEmpresas(baseEmpresas);

        const detalles = await Promise.allSettled(
          cards.map((card) => getEmpresaPublicById(card.id))
        );

        const detallesPorId = new Map();
        detalles.forEach((resultado) => {
          if (resultado.status === 'fulfilled') {
            detallesPorId.set(resultado.value.id, resultado.value);
          }
        });

        if (detallesPorId.size > 0) {
          setFullEmpresas((prev) =>
            prev.map((empresa) =>
              detallesPorId.has(empresa.id)
                ? { ...empresa, ...detallesPorId.get(empresa.id) }
                : empresa
            )
          );
        }

        if (detalles.some((item) => item.status === 'rejected')) {
          console.warn('Algunas empresas no pudieron completarse con detalles.');
        }
      } catch (err) {
        console.error('Error al cargar empresas:', err);
        setError('No se pudieron cargar las empresas. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadEmpresas();
  }, []);

  const handleDepartamentoClick = (departamento) => {
    if (departamentoActivo === departamento) {
      setDepartamentoActivo(null);
      setBusqueda('');
    } else {
      setDepartamentoActivo(departamento);
      setBusqueda('');
    }
  };

  useEffect(() => {
    let lista = [...fullEmpresas];
    const term = busqueda.trim().toLowerCase();

    if (term) {
      lista = lista.filter((e) =>
        (e.nombre || '').toLowerCase().includes(term) ||
        (e.rubro || '').toLowerCase().includes(term) ||
        (e.departamento || '').toLowerCase().includes(term)
      );
    }
    else if (departamentoActivo) {
      lista = lista.filter(e => e.departamento === departamentoActivo);
    }

    setEmpresas(lista);
  }, [fullEmpresas, busqueda, departamentoActivo]);

  const handleCardClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const toggleVista = () => {
    setVistaGrid(prev => !prev);
  };

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6 h-screen overflow-hidden">
      {/* Columna Izquierda: Mapa (Layout y altura reducida) */}
      <div className="w-full md:w-1/2 lg:w-1/2 bg-gray-100 rounded-lg p-4 shadow-md flex-shrink-0 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 flex-shrink-0">Empresas por Departamento</h2>

        {/* CONTENEDOR DEL MAPA */}
        <div className="w-full h-[68%] flex-shrink-0">
          <MapaBolivia
            onDepartamentoClick={handleDepartamentoClick}
            empresas={fullEmpresas}
          />
        </div>

        {/* ESPACIO DE RELLENO */}
        <div className="flex-grow">
          {/* Información adicional o vacío */}
        </div>
      </div>

      {/* Columna Derecha: Buscador y Empresas */}
      <div className="relative w-full md:w-1/2 lg:w-1/2 flex-grow flex flex-col h-full z-0">
        {/* Modal de la empresa */}
        <AnimatePresence>
          {showModal && (
            // 💡 Llamada al componente importado
            <EmpresaModal empresa={selectedEmpresa} onClose={handleCloseModal} />
          )}
        </AnimatePresence>

        {/* BUSCADOR */}
        <EmpresaBuscador
          busqueda={busqueda}
          onBusquedaChange={handleBusquedaChange}
          vistaGrid={vistaGrid}
          onVistaToggle={toggleVista}
        />

        {/* LISTA DE EMPRESAS */}
        <EmpresaLista
          empresas={empresas}
          loading={loading}
          error={error}
          vistaGrid={vistaGrid}
          onCardClick={handleCardClick}
        />

      </div>
    </div>
  );
};

export default EmpresasPanel;