import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const NosotrosSection = () => (
  <AnimatedSection 
    style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "clamp(1rem, 3vw, 1.8rem)",
      flexWrap: "wrap"
    }}
    delay={0}
  >
    <motion.div 
      className="flex-1 min-w-[240px]"
      variants={{
        hidden: { opacity: 0, x: -20, scale: 0.98 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
    >
      <motion.h1 
        className="font-bodoni font-bold mb-6"
        style={{
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          color: "inherit",
          lineHeight: "1.2",
          letterSpacing: "clamp(0.01rem, 0.03rem, 0.05rem)"
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        LA HISTORIA DE TODOS
      </motion.h1>
      <motion.p 
        className="font-miles leading-relaxed"
        style={{
          fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
          color: "inherit",
          lineHeight: "1.5"
        }}
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      >
        Detrás de cada empresa boliviana con más de 40 años hay una historia de lucha, innovación y compromiso con el país. Este legado no solo refleja el esfuerzo de generaciones, sino también la identidad de un pueblo que no se rinde. En "Legado Boliviano", rendimos homenaje a esas empresas que forjaron la economía nacional, que resistieron crisis, transformaron sectores y marcaron la historia con cada paso. Porque contar su historia, es contar la historia de Bolivia.
      </motion.p>
    </motion.div>
    
    <motion.div 
      className="flex-1 min-w-[240px] text-center"
      variants={{
        hidden: { opacity: 0, x: 20, scale: 0.98 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      }}
    >
      <motion.img
        src={require("../../assets/bolivia.jpg")}
        alt="Bolivia - Historia de todos"
        className="w-full max-w-sm mx-auto rounded-xl shadow-md"
        style={{
          aspectRatio: "1.618 / 1",
          objectFit: "cover"
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.99 }}
      />
    </motion.div>
  </AnimatedSection>
);

export default NosotrosSection;
