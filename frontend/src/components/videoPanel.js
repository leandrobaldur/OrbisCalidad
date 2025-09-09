import React from "react";

const VideoPanel = ({ children, height = "50vh" }) => {
  // La altura es una prop dinámica, por lo que la manejamos con un objeto de estilo.
  // Es la forma más limpia cuando el valor no es fijo.
  const panelStyle = {
    height: height,
  };

  return (
    <div
      style={panelStyle}
      // REFACTORIZACIÓN A TAILWIND:
      // 1. Reemplazamos los estilos en línea por clases de utilidad.
      // 2. Usamos `border-primary` de tu paleta de colores personalizada.
      // 3. El grosor del borde (0.7vh) se aplica con la sintaxis de valores arbitrarios de Tailwind.
      className="w-full relative overflow-hidden border-t-[0.7vh] border-b-[0.7vh] border-primary"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Clonamos el `children` para aplicarle clases en lugar de estilos en línea. */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                // Estas clases aseguran que el video (o cualquier otro elemento)
                // llene el panel y se mantenga centrado.
                className: "w-full h-full object-cover object-center",
              })
            : child
        )}
      </div>
    </div>
  );
};

export default VideoPanel;
