import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Users, 
  Code, 
  Palette, 
  Database, 
  BarChart3, 
  Cpu,
  Layout,
  PenTool,
  Server,
  Smartphone,
  TrendingUp,
  ChevronRight
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
`;

// Componente Reveal simplificado
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

      // Update active section based on scroll position
      const sections = ['delegacion', 'backend', 'frontend', 'diseno', 'basedatos', 'dashboard', 'unete'];
      const scrollPosition = window.scrollY + 100;

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
    const offsetPosition = elementPosition - 150;
    
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setActiveSection(id);
  };

  const parallaxStyle = {
    transform: `translate3d(0, ${scrollY * 0.4}px, 0)`
  };

  const sections = [
    { id: 'delegacion', label: 'Liderazgo', icon: Users },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'diseno', label: 'Diseño', icon: PenTool },
    { id: 'basedatos', label: 'Base de Datos', icon: Database },
    { id: 'dashboard', label: 'Analytics', icon: BarChart3 }
  ];

  // Datos de ejemplo del equipo
  const teamMembers = {
    delegacion: [
      { id: 1, name: 'Ana Rodríguez', position: 'Project Manager', skills: ['Liderazgo', 'Estrategia', 'Gestión'] },
      { id: 2, name: 'Carlos Méndez', position: 'Líder de Equipo', skills: ['Coordinación', 'Planificación', 'Mentoría'] },
      { id: 3, name: 'María Fernández', position: 'Coordinadora', skills: ['Organización', 'Comunicación', 'Logística'] }
    ],
    backend: [
      { id: 1, name: 'Javier López', position: 'Senior Backend Dev', skills: ['Node.js', 'Python', 'APIs'] },
      { id: 2, name: 'Laura Martínez', position: 'API Specialist', skills: ['REST', 'GraphQL', 'Microservicios'] },
      { id: 3, name: 'Diego Ramírez', position: 'DevOps Engineer', skills: ['AWS', 'Docker', 'CI/CD'] }
    ],
    frontend: [
      { id: 1, name: 'Sofía García', position: 'Frontend Lead', skills: ['React', 'TypeScript', 'UX'] },
      { id: 2, name: 'Miguel Ángel Torres', position: 'UI/UX Developer', skills: ['Figma', 'Prototipado', 'Design Systems'] },
      { id: 3, name: 'Elena Vargas', position: 'React Specialist', skills: ['Hooks', 'Context', 'Performance'] }
    ],
    diseno: [
      { id: 1, name: 'Claudia Rojas', position: 'Diseñadora Gráfica', skills: ['Illustrator', 'Branding', 'Tipografía'] },
      { id: 2, name: 'Ricardo Fuentes', position: 'UX Researcher', skills: ['User Testing', 'Wireframes', 'Prototipos'] },
      { id: 3, name: 'Isabel Mendoza', position: 'Diseñadora Visual', skills: ['Photoshop', 'Animación', 'Illustration'] }
    ],
    basedatos: [
      { id: 1, name: 'Roberto Silva', position: 'Database Architect', skills: ['SQL', 'MongoDB', 'Optimización'] },
      { id: 2, name: 'Carolina Ríos', position: 'Data Analyst', skills: ['ETL', 'Power BI', 'Estadística'] },
      { id: 3, name: 'Andrés Castillo', position: 'DB Administrator', skills: ['Seguridad', 'Backups', 'Monitorización'] }
    ],
    dashboard: [
      { id: 1, name: 'Patricia Navarro', position: 'Dashboard Designer', skills: ['DataViz', 'Tableau', 'Storytelling'] },
      { id: 2, name: 'Fernando Jiménez', position: 'Data Visualization', skills: ['D3.js', 'Chart.js', 'Animaciones'] },
      { id: 3, name: 'Gabriela Ortega', position: 'Analytics Specialist', skills: ['KPIs', 'Métricas', 'Business Intelligence'] }
    ]
  };

  return (
    <div className="min-h-screen bg-beige font-inter [&_a]:no-underline [&_a:hover]:no-underline">
      {/* HEADER CON CAPACIDAD PARA IMAGEN */}
      <div className="h-[80vh] min-h-[400px] max-h-[800px] mb-9 overflow-hidden relative">
        <header className="relative h-full">
          {/* IMAGEN DE FONDO - REEMPLAZA LA URL POR LA QUE DESEES */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={parallaxStyle}
          >
            <img 
              src="/media/historiapage/futbol.jpg" // Cambia esta ruta por tu imagen
              alt="Nuestro Equipo - Orbis Empresarial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#072D42]/60"></div>
          </div>
          
          <div className="relative z-30 p-20 lg:p-48 text-white h-full flex flex-col justify-center">
            <h1 className="font-playfair text-6xl lg:text-8xl font-normal leading-[0.9] tracking-tight mb-4 text-white">
              Nuestro Equipo
            </h1>
            
            <div className="mb-6">
              <h2 className="font-montserrat text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase text-white/95 mb-3">
                Talento y Excelencia
              </h2>
              <div className="h-px w-32 bg-white/70 mb-4"></div>
            </div>
            
            <p className="font-inter text-xl lg:text-2xl font-extralight tracking-wide max-w-2xl text-white/90 leading-relaxed">
              Conoce al equipo profesional detrás de Orbis Empresarial. 
              Expertos comprometidos con la excelencia y la innovación.
            </p>
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
          {/* ASIDE ELEGANTE - STICKY NAVIGATION CON ICONOS MEJORADOS */}
          <aside className="hidden lg:block lg:w-1/5 sticky top-1/4">
            <div className={`
              transition-all duration-700 ease-in-out
              ${isHeaderShrunk 
                ? 'opacity-100' 
                : 'opacity-0 -translate-y-4 pointer-events-none'
              }
            `}>
              <h2 className="font-playfair text-2xl leading-tight mb-4 text-[#072D42]">Nuestro Equipo</h2>
              <div className="h-px w-16 bg-[#072D42]/50 mb-6"></div>
            </div>

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
                    {/* Icono de la sección a la izquierda */}
                    <s.icon className="w-4 h-4 text-[#072D42] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Texto con letra más fina */}
                    <span className="tracking-widest text-sm text-[#072D42] font-montserrat font-extralight">
                      {s.label}
                    </span>
                  </div>
                  
                  {/* Flechita única que aparece al hacer hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-3 h-3 text-[#072D42]" />
                  </div>
                </a>
              ))}
            </nav>

            
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <section className="w-full lg:w-4/5 flex flex-col">
            {sections.map((section, index) => (
              <div key={section.id}>
                {/* LÍNEA SEPARADORA ELEGANTE (excepto antes de la primera sección) */}
                {index > 0 && (
                  <div className="flex items-center justify-center my-16">
                    <div className="h-px w-32 bg-[#072D42]/20"></div>
                    <div className="mx-4">
                      <section.icon className="w-6 h-6 text-[#072D42]/40" />
                    </div>
                    <div className="h-px w-32 bg-[#072D42]/20"></div>
                  </div>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                      {teamMembers[section.id].map((member, memberIndex) => (
                        <Reveal key={member.id} delay={(index * 100) + (memberIndex * 50)}>
                          <div className="bg-white rounded-xl shadow-lg border border-[#072D42]/10 hover:shadow-xl hover:border-[#072D42]/30 transition-all duration-500 ease-out group overflow-hidden flex flex-col h-full hover:bg-gradient-to-br hover:from-[#072D42] hover:to-[#0A3A5A]">
                            {/* Photo/Icon Section */}
                            <div className="flex items-center justify-center p-6 bg-white group-hover:bg-transparent transition-all duration-500">
                              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#072D42] group-hover:bg-white/10 flex items-center justify-center overflow-hidden border-2 border-[#072D42]/30 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-110">
                                <div className="text-beige group-hover:text-white transition-colors duration-500">
                                  <User className="w-12 h-12 md:w-14 md:h-14 transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="p-6 flex flex-col justify-center flex-grow">
                              <div className="mb-4 text-center">
                                <h3 className="font-playfair text-xl text-[#072D42] group-hover:text-white font-normal mb-2 transition-colors duration-500 transform translate-y-0 group-hover:-translate-y-1">
                                  {member.name}
                                </h3>
                                <p className="font-inter text-[#072D42]/70 group-hover:text-white/80 text-sm transition-colors duration-500">
                                  {member.position}
                                </p>
                              </div>
                              
                              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                {member.skills.slice(0, 3).map((skill, skillIndex) => (
                                  <span 
                                    key={skillIndex}
                                    className="inline-flex items-center px-3 py-1 bg-[#F4E9D7] text-[#072D42] group-hover:bg-white/20 group-hover:text-white text-xs rounded-full font-inter transition-all duration-500 transform translate-x-0 group-hover:translate-x-1"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {member.skills.length > 3 && (
                                  <span className="inline-flex items-center px-3 py-1 bg-[#072D42] text-white group-hover:bg-white/30 text-xs rounded-full font-inter transition-all duration-500">
                                    +{member.skills.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* LÍNEA SEPARADORA ANTES DE LA SECCIÓN FINAL */}
            <div className="flex items-center justify-center my-16">
              <div className="h-px w-32 bg-[#072D42]/20"></div>
              <div className="mx-4">
                <TrendingUp className="w-6 h-6 text-[#072D42]/40" />
              </div>
              <div className="h-px w-32 bg-[#072D42]/20"></div>
            </div>

            {/* SECCIÓN "ÚNETE" CON CAPACIDAD PARA IMAGEN */}
            <div 
              id="unete"
              ref={(el) => (sectionRefs.current.unete = el)}
              className="scroll-mt-24 relative min-h-[500px]"
            >
              {/* IMAGEN DE FONDO PARA LA SECCIÓN ÚNETE */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/media/historiapage/TEAMB.jpg" // Cambia esta ruta por tu imagen
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