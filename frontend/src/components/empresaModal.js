import React from 'react';
import { motion } from 'framer-motion';

const ModalTimeline = ({ hitos = [] }) => {
    // Si no hay hitos, no renderizamos la línea.
    if (hitos.length === 0) return null;

    return (
        <div className="relative w-full px-8 pt-6 pb-2 mt-4 flex items-center justify-between flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Hitos de la Empresa</h3>
            
            {/* Contenedor de la línea y los puntos */}
            <div className="relative w-full h-12">
                {/* Línea Azul de Base */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-500 rounded-full transform -translate-y-1/2"></div>

                {/* Círculos de Hitos */}
                {hitos.map((hito, index) => {
                    // Distribuye los puntos uniformemente a lo largo de la línea.
                    const positionPercentage = (index + 1) / (hitos.length + 1) * 100;
                    
                    // Tamaño del círculo (w-3 h-3) es 12px. Por lo tanto, el centrado es -6px.
                    const circleSize = 12; // 0.75rem en Tailwind
                    const centeringOffset = circleSize / 2; // 6px

                    return (
                        <div
                            key={index}
                            className="absolute top-1/2 transform -translate-y-1/2"
                            style={{ 
                                left: `calc(${positionPercentage}% - ${centeringOffset}px)`
                            }}
                            // Utilizamos el div principal como el punto, replicando el estilo de la tarjeta.
                        >
                            <div
                                className="w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow cursor-pointer hover:scale-150 transition-transform duration-200 relative group"
                            >
                                {/* Etiqueta del hito (Se muestra arriba del círculo al hacer hover) */}
                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-blue-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-30">
                                    {hito.nombre} ({hito.fecha})
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Leyenda de Fechas: Opcional, pero útil para visualizar la progresión */}
            <div className="w-full flex justify-between px-2 text-sm text-gray-500 mt-2">
                {/* Etiqueta de Fundación fuera del loop si es una fecha fija (como la fundación) */}
                <span className='font-semibold'>Fundación</span>
                {hitos.map((hito, index) => (
                    <span 
                        key={`legend-${index}`}
                        className='text-center'
                        style={{ width: `${100 / (hitos.length + 1)}%` }} // Distribución para alinear con los puntos
                    >
                        {hito.fecha}
                    </span>
                ))}
            </div>
        </div>
    );
};

// --- Componente principal del Modal ---
const EmpresaModal = ({ empresa, onClose }) => {
    if (!empresa) return null;

    const empresaHitos = empresa.hitos || [];

    return (
        <motion.div
            className="absolute inset-0 bg-white rounded-lg p-6 shadow-xl flex flex-col items-center justify-start overflow-y-auto z-10" 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Botón de Cerrar */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors z-20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            {/* Contenido del Modal (Scrollable) */}
            <div className="w-full max-w-lg mx-auto flex flex-col items-center">
                {/* Cabecera */}
                <div className="text-center mb-6 pt-4">
                    <h2 className="text-3xl font-bold text-gray-900">{empresa.nombre}</h2>
                    <p className="text-lg text-gray-600">{empresa.rubro}</p>
                    <p className="text-sm text-gray-500 italic">"{empresa.slogan}"</p>
                </div>
                
                {/* Imagen/Logo */}
                <div className="w-full flex-shrink-0 mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <img
                        src={empresa.imagen}
                        alt={`Logo de ${empresa.nombre}`}
                        className="w-full h-48 object-contain bg-gray-50"
                    />
                </div>
                
                {/* Descripción y Detalles */}
                <div className="w-full text-gray-700 text-center mb-6">
                    <p className="text-base mb-4 italic px-4">{empresa.descripcion}</p>
                    <p className="text-sm border-t pt-2">
                        <span className="font-semibold">Departamento principal:</span> {empresa.departamento}
                    </p>
                </div>

                {/* LÍNEA DE TIEMPO DE HITOS */}
                <ModalTimeline hitos={empresaHitos} />

            </div>
        </motion.div>
    );
};

export default EmpresaModal;