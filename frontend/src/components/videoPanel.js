import React from "react";

const VideoPanel = ({ children, height = "50vh" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: height,
        position: "relative",
        overflow: "hidden",
        borderTop: "2px solid orange",    // borde superior naranja
        borderBottom: "2px solid orange", // borde inferior naranja
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Clonamos el children agregando los estilos necesarios directamente si es un <video> */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center", // <-- centrado vertical y horizontal
                },
              })
            : child
        )}
      </div>
    </div>
  );
};

export default VideoPanel;
