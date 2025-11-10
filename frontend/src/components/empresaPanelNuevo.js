import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MapaBolivia from './mapaBolivia';
import EmpresaBuscador from './empresaBuscador';
import EmpresaLista from './empresaLista';
import EmpresaModal from './empresaModal'; // Importamos el modal refactorizado
import { getEmpresasCards, getEmpresaPublicById, getEmpresaPrivateById, updateEmpresaPrivate } from '../services/empresaService';

const EmpresasPanel = ({ loggedInUser, canEdit = false }) => {
  const [fullEmpresas, setFullEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [departamentoActivo, setDepartamentoActivo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [vistaGrid, setVistaGrid] = useState(false); // false = Vertical/Lista, true = Cuadrícula/Grid
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [modalSaving, setModalSaving] = useState(false);

  const canViewPrivate = useMemo(() => {
    if (!loggedInUser?.idRol) return false;
    return [1, 2, 3].includes(loggedInUser.idRol);
  }, [loggedInUser?.idRol]);

  useEffect(() => {
    const loadEmpresas = async () => {
      setLoading(true);
      setError(null);

      try {
        let cards = [];
        try {
          cards = await getEmpresasCards({ limit: 100 }, canViewPrivate ? 'private' : 'public');
        } catch (primaryError) {
          if (canViewPrivate && primaryError?.response?.status === 401) {
            cards = await getEmpresasCards({ limit: 100 }, 'public');
          } else {
            throw primaryError;
          }
        }

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

        const detallePromise = cards.map((card) =>
          canViewPrivate
            ? getEmpresaPrivateById(card.id).catch((err) => {
                if (err?.response?.status === 401) {
                  return getEmpresaPublicById(card.id);
                }
                throw err;
              })
            : getEmpresaPublicById(card.id)
        );

        const detalles = await Promise.allSettled(detallePromise);

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
  }, [canViewPrivate]);

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

  const handleCardClick = async (empresa) => {
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedEmpresa(empresa);

    try {
      let detalle = null;

      if (canViewPrivate) {
        try {
          detalle = await getEmpresaPrivateById(empresa.id);
        } catch (err) {
          if (err?.response?.status !== 401) {
            throw err;
          }
        }
      }

      if (!detalle) {
        detalle = await getEmpresaPublicById(empresa.id);
      }
      setSelectedEmpresa(detalle);

      // Refresca la lista con la información más reciente
      setFullEmpresas((prev) =>
        prev.map((item) => (item.id === detalle.id ? { ...item, ...detalle } : item))
      );
    } catch (err) {
      console.error('Error al obtener detalle de la empresa:', err);
      setModalError('No se pudo cargar la información de la empresa. Intenta nuevamente más tarde.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEmpresaUpdate = async (empresaId, cambios) => {
    if (!empresaId || !canEdit) return;

    setModalSaving(true);
    setModalError(null);

    try {
      const actualizada = await updateEmpresaPrivate(empresaId, cambios);
      if (actualizada) {
        setSelectedEmpresa(actualizada);
        setFullEmpresas((prev) =>
          prev.map((item) => (item.id === actualizada.id ? { ...item, ...actualizada } : item))
        );
      }
    } catch (err) {
      console.error('Error al actualizar la empresa:', err);
      const backendMessage = err?.response?.data?.message;
      const mensaje = Array.isArray(backendMessage)
        ? backendMessage.join(', ')
        : backendMessage || 'No se pudo guardar la información. Intenta nuevamente.';
      setModalError(mensaje);
    } finally {
      setModalSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmpresa(null);
    setModalLoading(false);
    setModalError(null);
    setModalSaving(false);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const toggleVista = () => {
    setVistaGrid(prev => !prev);
  };

  return (
    <div className="p-2 flex flex-col md:flex-row gap-4 h-screen overflow-hidden">
      {/* Columna Izquierda: Mapa (Layout y altura reducida) */}
      <div className="w-full md:flex-1 bg-gray-100 rounded-lg p-4 shadow-md flex flex-col h-full">
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
      <div className="relative w-full md:flex-1 flex flex-col h-full z-0">
        {/* Modal de la empresa */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] bg-surface-elevated rounded-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {modalLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                  </div>
                )}

                {modalError && !modalLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <p className="text-text-main font-miles">{modalError}</p>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2 bg-primary text-surface-elevated rounded-md font-bodoni font-semibold hover:bg-primary/90"
                    >
                      Cerrar
                    </button>
                  </div>
                )}

                {!modalError && selectedEmpresa && !modalLoading && (
                  <EmpresaModal
                    empresa={selectedEmpresa}
                    onClose={handleCloseModal}
                    canEdit={canEdit}
                    onSave={(changes) => handleEmpresaUpdate(selectedEmpresa.id, changes)}
                    saving={modalSaving}
                  />
                )}

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-30 text-white/80 hover:text-white text-2xl font-bold"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
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