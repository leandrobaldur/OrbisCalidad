import React from "react";

const BarraHorizontal = ({
  texto,
  height = "10vh",
  margenHorizontal = "10vw",
  imagen,
}) => {
  const containerStyle = {
    width: "100%",
    height,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  };

  const imagenStyle = {
    backgroundImage: `url(${imagen})`,
    backgroundRepeat: "repeat-x",
    backgroundPosition: "center",
    backgroundSize: "auto 100%",
    height: "60%",
    width: margenHorizontal,
    flexShrink: 0,
    margin: 0,  // Sin separación
    padding: 0,
  };

  const textoStyle = {
    color: "#001E15", // ← Color de texto actualizado
    flexGrow: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2vh",
    fontWeight: "bold",
    fontFamily: "Century Gothic",
    margin: 0,
    padding: 0,
    lineHeight: "normal",
    transform: "translateY(-2%)", // Ajuste fino
    letterSpacing: "0.35em", // ← Espacio entre letras aumentado
  };
  

  return (
    <div style={containerStyle}>
      <div style={imagenStyle} />
      <div style={textoStyle}>{texto}</div>
      <div style={imagenStyle} />
    </div>
  );
};

export default BarraHorizontal;
