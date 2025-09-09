import React from "react";

const BarraHorizontal = ({
  texto,
  height = "10vh",
  margenHorizontal = "10vw",
  imagen,
}) => {
  // Las propiedades dinámicas como la imagen de fondo, el alto del contenedor
  // y el ancho de las barras laterales se manejan con objetos de estilo.
  // Esta es la práctica recomendada cuando se trabaja con valores que vienen de props.
  const containerStyle = { height };

  const imageStyle = {
    backgroundImage: `url(${imagen})`,
    width: margenHorizontal,
  };

  return (
    <div style={containerStyle} className="w-full flex items-center overflow-hidden">
      <div
        style={imageStyle}
        // Clases de Tailwind para el estilo y repetición de la imagen
        className="bg-repeat-x bg-center h-[60%] flex-shrink-0 bg-[length:auto_100%]"
      />
      <div
        // Aplicamos la fuente Bodoni, el color primario y un espaciado de letras amplio
        // para lograr un efecto de título elegante y minimalista.
        className="flex-grow h-full flex items-center justify-center font-bodoni text-primary text-lg tracking-[0.35em] transform -translate-y-[2%]"
      >
        {texto}
      </div>
      <div
        style={imageStyle}
        className="bg-repeat-x bg-center h-[60%] flex-shrink-0 bg-[length:auto_100%]"
      />
    </div>
  );
};

export default BarraHorizontal;
