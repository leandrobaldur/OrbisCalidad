import React from "react";

const ContenedorLateral = ({
  subtitulo,
  imagen,
  ancho = "100%",
  alto = "clamp(400px, 45vh, 500px)",
  ovaloRedondez = "20px",
  cuadroRedondez = "12px",
  className = ""
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-start bg-white border border-[#072D42]/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#072D42]/30 ${className}`}
      style={{
        width: ancho,
        height: alto,
        borderRadius: cuadroRedondez,
      }}
    >
      {/* Contenedor principal */}
      <div className="relative w-full h-full flex flex-col items-center justify-start p-4 md:p-6">
        
        {/* Óvalo del subtítulo - Diseño profesional */}
        <div
          className="absolute bg-white border border-[#072D42]/20 px-4 md:px-6 py-2 md:py-3 flex items-center justify-center shadow-lg z-10"
          style={{
            borderRadius: ovaloRedondez,
            left: "50%",
            top: "-16px",
            transform: "translateX(-50%)",
            minWidth: "180px",
            maxWidth: "90%",
          }}
        >
          <span className="font-sans font-semibold text-[#072D42] text-sm md:text-base uppercase tracking-wide text-center">
            {subtitulo}
          </span>
        </div>

        {/* Contenedor de la imagen con marco profesional */}
        <div className="w-full h-full flex items-center justify-center mt-6 md:mt-8">
          <div className="relative w-full h-full bg-[#F4E9D7]/30 border border-[#072D42]/10 rounded-lg overflow-hidden group"
            style={{
              borderRadius: "10px",
            }}
          >
            {/* Imagen que se ajusta al contenedor */}
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={imagen}
                alt="Contenido visual"
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
                style={{
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iI0Y0RTlENyIgc3Ryb2tlPSIjMDcyRDQyIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMTIiIGZpbGw9IiMwNzJENDIiLz4KICA8cGF0aCBkPSJNNzAgMTMwQzg1IDE1MCAxMTUgMTUwIDEzMCAxMzAiIHN0cm9rZT0iIzA3MkQ0MiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+";
                }}
              />
              
              {/* Overlay sutil al hover */}
              <div className="absolute inset-0 bg-[#072D42]/0 group-hover:bg-[#072D42]/5 transition-all duration-300" />
            </div>

            {/* Efecto de esquina decorativa */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#F29E38] opacity-60" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#F29E38] opacity-60" />
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-4 left-1/2 transform -translateX(-50%) w-20 h-1 bg-[#F29E38] rounded-full" />
      </div>

      {/* Borde lateral acentuado */}
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#F29E38] to-[#072D42] opacity-80" />
    </div>
  );
};

export default ContenedorLateral;