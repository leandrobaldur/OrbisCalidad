// HistoriaPage.js - footer mejorado con imagen Bandera_bolivia + sección Misión y Visión añadida

import React from "react";
import { motion } from "framer-motion";
import VideoPanel from "../components/videoPanel";
import "./historiaStyles.css";

const HistoriaPage = () => {
  return (
    <div className="historia-container">
      {/* Header con animación decorativa */}
      <motion.div
        className="header-animado"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <svg
          className="serpentina"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#E6C67A"
            d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,106.7C672,85,768,43,864,53.3C960,64,1056,128,1152,138.7C1248,149,1344,107,1392,85.3L1440,64V0H0Z"
          ></path>
        </svg>
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        className="contenido"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="lado-izquierdo">
          <motion.div
            className="figura"
            whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src="/media/header/logo.png"
              alt="Logo Bicentenario"
              className="logo-img"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 12 }}
            />
          </motion.div>
        </div>

        <div className="lado-derecho">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            200 años de historia
          </motion.h1>

          <motion.p
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, rotate: -1 }}
            transition={{ type: "spring", bounce: 0.3, duration: 1 }}
            className="texto-principal"
          >
            Bolivia conmemora su bicentenario celebrando la rica historia, cultura y
            diversidad que caracteriza a esta nación. Desde la independencia en 1825,
            el país ha sido testigo de luchas, avances y transformaciones que han dado
            forma a su identidad. Hoy se honra a los héroes y se construye un futuro
            basado en unidad, inclusión y desarrollo sostenible. Esta es una fecha para
            recordar el pasado y proyectarse hacia un mejor porvenir.
          </motion.p>
        </div>
      </motion.div>

      {/* Sección Misión y Visión */}
      <motion.div
        className="mision-vision"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '4rem', gap: '2rem' }}
      >
        <motion.div
          className="mision-box"
          style={{ flex: '1 1 45%', backgroundColor: '#E6C67A', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          whileHover={{ scale: 1.03 }}
        >
          <h2 style={{ color: '#003E73' }}>🎯 Misión</h2>
          <p style={{ color: '#003E73' }}>
            Promover el desarrollo integral de la sociedad boliviana a través de la educación, cultura y compromiso con los valores que construyen una nación inclusiva, solidaria y sostenible.
          </p>
          <img src="/media/mision.png" alt="Imagen Misión" style={{ width: '100%', marginTop: '1rem', borderRadius: '0.5rem' }} />
        </motion.div>

        <motion.div
          className="vision-box"
          style={{ flex: '1 1 45%', backgroundColor: '#E6C67A', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          whileHover={{ scale: 1.03 }}
        >
          <h2 style={{ color: '#003E73' }}>🌟 Visión</h2>
          <p style={{ color: '#003E73' }}>
            Ser referente de inspiración para las futuras generaciones, liderando con innovación, equidad y responsabilidad social hacia el bicentenario de Bolivia y más allá.
          </p>
          <img src="/media/vision.png" alt="Imagen Visión" style={{ width: '100%', marginTop: '1rem', borderRadius: '0.5rem' }} />
        </motion.div>
      </motion.div>

      {/* Video */}
      <motion.div
        className="video-panel-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <VideoPanel height="60vh">
          <video src="/media/homePage/video.webm" autoPlay muted loop />
        </VideoPanel>
      </motion.div>

      {/* Footer completo */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="footer-logo">
            <img src="/media/header/logo.png" alt="Logo" className="footer-img" />
          </div>
          <div className="footer-links">
            <a href="/">Inicio</a>
            <a href="/contacto">Contacto</a>
            <a href="/equipo">Equipo</a>
          </div>
          <div className="footer-flag">
            <img src="/media/header/Bandera_bolivia.png" alt="Bandera Bolivia" style={{ width: '60px', height: 'auto', marginTop: '10px' }} />
          </div>
        </div>
        <div className="footer-copy" style={{ marginTop: '1rem' }}>© 2025 Bicentenario UCB. Todos los derechos reservados.</div>
      </motion.footer>
    </div>
  );
};

export default HistoriaPage;