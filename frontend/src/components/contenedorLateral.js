import React from "react";

const ContenedorLateral = ({
  subtitulo,
  imagen,
  ancho,
  alto,
  ovaloRedondez,
  cuadroRedondez,
}) => {
  // Responsive oval dimensions
  const ovaloAncho = "clamp(200px, 40%, 300px)";
  const ovaloAlto = "clamp(40px, 8vh, 60px)";

  return (
    <div
      className="relative flex flex-col items-center justify-start z-10 ml-auto bg-surface-elevated border border-stroke"
      style={{
        width: ancho,
        height: alto,
        borderColor: '#072D42', // Color primary (azul marino) de la paleta
        borderWidth: 'clamp(2px, 0.618vh, 4px)',
        borderStyle: 'solid',
        borderRadius: `${cuadroRedondez} 0 0 ${cuadroRedondez}`,
        marginTop: "clamp(2rem, 6.18vh, 4rem)",
      }}
    >
      {/* Contenedor padre que incluye el óvalo y el contenido */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Subtítulo en óvalo - Ajustado para mejor ajuste del texto */}
        <div
          className="absolute bg-surface-elevated shadow-md px-3 md:px-6 lg:px-8 py-2 md:py-3 flex items-center justify-center border border-stroke"
          style={{
            letterSpacing: "clamp(0.05rem, 0.1rem, 0.15rem)", // Reducido para mejor ajuste
            fontSize: "clamp(0.75rem, 1vw, 1.25rem)", // Reducido para que entre mejor
            borderRadius: ovaloRedondez,
            left: "50%",
            top: "clamp(-10%, -8%, -5%)", // Ajustado para mejor posicionamiento
            transform: "translateX(-50%)",
            maxWidth: "clamp(250px, 45%, 350px)", // Aumentado para acomodar el texto
            width: "auto",
            minWidth: "clamp(220px, 40%, 300px)", // Aumentado
            height: "clamp(45px, 9vh, 65px)", // Aumentado para acomodar el texto
            borderColor: '#E5E7EB',
            borderWidth: 'clamp(1px, 0.1618vh, 2px)',
            borderStyle: 'solid',
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span className="font-bodoni text-black font-bold text-center leading-tight">
            {subtitulo}
          </span>
        </div>

        {/* Contenido dentro del contenedor - Espaciado áureo ajustado */}
        <div
          className="w-full text-sm text-center"
          style={{
            marginTop: "clamp(3.5rem, 9vh, 6rem)", // Aumentado para compensar el óvalo más grande
          }}
        >
          {/* Contenedor de la imagen - Dimensiones áureas con márgenes */}
          <div
            className="flex justify-center items-center relative"
            style={{
              width: "clamp(200px, 55%, 380px)", // Reducido para dar espacio a márgenes
              height: "clamp(140px, 35vh, 280px)", // Reducido para dar espacio a márgenes
              margin: "0 auto",
              padding: "clamp(1rem, 2.5vw, 2rem)", // Márgenes internos
              overflow: "hidden",
              borderRadius: ovaloRedondez,
            }}
          >
            <img
              src={imagen}
              alt="contenido dinámico"
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              style={{
                borderRadius: ovaloRedondez,
                display: "block",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;

