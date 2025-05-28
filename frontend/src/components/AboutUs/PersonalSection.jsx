import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { motion } from "framer-motion";
import jessicaImg from '../../assets/jessica.jpg';
import OvandoImg from '../../assets/ovando.jpg';
import GuidoImg from '../../assets/guido.jpg';

const cardsData = [
  {
    title: "Frontend",
    text: "Equipo encargado de dar vida a la página web, transformando código en experiencias llenas de pasión y alegría.",
    role: "Desarrolladores",
    backType: "list",
    backContent: [
      "Octavio Luna",
      "Leonardo Ibarra",
      "Leandro Colque",
      "Rodny Siles",
      "Kevin Sancalli",
      "Einar Guillen",
      "Huascar Duran",
      "Alejandro Zamorano",
    ],
  },
  {
    title: "Backend",
    text: "Estamos dando unos retoques visuales estamos dando unos retoques visuales",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Adriana Rocha",
      "Luís Paredes",
      "Carlos Pinell",
      "Tania Pérez",
      "Dilan Mamani",
      "Ignacio Retamozo",
      "Ramiro Quenta",
      "Ivonne Colque",
    ],

  },
  {
    title: "Base de datos",
    text: "Estamos dando unos retoques visuales estamos dando unos retoques visuales",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Octavio Luna",
      "Leonardo Ibarra",
      "Leandro Colque",
      "Rodny Siles",
      "Kevin Sancalli",
      "Einar Guillen",
      "Huascar Duran",
      "Alejandro Zamorano",
    ],
  },
  {
    title: "Dashboard",
    text: "Equipo encargado de dar vida a los datos de las grandes empresas bolivianas, transformando cifras históricas en un dashboard que honra su legado y proyecta su futuro con claridad y visión.",
    role: "Desarrollador",
    backType: "list",
    backContent: [
      "Adriana Rocha",
      "Luís Paredes",
      "Carlos Pinell",
      "Tania Pérez",
      "Dilan Mamani",
      "Ignacio Retamozo",
      "Ramiro Quenta",
      "Ivonne Colque",
    ],

  },
  {
    title: "Daniela Carolina Ovando Santander",
    text: "Estamos dando unos retoques visuales estamos dando unos retoques visuales",
    role: "Ingeniera que hizo posible todo esto",
    backType: "image",
    backContent: OvandoImg,
  },
  {
    title: "Jessica Doris Lanza Butrón",
    text: "Directora Administración de Empresas e Innovación Empresarial. Universidad Católica Boliviana San Pablo. Sede La Paz",
    role: "Cliente",
    backType: "image",
    backContent: jessicaImg,
  },
  {
    title: "Guido Jinés Dávila",
    text: "Estamos dando unos retoques visuales estamos dando unos retoques visuales",
    role: "Desarrollador",
    backType: "image",
    backContent: GuidoImg,
  },
];
const PersonalSection = () => {
  const [index, setIndex] = useState(0);

  const visibleCount = 4;
  const lastIndex = cardsData.length - visibleCount;

  const visibleCards = cardsData.slice(index, index + visibleCount);

  const handleNext = () => {
    if (index < lastIndex) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section style={{ textAlign: "center", padding: "1rem" }}>
      <h2
        style={{
          fontSize: "2rem",          // más grande
          fontWeight: "700",
          color: "#000000",          // negro
          marginBottom: "2rem",
          userSelect: "none",
        }}
      >
        LAS PERSONAS Y EQUIPOS QUE HICIERON POSIBLE
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.8rem",
          flexWrap: "nowrap",
          overflow: "hidden",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "0 0.5rem",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          style={{
            backgroundColor: "#154734",
            color: "#e4d0a9",
            width: 45,
            height: 45,
            borderRadius: "50%",
            fontSize: "1.7rem",
            border: "none",
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
            marginRight: 5,
            opacity: index === 0 ? 0.3 : 1,
            pointerEvents: index === 0 ? "none" : "auto",
          }}
          aria-label="Anterior"
        >
          ◀
        </motion.button>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflow: "hidden",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {visibleCards.map((card, i) => (
            <TestimonialCard key={index + i} card={card} />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          style={{
            backgroundColor: "#154734",
            color: "#e4d0a9",
            width: 45,
            height: 45,
            borderRadius: "50%",
            fontSize: "1.7rem",
            border: "none",
            cursor: "pointer",
            userSelect: "none",
            flexShrink: 0,
            marginLeft: 5,
            opacity: index === lastIndex ? 0.3 : 1,
            pointerEvents: index === lastIndex ? "none" : "auto",
          }}
          aria-label="Siguiente"
        >
          ▶
        </motion.button>
      </div>
    </section>
  );
};

export default PersonalSection;
