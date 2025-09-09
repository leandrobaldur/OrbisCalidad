import React from "react";

const ContenedorLateral = ({
  subtitulo,
  imagen,
  ancho,
  alto,
  ovaloRedondez,
  cuadroRedondez,
}) => {
  // Se mantiene la lógica original para calcular el tamaño del óvalo
  const ovaloAncho = `calc(${ancho} * 0.4)`; // 40% del ancho del contenedor
  const ovaloAlto = `calc(${alto} * 0.10)`;  // 10% del alto del contenedor

  return (
    <div
      // Se aplican las clases de Tailwind para el color de fondo y la sombra.
      // Los estilos dinámicos se mantienen en el objeto `style`.
      className="relative flex flex-col items-center justify-start z-10 shadow-xl ml-auto"
      style={{
        width: ancho,
        height: alto,
        // APLICACIÓN DE ESTILOS: Se usa el color 'primary' de tu paleta para el borde.
        borderColor: '#072D42', // Usamos el valor directo porque Tailwind no puede interpretar `border-primary` con un grosor dinámico en `style`.
        borderWidth: '0.4vh',
        borderStyle: 'solid',
        borderRadius: `${cuadroRedondez} 0 0 ${cuadroRedondez}`,
        marginTop: "5vh",
      }}
    >
      {/* Contenedor padre que incluye el óvalo y el contenido */}
      <div className="relative w-full h-full flex flex-col items-center justify-start">
        {/* Subtítulo en óvalo */}
        <div
          // APLICACIÓN DE ESTILOS: Clases para fondo, sombra y layout.
          className="absolute bg-surface shadow px-1 py-2 flex items-center justify-center"
          style={{
            // Se mantiene la lógica de posicionamiento y tamaño original.
            letterSpacing: "0.12rem",
            fontSize: "clamp(1rem, 2.5vw, 1.854rem)",
            borderRadius: ovaloRedondez,
            left: "35%",
            top: "-5%",
            transform: "translateX(-50%)",
            maxWidth: ovaloAncho,
            width: "100%",
            height: ovaloAlto,
            // APLICACIÓN DE ESTILOS: Se usa el color 'stroke' para el borde.
            borderColor: '#BFAEA4',
            borderWidth: '0.2vh',
            borderStyle: 'solid',
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {/* APLICACIÓN DE ESTILOS: Se aplica la fuente Bodoni y el color primario. */}
          <span className="font-bodoni text-primary">
            {subtitulo}
          </span>
        </div>

        {/* Contenido dentro del contenedor */}
        <div
          className="w-full text-sm text-center"
          style={{
            marginTop: "5vw",
          }}
        >
          {/* Contenedor de la imagen */}
          <div
            style={{
              width: "40vw",
              height: "50vw",
              display: "flex",
              transform: "translate(40%, -10%)",
              overflow: "hidden",
            }}
          >
            <img
              src={imagen}
              alt="contenido dinámico"
              className="object-contain" // object-contain es suficiente, el resto se controla en `style`
              style={{
                width: "100%",
                height: "100%",
                borderRadius: ovaloRedondez,
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;

