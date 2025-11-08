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

// Estilos de fuentes (se mantienen igual)
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
`;

// Componente Reveal (se mantiene igual)
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
  const sectionRefs = useRef({});
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

  // Scroll handler para parallax y sticky navigation
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

      const sections = ['delegacion', 'backend', 'frontend', 'diseno', 'basedatos', 'dashboard', 'unete'];
      const scrollPosition = window.scrollY + 200;

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = sectionRefs.current[id];
    if (!el) return;
    
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 100;
    
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setActiveSection(id);
  };

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  // Secciones con iconos
  const sections = [
    { id: 'delegacion', label: 'LIDERAZGO', icon: Crown },
    { id: 'backend', label: 'BACKEND', icon: Cpu },
    { id: 'frontend', label: 'FRONTEND', icon: Component },
    { id: 'diseno', label: 'DISEÑO', icon: Palette },
    { id: 'basedatos', label: 'BASE DE DATOS', icon: Database },
    { id: 'dashboard', label: 'ANALITYCS', icon: LineChart }
  ];

  // Logos de los cuerpos
  const bodyLogos = [
    { id: 'delegacion', name: 'LideraZgo', icon: Crown, section: 'delegacion' },
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
  <div className="min-h-screen bg-beige font-inter [&_a]:no-underline [&_a:hover]:no-underline" style={{ paddingTop: 'calc(var(--site-header-height) - 6rem)' }}>
      
      {/* HEADER (se mantiene igual) */}
      <div className="h-[80vh] min-h-[400px] max-h-[800px] mb-9 overflow-hidden relative">
        <header className="relative h-full">
  <div className="absolute inset-0 w-full h-full overflow-hidden" style={parallaxStyle}>
    <img 
      src="/media/historiapage/futbol.jpg"
      alt="Nuestro Equipo - Orbis Empresarial"
      className="w-full h-full object-cover object-top" // object-bottom para alinear desde abajo
    />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(7,45,66,0.4)_0%,_rgba(7,45,66,0.2)_50%,_transparent_70%)]"></div>
  </div>
  
  <div className="relative z-30 p-8 lg:p-20 text-white h-full flex flex-col justify-center items-center text-center">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(7,45,66,0.8)_0%,_rgba(7,45,66,0.4)_60%,_transparent_100%)] pointer-events-none"></div>

    <div className="relative z-10 w-full max-w-6xl">
      <div className="[text-shadow:_0_10px_40px_rgba(0_0_0_/_0.9)] mb-8">
        <h1 className="font-playfair text-6xl lg:text-8xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
          Nuestro Equipo
        </h1>
      </div>
      
      <div className="mb-8 [text-shadow:_0_6px_25px_rgba(0_0_0_/_0.8)]">
        <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
          Talento y Excelencia
        </h2>
        <div className="h-px w-32 bg-white/80 mb-4 mx-auto [box-shadow:_0_4px_20px_rgba(255_255_255_/_0.5)]"></div>
      </div>
      
      <div className="mb-12 [text-shadow:_0_4px_20px_rgba(0_0_0_/_0.7)]">
        <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl mx-auto text-white/95 leading-relaxed">
          Conoce al equipo profesional detrás de Orbis Empresarial. 
          Expertos comprometidos con la excelencia y la innovación.
        </p>
      </div>

      <div className="flex flex-wrap gap-8 lg:gap-12 mt-12 justify-center">
        {bodyLogos.map((body) => {
          const IconComponent = body.icon;
          return (
            <div key={body.id} className="flex flex-col items-center">
              <button
                onClick={(e) => scrollTo(e, body.section)}
                className="header-icon-button group relative transform transition-all duration-700 ease-out hover:scale-110 hover:-translate-y-2 
                  !bg-transparent !border-none !outline-none focus:!ring-0 focus:!outline-none
                  [&]:bg-none [&]:border-none [&]:outline-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 [filter:_drop-shadow(0_10px_40px_rgba(0_0_0_/_0.9))] group-hover:[filter:_drop-shadow(0_15px_50px_rgba(0_0_0_/_0.95))] transition-all duration-500"></div>
                  <IconComponent className="relative w-16 h-16 lg:w-20 lg:h-20 text-white 
                    [filter:_drop-shadow(0_6px_20px_rgba(255_255_255_/_0.4))_drop-shadow(0_0_15px_rgba(255_255_255_/_0.3))]
                    group-hover:[filter:_drop-shadow(0_0_40px_rgba(255_255_255_/_0.8))_drop-shadow(0_10px_40px_rgba(0_0_0_/_0.9))]
                    transition-all duration-500 ease-out
                    group-hover:scale-110" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 rounded-full blur-md group-hover:blur-xl transition-all duration-700 ease-out scale-0 group-hover:scale-125"></div>
                  <div className="absolute -inset-4 border-2 border-white/0 group-hover:border-white/40 rounded-full transition-all duration-500 ease-out scale-0 group-hover:scale-100"></div>
                </div>
                
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                  <div className="bg-black/90 text-white text-sm font-montserrat px-4 py-2 rounded-lg whitespace-nowrap backdrop-blur-md 
                    [box-shadow:_0_10px_40px_rgba(0_0_0_/_0.8)] border border-white/20
                    [text-shadow:_0_2px_10px_rgba(0_0_0_/_0.9)]">
                    Ir a {body.name}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-b border-r border-white/20"></div>
                  </div>
                </div>
              </button>
              
              <div className="mt-4">
                <span className="font-montserrat text-white/90 text-sm lg:text-base font-light tracking-wide 
                  [text-shadow:_0_2px_8px_rgba(0_0_0_/_0.7)] transition-all duration-300 
                  group-hover:text-white group-hover:[text-shadow:_0_2px_12px_rgba(255_255_255_/_0.3)]">
                  {body.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</header>
      </div>

      <main className="px-10 py-0">
        {/* NAVEGACIÓN MÓVIL */}
        <div className="block lg:hidden mb-8">
          <nav className="flex flex-row gap-2 overflow-x-auto py-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => scrollTo(e, s.id)}
                className={`
                  relative text-left py-3 px-4 transition-colors duration-200 whitespace-nowrap
                  rounded-lg border border-[#9298A6]/30 bg-white/10
                  hover:bg-[#9298A6]/10
                  ${
                    activeSection === s.id 
                      ? 'bg-[#9298A6]/20 font-medium'
                      : 'font-light opacity-80 hover:opacity-100'
                  }
                `}
              >
                <span className="tracking-widest text-sm text-[#072D42] font-montserrat">{s.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* ASIDE ELEGANTE */}
          <aside className="hidden lg:block lg:w-1/6 sticky top-40">
  

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

          {/* CONTENIDO PRINCIPAL CON TARJETAS COMPACTAS MEJORADAS */}
          <section className="w-full lg:w-5/6 flex flex-col ">
            {sections.map((section, index) => (
              <div key={section.id}>
                {/* LÍNEA SEPARADORA ELEGANTE */}
                {index > 0 && (
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#072D42]/20 to-transparent"></div>
                )}

                <div
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="scroll-mt-24"
                >
                  <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                    <Reveal delay={index * 100}>
                      <div className="mb-12 md:mb-16 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <section.icon className="w-8 h-8 text-[#072D42]" />
                          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#072D42] font-normal">
                            {section.label}
                          </h2>
                        </div>
                        <div className="h-px w-20 bg-[#072D42]/60 mx-auto"></div>
                      </div>
                    </Reveal>

                    {/* TARJETAS COMPACTAS MEJORADAS */}
                    <div className="flex justify-center">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-7xl">
    {teamMembers[section.id].map((member, memberIndex) => (
      <Reveal key={member.id} delay={(index * 100) + (memberIndex * 100)}>
        <div className="relative bg-white rounded-2xl shadow-lg border border-[#072D42]/10 hover:shadow-xl hover:border-[#072D42]/20 transition-all duration-500 ease-out group overflow-hidden">
          
          {/* EFECTO DE HOVER - FONDO AZUL QUE SE EXPANDE (DEBE IR PRIMERO) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#072D42] to-[#0A3A5A] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-2xl" />
          
          {/* ICONO DE SECCIÓN COMO FONDO GRANDE - POSICIONADO A LA DERECHA CON CAMBIO DE COLOR (DEBE IR DESPUÉS DEL FONDO AZUL) */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.15] transition-all duration-700 ease-out z-10">
            <section.icon className="w-48 h-48 text-[#072D42] group-hover:text-white transition-colors duration-500 group-hover:scale-105" />
          </div>
          
          {/* CONTENIDO PRINCIPAL */}
          <div className="relative z-20 p-5">
            {/* PRIMERA FILA: PERFIL + NOMBRE Y POSICIÓN */}
            <div className="flex items-start gap-4 mb-4">
              {/* ICONO DE PERFIL - IZQUIERDA */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#072D42] to-[#0A3A5A] group-hover:from-white group-hover:to-gray-100 flex items-center justify-center group-hover:scale-110 transition-all duration-500 border-2 border-white group-hover:border-[#072D42] shadow-md">
                  <User className="w-6 h-6 text-white group-hover:text-[#072D42] transition-colors duration-500" />
                </div>
              </div>
              
              {/* NOMBRE Y POSICIÓN */}
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair text-lg text-[#072D42] group-hover:text-white font-normal mb-1 transition-colors duration-300 truncate">
                  {member.name}
                </h3>
                <p className="font-inter text-[#072D42]/80 group-hover:text-white/90 text-sm font-medium truncate transition-colors duration-300">
                  {member.position}
                </p>
              </div>
            </div>
            
            {/* SEGUNDA FILA: CONTACTO Y SKILLS */}
            <div className="space-y-3">
              {/* CONTACTO */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Email con texto */}
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-[#072D42]/70 group-hover:text-white/80 hover:text-[#072D42] group-hover:hover:text-white transition-colors duration-300 flex items-center gap-1"
                    title="Enviar email"
                  >
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs font-inter truncate max-w-[120px]">
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
                    <Linkedin className="w-4 h-4" />
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

            {/* SECCIÓN "ÚNETE" (se mantiene igual) */}
            <div className="flex items-center justify-center my-16">
              <div className="h-px w-32 bg-[#072D42]/20"></div>
              <div className="mx-4">
                <TrendingUp className="w-6 h-6 text-[#072D42]/40" />
              </div>
              <div className="h-px w-32 bg-[#072D42]/20"></div>
            </div>

            <div 
              id="unete"
              ref={(el) => (sectionRefs.current.unete = el)}
              className="scroll-mt-24 relative min-h-[500px]"
            >
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/media/historiapage/TEAMB.jpg"
                  alt="Únete a nuestro equipo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#072D42]/70"></div>
              </div>
              
              <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 md:py-24">
                <Reveal>
                  <div className="text-center max-w-3xl mx-auto text-white">
                    <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-6 font-normal">
                      Únete a Nuestro Equipo
                    </h2>
                    <div className="h-px w-20 bg-white/70 mx-auto mb-8"></div>
                    <p className="font-inter text-white/90 mb-10 text-lg leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                      Buscamos talento apasionado por la innovación 
                      y la preservación de la memoria empresarial.
                    </p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 md:px-10 md:py-4 rounded-lg font-montserrat font-medium tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg border border-white/30 hover:border-white/50">
                      Ver Oportunidades
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EquipoPage;