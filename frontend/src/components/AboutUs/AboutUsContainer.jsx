import React from "react";
import NosotrosSection from "./NosotrosSection";
import ImageSection from "./ImageSection";
import ObjetivoSection from "./ObjetivoSection";
import MisionSection from "./MisionSection";
import PersonalSection from "./PersonalSection";

const AboutUsContainer = () => {
  return (
    <main className="w-full min-h-screen bg-background text-text-main">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 py-8">
        <div className="max-w-[1440px] mx-auto space-y-16">
          <NosotrosSection />
          <ObjetivoSection />
          <MisionSection />
          <PersonalSection />
        </div>
      </div>
    </main>
  );
};

export default AboutUsContainer;
