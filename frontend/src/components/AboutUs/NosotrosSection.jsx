import React from "react";
import AnimatedSection from "./AnimatedSection";

const NosotrosSection = () => (
  <AnimatedSection style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
    <div style={{ flex: 1, minWidth: "320px" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem", color: "black" }}>
        LA HISTORIA DE TODOS
      </h1>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "black" }}>
        Detrás de cada empresa boliviana con más de 40 años hay una historia de lucha, innovación y compromiso con el país. Este legado no solo refleja el esfuerzo de generaciones, sino también la identidad de un pueblo que no se rinde. En "Legado Boliviano", rendimos homenaje a esas empresas que forjaron la economía nacional, que resistieron crisis, transformaron sectores y marcaron la historia con cada paso. Porque contar su historia, es contar la historia de Bolivia.
      </p>
    </div>
    <div style={{ flex: 1, minWidth: "320px", textAlign: "center" }}>
      <img
        src={require("../../assets/bolivia.jpg")}
        alt="Cargando..."
        style={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
      />
    </div>
  </AnimatedSection>
);

export default NosotrosSection;
