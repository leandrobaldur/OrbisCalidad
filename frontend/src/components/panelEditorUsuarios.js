import React from 'react';

const PanelEditorUsuarios = () => {
  const usuarios = [
    { nombre: 'Juan Pérez', rol: 'Administrador' },
    { nombre: 'María López', rol: 'Editor' },
    { nombre: 'Carlos Ruiz', rol: 'Moderador' },
    { nombre: 'Ana Torres', rol: 'Usuario' },
    { nombre: 'Luis Gómez', rol: 'Invitado' },
    { nombre: 'Valeria Ríos', rol: 'Administrador' },
    { nombre: 'José Silva', rol: 'Editor' },
    { nombre: 'Camila Díaz', rol: 'Moderador' }
  ];

  return (
    <div className="min-h-screen w-full bg-[#f2f0df] p-3 sm:p-4 md:p-6 flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl text-[#9fa56c] font-bold font-mono tracking-wide mb-4 sm:mb-6 md:mb-8">Panel de edición</h1>

      <div className="bg-[#202020] w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        {/* Header section - more responsive */}
        <div className="bg-[#2b2b2b] px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4">
          <span className="text-[#e1e4c5] text-base sm:text-lg w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">DATOS</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
            <img src="/icons/filtro.png" alt="Filtro" className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar..."
                className="rounded-full px-3 py-1 pl-8 sm:pl-10 w-full bg-[#e1e4c5] text-black focus:outline-none text-sm sm:text-base"
              />
              <img 
                src="/icons/lupa.png" 
                alt="Buscar" 
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4" 
              />
            </div>
            <div className="flex gap-3 sm:gap-4 items-center mt-2 sm:mt-0">
              <img src="/icons/medalla.png" alt="Medalla" className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="flex items-center">
                <img src="/icons/plus.png" alt="Plus" className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-[#e1e4c5] text-sm sm:text-base">50</span>
              </div>
              <img src="/icons/cerebro.png" alt="Cerebro" className="w-4 h-4 sm:w-5 sm:h-5" />
              <img src="/icons/mapa.png" alt="Mapa" className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Button section - more responsive */}
        <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex justify-end">
          <button className="bg-[#9fa56c] text-white p-2 sm:p-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#8a944e] transition flex items-center justify-center min-w-[2rem] sm:min-w-[2.5rem]">
            <img src="/icons/plus.png" alt="Añadir" className="w-3 h-3 sm:w-4 sm:h-4 invert" />
          </button>
        </div>

        {/* Grid section - more responsive with better breakpoints */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          {usuarios.map((usuario, index) => (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-black shadow-md flex flex-col justify-center items-start"
            >
              <span className="text-[#2b2b2b] font-semibold text-base sm:text-lg">Usuario</span>
              <input
                type="text"
                value={usuario.nombre}
                disabled
                className="w-full mt-1 sm:mt-2 mb-2 sm:mb-3 p-1 sm:p-2 rounded-md bg-[#e1e4c5] text-black text-sm sm:text-base"
              />
              <span className="text-[#2b2b2b] font-semibold text-base sm:text-lg">Rol</span>
              <input
                type="text"
                value={usuario.rol}
                disabled
                className="w-full mt-1 sm:mt-2 p-1 sm:p-2 rounded-md bg-[#e1e4c5] text-black text-sm sm:text-base"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelEditorUsuarios;