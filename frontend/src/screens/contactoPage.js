import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactoPage = () => {
  const items = [
    {
      src: '/media/contactoPage/LP.png',
      alt: 'Universidad Católica Boliviana La Paz',
      text: 'Universidad Católica Boliviana\nLA PAZ',
      link: 'https://www.ucb.edu.bo/',
      hoverImg: '/media/contactoPage/UCB.png',
    },
    {
      src: '/media/contactoPage/SIS - H.png',
      alt: 'Carrera de Ingeniería de Sistemas',
      text: 'Carrera de Ingeniería\nde Sistemas',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-de-sistemas/',
      hoverImg: '/media/contactoPage/SIS-QR.png',
    },
    {
      src: '/media/contactoPage/IIE - H.png',
      alt: 'Carrera de Ingeniería Innovación Empresarial',
      text: 'Carrera de Ingeniería\nInnovación empresarial',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-innovacion-empresarial/',
      hoverImg: '/media/contactoPage/IIE-QR.png',
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <main className="w-full min-h-screen bg-background">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 py-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Header con líneas decorativas */}
          <motion.header 
            className="flex items-center gap-8 mb-16 justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bodoni font-bold text-primary uppercase tracking-wider whitespace-nowrap">
              EMPRESAS QUE FORJARON EL PAÍS
            </h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
          </motion.header>

          {/* Contenido principal */}
          <motion.section 
            className="bg-surface-elevated p-8 md:p-12 lg:p-16 xl:p-20 rounded-3xl shadow-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bodoni font-black text-primary mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              DEPARTAMENTOS ANHIDADOS
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl font-miles text-text-main leading-relaxed max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explora las últimas noticias, actualizaciones y promociones disponibles en nuestra plataforma.
            </motion.p>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-center">
              {items.map(({ src, alt, text, link, hoverImg }, idx) => (
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={idx}
                  className="group relative bg-surface rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[400px] flex flex-col items-center justify-center text-decoration-none"
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative mb-8">
                    <img 
                      src={src} 
                      alt={alt} 
                      className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                    {hoverIndex === idx && (
                      <motion.div 
                        className="absolute top-1/2 left-full transform -translate-y-1/2 ml-4 bg-surface-elevated p-4 rounded-2xl shadow-xl z-10 w-48 h-48 flex items-center justify-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={hoverImg} 
                          alt={`Detalle de ${alt}`} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  <p className="text-lg md:text-xl lg:text-2xl font-bodoni font-bold text-primary text-center leading-tight whitespace-pre-line">
                    {text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default ContactoPage;
