import React from "react";
import NosotrosSection from "./NosotrosSection";
import ImageSection from "./ImageSection";
import ObjetivoSection from "./ObjetivoSection";
import MisionSection from "./MisionSection";
import PersonalSection from "./PersonalSection"; // Importa el componente del carrusel

const AboutUsContainer = () => {
  return (
    <main style={{ backgroundColor: "#f8f2e7", color: "#003E73", padding: "3rem 1rem" }}>
      <NosotrosSection />
      <ObjetivoSection />
      <MisionSection />
      <PersonalSection /> {/* Aquí se muestra el carrusel con las cards */}
    </main>
  );
};

export default AboutUsContainer;
