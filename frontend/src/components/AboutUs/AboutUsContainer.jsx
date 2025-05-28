import React from "react";
import NosotrosSection from "./NosotrosSection";
import ImageSection from "./ImageSection";
import ObjetivoSection from "./ObjetivoSection";
import MisionSection from "./MisionSection";
import PersonalSection from "./PersonalSection"; // Importa el nuevo componente

const AboutUsContainer = () => {
  return (
    <main style={{ backgroundColor: "#f8f2e7", color: "#003E73", padding: "3rem 1rem" }}>
      <NosotrosSection />
      <ObjetivoSection />
      <MisionSection />
      <PersonalSection />
    </main>
  );
};

export default AboutUsContainer;
