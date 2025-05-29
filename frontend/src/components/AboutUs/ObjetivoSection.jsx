import React from "react";
import AnimatedSection from "./AnimatedSection";

const ObjetivoSection = () => (
  <AnimatedSection
    style={{
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      flexWrap: "wrap",
    }}
  >
    <div style={{ flex: 1, minWidth: "320px" }}>
      <img
        src={require("../../assets/vita.jpg")}
        alt="Hydrant drink lineup"
        style={{ width: "100%", borderRadius: "1rem", boxShadow: "0 0 15px rgba(0,0,0,0.15)" }}
      />
    </div>
    <div style={{ flex: 1, minWidth: "320px" }}>
      <h2 style={{ fontWeight: "900", fontSize: "2.5rem", marginBottom: "1rem", color: "black" }}>
        Objetivo de nuestro trabajo
      </h2>
      <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "black" }}>
        Mostrar el aporte histórico y actual de las empresas bolivianas con más de 40 años de trayectoria,
        a través de un sistema de información que permite registrar, consultar y analizar datos clave mediante
        dashboards interactivos, rescatando su legado y su rol en el desarrollo económico y social del país.
      </p>
    </div>
  </AnimatedSection>
);

export default ObjetivoSection;
