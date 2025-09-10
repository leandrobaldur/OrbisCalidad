import React from "react";

const BarraHorizontal = ({
  texto,
  height = "clamp(0.3vh, 0.8vh, 1vh)", // Aún más delgada
  margenHorizontal = "clamp(3vw, 4vw, 4vw)", // Márgenes más pequeños
  imagen,
}) => {
  const containerStyle = { height };

  const imageStyle = {
    backgroundImage: `url(${imagen})`,
    width: margenHorizontal,
    margin: 0,
  };

  return (
    <div 
      style={{
        ...containerStyle,
        borderTopWidth: '0.1px',
        borderBottomWidth: '0.1px',
        padding: 0,
        margin: 0
      }}
      className="w-full flex items-center overflow-hidden bg-surface border-stroke shadow-sm"
    >
      <div
        style={imageStyle}
        className="bg-repeat-x bg-center h-[40%] flex-shrink-0 bg-[length:auto_100%] opacity-50"
      />
      <div
        className="flex-grow h-full flex items-center justify-center font-bodoni text-black text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] tracking-wider transform -translate-y-[1%] font-bold uppercase px-0"
      >
        {texto}
      </div>
      <div
        style={imageStyle}
        className="bg-repeat-x bg-center h-[40%] flex-shrink-0 bg-[length:auto_100%] opacity-50"
      />
    </div>
  );
};

export default BarraHorizontal;
