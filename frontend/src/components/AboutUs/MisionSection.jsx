import React from "react";
import AnimatedSection from "./AnimatedSection";

const MisionSection = () => (
  <AnimatedSection
    style={{
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      flexWrap: "wrap",
    }}
  >
    <div style={{ flex: 1, minWidth: "320px" }}>
      <h2 style={{ fontWeight: "900", fontSize: "2.5rem", marginBottom: "1rem", color: "black" }}>
        IMPORTANCIA DEL LEGADO EMPRESARIAL
      </h2>
      <p style={{ fontSize: "1.3rem", lineHeight: "1.6", color: "black" }}>
Las empresas bolivianas con más de 40 años no son solo testigos silenciosos de nuestra historia; son la fuerza que ha resistido los embates del tiempo, sobrevivido a cambios políticos, económicos y sociales, y se han convertido en pilares fundamentales de nuestro presente. Más que un legado, representan nuestro futuro: un recordatorio constante de que Bolivia tiene talento, capacidad y determinación para crear, innovar y prosperar.
      </p>
    </div>
    <div style={{ flex: 1, minWidth: "320px" }}>
      <img
        src={require("../../assets/quien-contra-nosotros.jpg")}
        alt="Founders of Hydrant"
        style={{ width: "100%", borderRadius: "1rem", boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
      />
    </div>
  </AnimatedSection>
);

export default MisionSection;
