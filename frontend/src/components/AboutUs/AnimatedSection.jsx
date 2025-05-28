import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedSection = ({ children, style }) => {
  const [clicked, setClicked] = useState(false);
  const sectionRef = useRef(null);

  const handleMouseEnter = () => {
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll("h1, h2, h3, h4, p, span, div").forEach(el => {
        el.style.color = "#ddcba4";
      });
    }
  };

  const handleMouseLeave = () => {
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll("h1, h2, h3, h4, p, span, div").forEach(el => {
        el.style.color = "black";
      });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ scale: 1 }}
      animate={{ scale: clicked ? 1.05 : 1 }}
      whileHover={{ backgroundColor: "#154734" }}
      transition={{
        duration: clicked ? 3 : 0.3,
        type: "spring",
      }}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 3000);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: "pointer",
        borderRadius: "1rem",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        padding: "2rem",
        maxWidth: "1400px",
        margin: "0 auto 6rem",
        flexWrap: "wrap",
        color: "black", // estado base
        ...style,
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
