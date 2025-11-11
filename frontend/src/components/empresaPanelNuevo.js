import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MapaBolivia from './mapaBolivia';
import EmpresaBuscador from './empresaBuscador';
import EmpresaLista from './empresaLista';
import EmpresaModal from './empresaModal'; // Importamos el modal refactorizado
import { getEmpresasCards, getEmpresaPublicById, getEmpresaPrivateById, updateEmpresaPrivate } from '../services/empresaService';

let privateDetailsGloballyDisabled = false;

const debugLog = (...args) => {
  // Utiliza console.log para depurar paso a paso la carga de empresas
  console.log('[EmpresasPanel]', ...args);
};

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
  const panelHeight = 82; // Altura fija del 82% del viewport

  const canViewPrivate = useMemo(() => {
    if (!loggedInUser?.idRol) return false;
    return [1, 2, 3].includes(loggedInUser.idRol);
  }, [loggedInUser?.idRol]);

  const [privateDetailEnabled, setPrivateDetailEnabled] = useState(() => canViewPrivate && !privateDetailsGloballyDisabled);

  useEffect(() => {
    setPrivateDetailEnabled(canViewPrivate && !privateDetailsGloballyDisabled);
  }, [canViewPrivate]);

  const disablePrivateDetails = useCallback(() => {
    if (!privateDetailsGloballyDisabled) {
      privateDetailsGloballyDisabled = true;
    }
    setPrivateDetailEnabled((current) => (current ? false : current));
  }, [setPrivateDetailEnabled]);

  const shouldUsePrivateDetails = canViewPrivate && privateDetailEnabled;

  const shouldFallbackToPublic = useCallback((error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) return true;

    const code = error?.code;
    if (code === 'ERR_NETWORK' || code === 'ECONNABORTED') return true;

    const message = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
    if (message.includes('network error') || message.includes('cors')) return true;

    return false;
  }, []);

  useEffect(() => {
    const loadEmpresas = async () => {
      debugLog('Iniciando carga de empresas', { canViewPrivate });
      setLoading(true);
      setError(null);

      try {
        let cards = [];
        try {
          cards = await getEmpresasCards({ limit: 100 }, canViewPrivate ? 'private' : 'public');
          debugLog('Tarjetas cargadas', { cantidad: cards.length, variant: canViewPrivate ? 'private' : 'public' });
        } catch (primaryError) {
          debugLog('Error al obtener tarjetas en primera llamada', primaryError);
          if (canViewPrivate && primaryError?.response?.status === 401) {
            cards = await getEmpresasCards({ limit: 100 }, 'public');
            debugLog('Recuperado tarjetas públicas tras 401', { cantidad: cards.length });
          } else {
            throw primaryError;
          }
        }

        const baseEmpresas = cards.map((card) => ({
          id: card.id,
          nombre: card.nombre,
          rubro: card.rubro || '',
          slogan: card.slogan || '',
          descripcion: card.descripcion || 'Descripción no disponible.',
          departamento: card.departamento || '',
          imagen: card.imagen,
          hitos: Array.isArray(card.hitos) ? card.hitos : [],
        }));

        setFullEmpresas(baseEmpresas);
        debugLog('Tarjetas base normalizadas', { cantidad: baseEmpresas.length });
      } catch (err) {
        console.error('Error al cargar empresas:', err);
        debugLog('Error general en la carga de empresas', err);
        setError('No se pudieron cargar las empresas. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
        debugLog('Carga de empresas finalizada');
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
    debugLog('Click en tarjeta', { id: empresa.id, shouldUsePrivateDetails });
    setShowModal(true);
    setModalLoading(true);
    setModalError(null);
    setSelectedEmpresa(null);

    try {
      let detalle = null;

      if (shouldUsePrivateDetails) {
        try {
          detalle = await getEmpresaPrivateById(empresa.id);
          debugLog('Detalle privado obtenido para modal', { id: empresa.id });
        } catch (err) {
          debugLog('Error al obtener detalle privado para modal', { id: empresa.id, error: err });
          if (shouldFallbackToPublic(err)) {
            disablePrivateDetails();
            debugLog('Falling back a detalle público en modal', { id: empresa.id });
          } else {
            throw err;
          }
        }
      }

      if (!detalle) {
        detalle = await getEmpresaPublicById(empresa.id);
        debugLog('Detalle público obtenido para modal', { id: empresa.id });
      }
      setSelectedEmpresa(detalle);
      debugLog('Empresa seleccionada actualizada', { id: detalle.id });

      // Refresca la lista con la información más reciente
      setFullEmpresas((prev) =>
        prev.map((item) => (item.id === detalle.id ? { ...item, ...detalle } : item))
      );
      debugLog('Lista principal actualizada con detalle del modal', { id: detalle.id });
    } catch (err) {
      console.error('Error al obtener detalle de la empresa:', err);
      debugLog('Error general al abrir modal de empresa', err);
      setModalError('No se pudo cargar la información de la empresa. Intenta nuevamente más tarde.');
    } finally {
      setModalLoading(false);
      debugLog('Modal completó carga de detalle');
    }
  };

  const handleEmpresaUpdate = async (empresaId, cambios) => {
    if (!empresaId || !canEdit) return;

    setModalSaving(true);
    setModalError(null);
    debugLog('Intentando actualizar empresa', { empresaId, cambios });

    try {
      const actualizada = await updateEmpresaPrivate(empresaId, cambios);
      if (actualizada) {
        setSelectedEmpresa(actualizada);
        setFullEmpresas((prev) =>
          prev.map((item) => (item.id === actualizada.id ? { ...item, ...actualizada } : item))
        );
        debugLog('Empresa actualizada correctamente', { id: actualizada.id });
      }
    } catch (err) {
      console.error('Error al actualizar la empresa:', err);
      debugLog('Error al actualizar empresa', err);
      const backendMessage = err?.response?.data?.message;
      const mensaje = Array.isArray(backendMessage)
        ? backendMessage.join(', ')
        : backendMessage || 'No se pudo guardar la información. Intenta nuevamente.';
      setModalError(mensaje);
    } finally {
      setModalSaving(false);
      debugLog('Actualización de empresa finalizada');
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
    <>
    <div className="p-2 flex flex-col md:flex-row gap-4 overflow-hidden" style={{ height: `${panelHeight}vh` }}>
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
      <div className="relative w-full md:flex-1 flex flex-col h-full">
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

    {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1200] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal} // Add this line
          >
            <motion.div
              className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg overflow-hidden shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()} // Add this line
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

              {!modalError && selectedEmpresa && (
                <EmpresaModal
                  empresa={selectedEmpresa}
                  onClose={handleCloseModal}
                  canEdit={canEdit}
                  onSave={(changes) => handleEmpresaUpdate(selectedEmpresa.id, changes)}
                  saving={modalSaving}
                />
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
};

export default EmpresasPanel;