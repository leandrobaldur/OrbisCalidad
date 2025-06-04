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
  const ovaloAncho = `calc(${ancho} * 0.4)`; // 40% del ancho del contenedor
  const ovaloAlto = `calc(${alto} * 0.10)`;  // 15% del alto del contenedor

  return (
   <div
      className="relative flex flex-col items-center justify-start z-10 shadow-xl ml-auto"
      style={{
        width: ancho, // Ancho del contenedor
        height: alto, // Alto del contenedor
        border: `0.4vh solid #012026`, // Borde azul oscuro con grosor reducido a 1px
        borderRadius: `${cuadroRedondez} 0 0 ${cuadroRedondez}`, // Sin redondez en la parte derecha 
        backgroundColor: "#FCF6F3", // Fondo blanco
        marginTop: "5vh", // Ajustamos un poco más abajo el contenedor
        color: "#000000", // Texto negro por defecto dentro del contenedor
      }}
    >
      {/* Contenedor padre que incluye el óvalo y el contenido */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Subtítulo en óvalo blanco con texto negro y borde naranja en la letra */}
        <div
            className="absolute bg-[#FCF4F3] text-black text-center font-semibold shadow px-1 py-2 flex items-center justify-center"
            style={{
              fontWeight: 360,
              lineHeight: 1.2,
              letterSpacing: "0.12rem",
              fontSize: "clamp(1rem, 2.5vw, 1.854rem)",
              color: "#01213B",
              fontFamily: "Century Gothic",
              borderRadius: ovaloRedondez,
              left: "35%",       // mueve a la izquierda desde 50%
              top: "-5%",        // sube un poco arriba
              transform: "translateX(-50%)",
              maxWidth: ovaloAncho,
              width: "90%",
              height: ovaloAlto,
              border: "0.2vh solid black",
              textShadow: `
                -0.25px -0.25px 0 black,
                0.25px -0.25px 0 black,
                -0.25px 0.25px 0 black,
                0.25px 0.25px 0 black
              `,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
          {subtitulo}
        </div>

         {/* Contenido dentro del contenedor */}
        <div className="w-full text-black text-sm text-center space-y-10 mt-28 vh-10">
          {/* Agregamos margen superior al texto */}
          <p className="leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg">
            {texto}
          </p>

          <div className="flex justify-center">
            
            <img
              src={imagen}
              alt="contenido dinámico"
              className="rounded-lg object-contain max-w-[90%] max-h-[30vh]"
              style={{
                width: "70%",         // Ocupa más del 70% del ancho (ajusta según te guste)
                maxHeight: "70vh",    // Limita la altura para que no crezca demasiado
                height: "auto",
                objectFit: "contain", // Para que no se recorte ni deforme
                borderRadius: ovaloRedondez,
                display: "block",
                margin: "0 auto",     // Centrar horizontalmente
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;
