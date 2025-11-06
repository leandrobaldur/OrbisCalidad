import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Crown,
  Cpu,
  Component,
  Palette,
  Database,
  LineChart,
  Mail,
  Linkedin,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

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

  .header-icon-button {
    all: unset;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
    outline: none;
  }

  .header-icon-button:focus {
    outline: none;
    ring: none;
  }

  .header-icon-button:hover {
    background: none !important;
    border: none !important;
  }

  /* Estilos responsivos para textos */
  .responsive-title {
    font-size: clamp(2rem, 5vw, 5rem);
    line-height: 0.9;
  }

  .responsive-subtitle {
    font-size: clamp(0.875rem, 2vw, 1.5rem);
  }

  .responsive-description {
    font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  }

  .responsive-section-title {
    font-size: clamp(1.5rem, 3vw, 3rem);
  }

  .responsive-member-name {
    font-size: clamp(0.875rem, 1.25vw, 1.125rem);
  }

  .responsive-member-position {
    font-size: clamp(0.75rem, 1vw, 0.875rem);
  }

  .responsive-join-title {
    font-size: clamp(1.5rem, 3.5vw, 3rem);
  }

  .responsive-join-text {
    font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  }
`;

// Componente Reveal
const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-all duration-700 ease-out ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8'
    }`}>
      {children}
    </div>
  );
};

const EquipoPage = () => {
  const [activeSection, setActiveSection] = useState('delegacion');
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [asideBottom, setAsideBottom] = useState('auto');
  const sectionRefs = useRef({});
  const asideRef = useRef(null);
  const uneteRef = useRef(null);
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

  // Scroll handler para parallax, sticky navigation y cálculo del aside
  useEffect(() => {
    const calculateAsideBottom = () => {
      const aside = asideRef.current;
      const uneteSection = uneteRef.current;
      
      if (!aside || !uneteSection) return;
      
      const asideRect = aside.getBoundingClientRect();
      const uneteRect = uneteSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Cuando la sección "Únete" está cerca del aside (2rem de margen)
      if (uneteRect.top < viewportHeight - 2 * 16) {
        const distanceFromBottom = viewportHeight - uneteRect.top + 2 * 16;
        setAsideBottom(`${distanceFromBottom / 16}rem`);
      } else {
        setAsideBottom('2rem'); // Margen normal de 2rem
      }
    };

    const handleScroll = () => {
      setIsHeaderShrunk(window.scrollY > 100);
      
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          calculateAsideBottom();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }

      const sections = ['delegacion', 'backend', 'frontend', 'diseno', 'basedatos', 'dashboard', 'unete'];
      const scrollPosition = window.scrollY + 12.5 * 16; // 200px en rem (12.5rem)

      for (const sectionId of sections) {
        const element = sectionRefs.current[sectionId];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateAsideBottom);
    
    // Calcular inicialmente
    calculateAsideBottom();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateAsideBottom);
    };
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = sectionRefs.current[id];
    if (!el) return;
    
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 6.25 * 16; // 100px en rem (6.25rem)
    
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setActiveSection(id);
  };

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  // Secciones con iconos y colores de fondo alternados
  const sections = [
    { 
      id: 'delegacion', 
      label: 'LIDERAZGO', 
      icon: Crown,
      bgColor: 'bg-white' // Fondo blanco
    },
    { 
      id: 'backend', 
      label: 'BACKEND', 
      icon: Cpu,
      bgColor: 'bg-gray-50' // Fondo gris claro
    },
    { 
      id: 'frontend', 
      label: 'FRONTEND', 
      icon: Component,
      bgColor: 'bg-white' // Fondo blanco
    },
    { 
      id: 'diseno', 
      label: 'DISEÑO', 
      icon: Palette,
      bgColor: 'bg-gray-50' // Fondo gris claro
    },
    { 
      id: 'basedatos', 
      label: 'BASE DE DATOS', 
      icon: Database,
      bgColor: 'bg-white' // Fondo blanco
    },
    { 
      id: 'dashboard', 
      label: 'ANALITYCS', 
      icon: LineChart,
      bgColor: 'bg-gray-50' // Fondo gris claro
    }
  ];

  // Logos de los cuerpos
  const bodyLogos = [
    { id: 'delegacion', name: 'Liderazgo', icon: Crown, section: 'delegacion' },
    { id: 'backend', name: 'Backend', icon: Cpu, section: 'backend' },
    { id: 'frontend', name: 'Frontend', icon: Component, section: 'frontend' },
    { id: 'diseno', name: 'Diseño', icon: Palette, section: 'diseno' },
    { id: 'basedatos', name: 'Base de Datos', icon: Database, section: 'basedatos' },
    { id: 'dashboard', name: 'Analytics', icon: LineChart, section: 'dashboard' }
  ];

  // Datos de ejemplo del equipo con email y LinkedIn
  const teamMembers = {
    delegacion: [
      { 
        id: 1, 
        name: 'Ana Rodríguez', 
        position: 'Project Manager', 
        skills: ['Liderazgo', 'Estrategia', 'Gestión'],
        email: 'ana.rodriguez@orbis.com',
        linkedin: 'https://linkedin.com/in/ana-rodriguez'
      },
      { 
        id: 2, 
        name: 'Carlos Méndez', 
        position: 'Líder de Equipo', 
        skills: ['Coordinación', 'Planificación', 'Mentoría'],
        email: 'carlos.mendez@orbis.com',
        linkedin: 'https://linkedin.com/in/carlos-mendez'
      },
      { 
        id: 3, 
        name: 'María Fernández', 
        position: 'Coordinadora', 
        skills: ['Organización', 'Comunicación', 'Logística'],
        email: 'maria.fernandez@orbis.com',
        linkedin: 'https://linkedin.com/in/maria-fernandez'
      },
      { 
        id: 3, 
        name: 'María Fernández', 
        position: 'Coordinadora', 
        skills: ['Organización', 'Comunicación', 'Logística'],
        email: 'maria.fernandez@orbis.com',
        linkedin: 'https://linkedin.com/in/maria-fernandez'
      }
    ],
    backend: [
      { 
        id: 1, 
        name: 'Javier López', 
        position: 'Senior Backend Dev', 
        skills: ['Node.js', 'Python', 'APIs'],
        email: 'javier.lopez@orbis.com',
        linkedin: 'https://linkedin.com/in/javier-lopez'
      },
      { 
        id: 2, 
        name: 'Laura Martínez', 
        position: 'API Specialist', 
        skills: ['REST', 'GraphQL', 'Microservicios'],
        email: 'laura.martinez@orbis.com',
        linkedin: 'https://linkedin.com/in/laura-martinez'
      }
    ],
    frontend: [
      { 
        id: 1, 
        name: 'Sofía García', 
        position: 'Frontend Lead', 
        skills: ['React', 'TypeScript', 'UX'],
        email: 'sofia.garcia@orbis.com',
        linkedin: 'https://linkedin.com/in/sofia-garcia'
      },
      { 
        id: 2, 
        name: 'Miguel Ángel Torres', 
        position: 'UI/UX Developer', 
        skills: ['Figma', 'Prototipado', 'Design Systems'],
        email: 'miguel.torres@orbis.com',
        linkedin: 'https://linkedin.com/in/miguel-torres'
      },
      { 
        id: 3, 
        name: 'Elena Vargas', 
        position: 'React Specialist', 
        skills: ['Hooks', 'Context', 'Performance'],
        email: 'elena.vargas@orbis.com',
        linkedin: 'https://linkedin.com/in/elena-vargas'
      }
    ],
    diseno: [
      { 
        id: 1, 
        name: 'Claudia Rojas', 
        position: 'Diseñadora Gráfica', 
        skills: ['Illustrator', 'Branding', 'Tipografía'],
        email: 'claudia.rojas@orbis.com',
        linkedin: 'https://linkedin.com/in/claudia-rojas'
      },
      { 
        id: 2, 
        name: 'Ricardo Fuentes', 
        position: 'UX Researcher', 
        skills: ['User Testing', 'Wireframes', 'Prototipos'],
        email: 'ricardo.fuentes@orbis.com',
        linkedin: 'https://linkedin.com/in/ricardo-fuentes'
      }
    ],
    basedatos: [
      { 
        id: 1, 
        name: 'Roberto Silva', 
        position: 'Database Architect', 
        skills: ['SQL', 'MongoDB', 'Optimización'],
        email: 'roberto.silva@orbis.com',
        linkedin: 'https://linkedin.com/in/roberto-silva'
      },
      { 
        id: 2, 
        name: 'Carolina Ríos', 
        position: 'Data Analyst', 
        skills: ['ETL', 'Power BI', 'Estadística'],
        email: 'carolina.rios@orbis.com',
        linkedin: 'https://linkedin.com/in/carolina-rios'
      },
      { 
        id: 3, 
        name: 'Andrés Castillo', 
        position: 'DB Administrator', 
        skills: ['Seguridad', 'Backups', 'Monitorización'],
        email: 'andres.castillo@orbis.com',
        linkedin: 'https://linkedin.com/in/andres-castillo'
      }
    ],
    dashboard: [
      { 
        id: 1, 
        name: 'Patricia Navarro', 
        position: 'Dashboard Designer', 
        skills: ['DataViz', 'Tableau', 'Storytelling'],
        email: 'patricia.navarro@orbis.com',
        linkedin: 'https://linkedin.com/in/patricia-navarro'
      },
      { 
        id: 2, 
        name: 'Fernando Jiménez', 
        position: 'Data Visualization', 
        skills: ['D3.js', 'Chart.js', 'Animaciones'],
        email: 'fernando.jimenez@orbis.com',
        linkedin: 'https://linkedin.com/in/fernando-jimenez'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-beige font-inter [&_a]:no-underline [&_a:hover]:no-underline">
      
      {/* HEADER MEJORADO - COMPLETAMENTE RESPONSIVE */}
      <div className="h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[20rem] md:min-h-[25rem] max-h-[40rem] md:max-h-[50rem] mb-6 md:mb-9 overflow-hidden relative">
        <header className="relative h-full">
          <div className="absolute inset-0 w-full h-full overflow-hidden" style={parallaxStyle}>
            <img 
              src="/media/historiapage/futbol.jpg"
              alt="Nuestro Equipo - Orbis Empresarial"
              className="w-full h-full object-cover object-top"
            />
            {/* FONDO MÁS OSCURO */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          <div className="relative z-30 p-4 sm:p-6 lg:p-8 xl:p-20 text-white h-full flex flex-col justify-center items-center text-center">
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              
              {/* TÍTULO PRINCIPAL CON CLAMP */}
              <div className="mb-4 md:mb-6 lg:mb-8">
                <h1 className="font-playfair responsive-title font-normal tracking-tight mb-2 md:mb-3 lg:mb-4 text-white">
                  Nuestro Equipo
                </h1>
              </div>
              
              {/* SUBTÍTULO CON CLAMP */}
              <div className="mb-4 md:mb-6 lg:mb-8">
                <h2 className="font-montserrat responsive-subtitle font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/95 mb-2 md:mb-3">
                  Talento y Excelencia
                </h2>
                <div className="h-px w-16 sm:w-20 md:w-24 lg:w-32 bg-white/80 mb-2 md:mb-3 lg:mb-4 mx-auto"></div>
              </div>
              
              {/* DESCRIPCIÓN CON CLAMP */}
              <div className="mb-6 md:mb-8 lg:mb-12">
                <p className="font-inter responsive-description font-extralight tracking-wide max-w-4xl mx-auto text-white/95 leading-relaxed px-2 sm:px-4">
                  Conoce al equipo profesional detrás de Orbis Empresarial. 
                  Expertos comprometidos con la excelencia y la innovación.
                </p>
              </div>

              {/* LOGOS EN CAJITA - VERSIÓN RESPONSIVE MEJORADA */}
              <div className="relative z-10 -mt-4 md:-mt-6 lg:-mt-8 px-2 sm:px-4 mb-6 md:mb-8 lg:mb-12">
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg border border-white/20 p-3 md:p-4 lg:p-6">
                    
                    {/* VERSIÓN MÓVIL PEQUEÑA - GRID 3 COLUMNAS */}
                    <div className="block md:hidden">
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {bodyLogos.map((body) => {
                          const IconComponent = body.icon;
                          return (
                            <div key={body.id} className="text-center group">
                              <button
                                onClick={(e) => scrollTo(e, body.section)}
                                className="header-icon-button w-full"
                              >
                                <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 mb-1.5 sm:mb-2 mx-auto w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                                <div className="text-xs font-light text-white/90 font-montserrat tracking-wide leading-tight line-clamp-2">
                                  {body.name}
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* VERSIÓN ESCRITORIO - GRID 6 COLUMNAS */}
                    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
                      {bodyLogos.map((body) => {
                        const IconComponent = body.icon;
                        return (
                          <div key={body.id} className="text-center group">
                            <button
                              onClick={(e) => scrollTo(e, body.section)}
                              className="header-icon-button w-full"
                            >
                              <div className="bg-white/10 rounded-lg md:rounded-xl p-2 md:p-3 mb-2 md:mb-3 mx-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                <IconComponent className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                              </div>
                              <div className="text-xs md:text-sm font-light text-white/90 font-montserrat tracking-wide line-clamp-2">
                                {body.name}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    
                  </div>
                </div>
              </div>
              
              {/* BOTÓN DE SCROLL PARA MÓVIL */}
              <div className="block md:hidden mt-2">
                <button 
                  onClick={(e) => scrollTo(e, 'delegacion')}
                  className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg font-montserrat font-medium tracking-wide transition-all duration-300 transform hover:scale-105 text-sm border border-white/30"
                >
                  Conocer Equipo
                </button>
              </div>
              
            </div>
          </div>
          
          {/* INDICADOR DE SCROLL */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/80 transform rotate-90" />
            </div>
          </div>
        </header>
      </div>

      <main className="py-0">
        {/* NAVEGACIÓN MÓVIL MEJORADA */}
        <div className="block lg:hidden mb-6 px-4 sm:px-6">
          <nav className="flex flex-row gap-1 sm:gap-2 overflow-x-auto py-3 scrollbar-hide">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => scrollTo(e, s.id)}
                className={`
                  relative text-left py-2 px-3 transition-colors duration-200 whitespace-nowrap
                  rounded-lg border border-[#9298A6]/30 bg-white/10
                  hover:bg-[#9298A6]/10 flex-shrink-0
                  ${
                    activeSection === s.id 
                      ? 'bg-[#9298A6]/20 font-medium'
                      : 'font-light opacity-80 hover:opacity-100'
                  }
                `}
              >
                <span className="tracking-widest text-xs sm:text-sm text-[#072D42] font-montserrat">{s.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start px-4 sm:px-6 lg:px-8">
          {/* ASIDE STICKY AL 40% */}
          <aside 
            ref={asideRef}
            className="hidden lg:block lg:w-[20%] sticky" // 40% del ancho
            style={{ 
              top: '10rem',
              bottom: asideBottom 
            }}
          >
            <nav className="flex lg:flex-col gap-0 rounded-lg overflow-hidden border border-[#9298A6]/30 bg-white/10">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => scrollTo(e, s.id)}
                  className={`
                    relative group flex items-center justify-between py-3 px-4 transition-all duration-300
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:w-full after:h-[1px] after:bg-[#9298A6]
                    after:origin-center after:transition-transform after:duration-300 after:ease-out
                    border-b border-[#9298A6]/20 last:border-b-0
                    hover:bg-[#9298A6]/10
                    ${
                      activeSection === s.id 
                        ? 'font-medium opacity-100 after:scale-x-100 bg-[#9298A6]/20'
                        : 'font-extralight opacity-70 hover:opacity-100 after:scale-x-0 hover:after:scale-x-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <s.icon className="w-4 h-4 text-[#072D42] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`
                      tracking-widest text-sm text-[#072D42] font-montserrat
                      ${activeSection === s.id ? 'font-semibold' : 'font-extralight'}
                    `}>
                      {s.label}
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-3 h-3 text-[#072D42]" />
                  </div>
                </a>
              ))}
            </nav>
          </aside>

          {/* CONTENIDO PRINCIPAL AL 60% */}
          <section className="w-full lg:w-[80%] flex flex-col px-0">
            {sections.map((section, index) => (
              <div key={section.id} className={section.bgColor}>
                {/* SEPARADORES RESPONSIVOS */}
                {index > 0 && sections[index - 1].bgColor === section.bgColor && (
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#072D42]/10 to-transparent"></div>
                )}

                {index > 0 && sections[index - 1].bgColor !== section.bgColor && (
                  <div className="h-2 w-full bg-gradient-to-b from-gray-50 to-white"></div>
                )}

                <div
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="scroll-mt-24"
                >
                  <div className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
                    <Reveal delay={index * 100}>
                      <div className="mb-8 md:mb-12 lg:mb-16 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                          <h2 className="font-playfair responsive-section-title text-[#072D42] font-normal">
                            {section.label}
                          </h2>
                        </div>
                        <div className="h-px w-16 sm:w-20 bg-[#072D42]/60 mx-auto"></div>
                      </div>
                    </Reveal>

                    {/* TARJETAS COMPACTAS MEJORADAS Y RESPONSIVAS */}
                    <div className="flex justify-center">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-8xl">                        {teamMembers[section.id].map((member, memberIndex) => (
                          <Reveal key={member.id} delay={(index * 100) + (memberIndex * 100)}>
                            <div className="relative bg-white rounded-xl md:rounded-2xl shadow-lg border border-[#072D42]/10 hover:shadow-xl hover:border-[#072D42]/20 transition-all duration-500 ease-out group overflow-hidden">
                              
                              {/* EFECTO DE HOVER */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#072D42] to-[#0A3A5A] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-xl md:rounded-2xl" />
                              
                              {/* ICONO DE SECCIÓN COMO FONDO GRANDE */}
                              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.15] transition-all duration-700 ease-out z-10">
                                <section.icon className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-[#072D42] group-hover:text-white transition-colors duration-500 group-hover:scale-105" />
                              </div>
                              
                              {/* CONTENIDO PRINCIPAL */}
                              <div className="relative z-20 p-4 md:p-5">
                                {/* PRIMERA FILA: PERFIL + NOMBRE Y POSICIÓN */}
                                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                                  {/* ICONO DE PERFIL */}
                                  <div className="flex-shrink-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-[#072D42] to-[#0A3A5A] group-hover:from-white group-hover:to-gray-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500 border-2 border-white group-hover:border-[#072D42] shadow-md">
                                      <User className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white group-hover:text-[#072D42] transition-colors duration-500" />
                                    </div>
                                  </div>
                                  
                                  {/* NOMBRE Y POSICIÓN CON CLAMP */}
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-playfair responsive-member-name text-[#072D42] group-hover:text-white font-normal mb-1 transition-colors duration-300 truncate">
                                      {member.name}
                                    </h3>
                                    <p className="font-inter responsive-member-position text-[#072D42]/80 group-hover:text-white/90 font-medium truncate transition-colors duration-300">
                                      {member.position}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* SEGUNDA FILA: CONTACTO Y SKILLS */}
                                <div className="space-y-2 md:space-y-3">
                                  {/* CONTACTO */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 md:gap-3">
                                      {/* Email con texto */}
                                      <a 
                                        href={`mailto:${member.email}`}
                                        className="text-[#072D42]/70 group-hover:text-white/80 hover:text-[#072D42] group-hover:hover:text-white transition-colors duration-300 flex items-center gap-1"
                                        title="Enviar email"
                                      >
                                        <Mail className="w-3 h-3 flex-shrink-0" />
                                        <span className="text-xs font-inter truncate max-w-[100px] md:max-w-[120px]">
                                          {member.email}
                                        </span>
                                      </a>
                                      
                                      {/* LinkedIn */}
                                      <a 
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#072D42]/70 group-hover:text-white/80 hover:text-[#0077B5] group-hover:hover:text-white transition-colors duration-300 flex-shrink-0"
                                        title="LinkedIn"
                                      >
                                        <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
                                      </a>
                                    </div>
                                  </div>
                                  
                                  {/* SKILLS */}
                                  <div className="flex flex-wrap gap-1">
                                    {member.skills.map((skill, skillIndex) => (
                                      <span 
                                        key={skillIndex}
                                        className="inline-flex items-center px-2 py-1 bg-[#F8F5F0] group-hover:bg-white/20 text-[#072D42] group-hover:text-white text-xs rounded-md font-inter transition-all duration-300 hover:bg-[#F4E9D7] group-hover:hover:bg-white/30"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* SEPARADOR ELEGANTE RESPONSIVE */}
            <div className="flex items-center justify-center my-12 md:my-16 bg-white py-6 md:py-8">
              <div className="h-px w-16 md:w-24 lg:w-32 bg-[#072D42]/20"></div>
              <div className="mx-3 md:mx-4">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#072D42]/40" />
              </div>
              <div className="h-px w-16 md:w-24 lg:w-32 bg-[#072D42]/20"></div>
            </div>
          </section>
        </div>

        {/* SECCIÓN "ÚNETE" - COMPLETAMENTE RESPONSIVE */}
        <div 
          id="unete"
          ref={(el) => {
            sectionRefs.current.unete = el;
            uneteRef.current = el;
          }}
          className="scroll-mt-24 relative min-h-[25rem] md:min-h-[31.25rem] w-screen -ml-[calc(50vw-50%)] -mr-[calc(50vw-50%)] mt-12 md:mt-16"
        >
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/media/historiapage/TEAMB.jpg"
              alt="Únete a nuestro equipo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#072D42]/90 to-[#0A3A5A]/90"></div>
          </div>
          
          <div className="relative z-10 py-16 md:py-20 lg:py-24">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto text-white px-4 sm:px-6">
                <h2 className="font-playfair responsive-join-title text-white mb-4 md:mb-6 font-normal">
                  Únete a Nuestro Equipo
                </h2>
                <div className="h-px w-16 md:w-20 bg-white/70 mx-auto mb-6 md:mb-8"></div>
                <p className="font-inter responsive-join-text text-white/90 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
                  Buscamos talento apasionado por la innovación 
                  y la preservación de la memoria empresarial.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 rounded-lg font-montserrat font-medium tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base md:text-lg border border-white/30 hover:border-white/50">
                  Ver Oportunidades
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EquipoPage;