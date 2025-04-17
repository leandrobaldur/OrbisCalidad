import React from "react";

const ContenedorLateral = ({
  subtitulo,
  texto,
  imagen,
  ancho,
  alto,
  ovaloRedondez,
  cuadroRedondez,
}) => {
  // Calculamos el tamaño proporcional del óvalo
  const ovaloAncho = `calc(${ancho} * 0.3)`; // 40% del ancho del contenedor
  const ovaloAlto = `calc(${alto} * 0.10)`;  // 15% del alto del contenedor

  return (
    <div
      className="relative flex flex-col items-center justify-start z-10 shadow-2xl ml-auto"
      style={{
        width: ancho, // Ancho del contenedor
        height: alto, // Alto del contenedor
        borderRadius: `${cuadroRedondez} 0 0 ${cuadroRedondez}`,        // Sin redondez en la parte  derecha 
        backgroundColor: "#202020", // Fondo gris para el contenedor grande
        marginTop: "5vh", // Ajustamos un poco más abajo el contenedor
      }}
    >
      {/* Contenedor padre que incluye el óvalo y el contenido */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Subtítulo en óvalo blanco */}
        <div
          className="absolute bg-white text-black text-center font-semibold shadow px-6 py-2 text-sm md:text-base lg:text-lg flex items-center justify-center"
          style={{
            borderRadius: ovaloRedondez, // Redondez dinámica del óvalo
            left: "30%", // Centramos el óvalo horizontalmente
            transform: "translateX(-50%)", // Para que se mantenga centrado
            width: ovaloAncho, // Ancho del óvalo
            height: ovaloAlto, // Altura del óvalo
            top: `calc(${alto} * -0.05)`, // Ajustamos un poco más arriba el óvalo
            border: "2px solid black", // Borde negro para el óvalo blanco
          }}
        >
          {subtitulo}
        </div>

        {/* Contenido dentro del contenedor */}
        <div className="w-full text-white text-sm text-center space-y-9 mt-16">
          {/* Agregamos margen superior al texto */}
          <p className="leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            {texto}
          </p>

          <div className="flex justify-center">
            <img
              src={imagen}
              alt="contenido dinámico"
              className="rounded-lg object-contain max-w-[90%] max-h-[30vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;
