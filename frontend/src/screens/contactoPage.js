import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Building, GraduationCap, Users, Link2 } from 'lucide-react';

// Estilos de fuentes
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400&family=Inter:wght@100;200;300;400;500;600;700&display=swap');
  
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  
  .font-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
  
  .font-inter {
    font-family: 'Inter', sans-serif;
  }
`;

const ContactoPage = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  // Insertar estilos en el head del documento
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = fontStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Scroll handler para parallax
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 100);
      
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  const items = [
    {
      src: '/media/contactoPage/LP.png',
      alt: 'Universidad Católica Boliviana La Paz',
      text: 'Universidad Católica Boliviana\nLA PAZ',
      link: 'https://www.ucb.edu.bo/',
      hoverImg: '/media/contactoPage/UCB.png',
      icon: Building,
      asideLabel: 'UCB La Paz'
    },
    {
      src: '/media/contactoPage/SIS - H.png',
      alt: 'Carrera de Ingeniería de Sistemas',
      text: 'Carrera de Ingeniería\nde Sistemas',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-de-sistemas/',
      hoverImg: '/media/contactoPage/SIS-QR.png',
      icon: GraduationCap,
      asideLabel: 'Ing. Sistemas'
    },
    {
      src: '/media/contactoPage/IIE - H.png',
      alt: 'Carrera de Ingeniería Innovación Empresarial',
      text: 'Carrera de Ingeniería\nInnovación empresarial',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-innovacion-empresarial/',
      hoverImg: '/media/contactoPage/IIE-QR.png',
      icon: Users,
      asideLabel: 'Innovación Emp.'
    },
  ];

  return (
    <div className="min-h-screen bg-beige font-inter [&_a]:no-underline [&_a:hover]:no-underline">
      {/* HEADER ELEGANTE CON PARALLAX */}
      <div className="h-[80vh] min-h-[500px] max-h-[900px] mb-9 overflow-hidden relative">
        <header className="relative h-full">
          {/* IMAGEN DE FONDO - REEMPLAZA LA URL POR LA QUE DESEES */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={parallaxStyle}
          >
            <img 
              src="/media/contactoPage/MUEBLESB.jpg" // Cambia esta ruta por tu imagen
              alt="Contacto - Orbis Empresarial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#072D42]/60"></div>
          </div>
          
          <div className="relative z-30 p-20 lg:p-48 text-white h-full flex flex-col justify-center">
            <h1 className="font-playfair text-6xl lg:text-8xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
              Contacto
            </h1>
            
            <div className="mb-6">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
                Alianzas Institucionales
              </h2>
              <div className="h-px w-32 bg-white/70 mb-4"></div>
            </div>
            
            <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl text-white/90 leading-relaxed">
              Conectamos el legado empresarial con la innovación académica. 
              Descubre nuestras alianzas estratégicas.
            </p>
          </div>
        </header>
      </div>

      <main className="px-10 py-0">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* ASIDE ELEGANTE - STICKY NAVIGATION CON ICONOS DE ENLACE */}
          <aside className="hidden lg:block lg:w-1/5 sticky top-1/4">
            <div className={`
              transition-all duration-700 ease-in-out
              ${isHeaderShrunk 
                ? 'opacity-100' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
              }
            `}>
              <h2 className="font-playfair text-2xl leading-tight mb-4 text-[#072D42]">Contacto</h2>
              <div className="h-px w-16 bg-[#072D42]/50 mb-6"></div>
            </div>

            <nav className="flex lg:flex-col gap-0 rounded-lg overflow-hidden border border-[#9298A6]/30 bg-white/10">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    relative group flex items-center justify-between py-3 px-4 transition-all duration-300
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-full after:h-[1px] after:bg-[#9298A6]
                    after:origin-center after:transition-transform after:duration-300 after:ease-out
                    border-b border-[#9298A6]/20 last:border-b-0
                    hover:bg-[#9298A6]/10
                    font-light opacity-70 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Icono de la institución */}
                    <item.icon className="w-4 h-4 text-[#072D42] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Texto del enlace */}
                    <span className="tracking-widest text-sm text-[#072D42] font-montserrat">
                      {item.asideLabel}
                    </span>
                  </div>
                  
                  {/* Icono de enlace externo */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    
                    <ExternalLink className="w-3 h-3 text-[#072D42]" />
                  </div>
                </a>
              ))}
              
              {/* Enlace adicional para contacto general */}
              <a
                href="#contacto"
                className={`
                  relative group flex items-center justify-between py-3 px-4 transition-all duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:w-full after:h-[1px] after:bg-[#9298A6]
                  after:origin-center after:transition-transform after:duration-300 after:ease-out
                  border-b border-[#9298A6]/20 last:border-b-0
                  hover:bg-[#9298A6]/10
                  font-light opacity-70 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100
                `}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#072D42] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="tracking-widest text-sm text-[#072D42] font-montserrat">
                    Contacto General
                  </span>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Link2 className="w-3 h-3 text-[#072D42]" />
                </div>
              </a>
            </nav>

            {/* Información adicional en el aside */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-[#9298A6]/20">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-[#072D42]/70" />
                <p className="font-inter text-xs text-[#072D42]/70 font-medium">
                  Enlaces externos
                </p>
              </div>
              <p className="font-inter text-xs text-[#072D42]/60 leading-tight">
                Haz clic en cualquier institución para visitar su sitio web oficial.
              </p>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <section className="w-full lg:w-4/5">
            {/* Header con líneas decorativas */}
            <motion.header 
              className="flex items-center gap-8 mb-16 justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#072D42] to-transparent opacity-20"></div>
              <h2 className="font-playfair text-xl md:text-2xl font-normal text-[#072D42] uppercase tracking-wider whitespace-nowrap">
                ALIANZAS ESTRATÉGICAS
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#072D42] to-transparent opacity-20"></div>
            </motion.header>

            {/* Contenido principal */}
            <motion.section 
              className="bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-lg border border-[#072D42]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#072D42] mb-8 text-center font-normal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Instituciones Aliadas
              </motion.h1>
              
              <motion.p 
                className="font-inter text-lg md:text-xl text-[#072D42]/80 leading-relaxed max-w-4xl mx-auto mb-16 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Colaboramos con instituciones académicas de prestigio para preservar y estudiar 
                el legado empresarial boliviano, conectando historia con innovación.
              </motion.p>

              {/* Grid de tarjetas elegante */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-center">
                {items.map(({ src, alt, text, link, hoverImg, icon: Icon }, idx) => (
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out cursor-pointer min-h-[450px] flex flex-col items-center justify-center border border-[#072D42]/10 hover:border-[#072D42]/30 hover:bg-gradient-to-br hover:from-[#072D42] hover:to-[#0A3A5A]"
                    onMouseEnter={() => setHoverIndex(idx)}
                    onMouseLeave={() => setHoverIndex(null)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + idx * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Icono superior */}
                    <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-16 h-16 rounded-full bg-[#072D42] group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                        <Icon className="w-8 h-8 text-beige group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Imagen principal */}
                    <div className="relative mb-8">
                      <img 
                        src={src} 
                        alt={alt} 
                        className="w-32 h-32 md:w-36 md:h-36 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
                      />
                      
                      {/* Overlay de QR al hover */}
                      {hoverIndex === idx && (
                        <motion.div 
                          className="absolute top-1/2 left-full transform -translate-y-1/2 ml-6 bg-white p-4 rounded-2xl shadow-2xl z-10 w-40 h-40 flex items-center justify-center border border-[#072D42]/20"
                          initial={{ opacity: 0, x: -20, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -20, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={hoverImg} 
                            alt={`QR de ${alt}`} 
                            className="max-w-full max-h-full object-contain" 
                          />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Texto */}
                    <div className="text-center flex-grow flex flex-col justify-center">
                      <p className="font-playfair text-xl md:text-2xl font-normal text-[#072D42] group-hover:text-white text-center leading-tight whitespace-pre-line transition-colors duration-500 mb-4">
                        {text.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                      
                      {/* Enlace externo */}
                      <div className="flex items-center justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-inter text-sm text-white/80">Visitar sitio</span>
                        <ExternalLink className="w-4 h-4 text-white/80" />
                      </div>
                    </div>

                    {/* Efecto de borde superior al hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#072D42] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                  </motion.a>
                ))}
              </div>

              {/* Línea separadora elegante */}
              <div className="flex items-center justify-center mt-20 mb-12">
                <div className="h-px w-32 bg-[#072D42]/20"></div>
                <div className="mx-6">
                  <Building className="w-6 h-6 text-[#072D42]/40" />
                </div>
                <div className="h-px w-32 bg-[#072D42]/20"></div>
              </div>

              {/* Información de contacto adicional */}
              <motion.div 
                className="text-center max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="font-playfair text-2xl md:text-3xl text-[#072D42] mb-6 font-normal">
                  ¿Interesado en colaborar?
                </h3>
                <p className="font-inter text-lg text-[#072D42]/80 leading-relaxed mb-8">
                  Estamos siempre abiertos a nuevas alianzas estratégicas que fortalezcan 
                  la preservación de nuestra historia empresarial.
                </p>
                <button className="bg-[#072D42] hover:bg-[#0A3A5A] text-white px-8 py-3 rounded-lg font-montserrat font-medium tracking-wide transition-all duration-300 transform hover:scale-105">
                  Contactar Ahora
                </button>
              </motion.div>
            </motion.section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactoPage;