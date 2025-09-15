import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react'; // Importamos el icono de usuario
import { Reveal } from "../components/AboutUs/Reveal";
import SideNav from "../components/AboutUs/SideNav";
import MobileTopNav from "../components/AboutUs/MobileTopNav";

// Estilos de fuentes integrados directamente
const fontStyles = `
  @font-face {
    font-family: 'BodoniStd';
    src: url('/forts/As_BodoniStd.off') format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'TrajanPro';
    src: url('/forts/As_TrajanProRegular.tif') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .font-bodoni {
    font-family: 'BodoniStd', serif;
    letter-spacing: -0.02em;
  }

  .font-trajan {
    font-family: 'TrajanPro', serif;
    letter-spacing: 0.01em;
  }
`;

const EquipoPage = () => {
  const [activeCategory, setActiveCategory] = useState('delegacion');
  
  // Insertar estilos en el head del documento
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = fontStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const sections = [
    { id: 'delegacion', label: 'Delegación' },
    { id: 'backend', label: 'Backend' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'diseno', label: 'Diseño' },
    { id: 'basedatos', label: 'Base de Datos' },
    { id: 'dashboard', label: 'Dashboard' }
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
    <div className="min-h-screen bg-white">
      <SideNav sections={sections} />
      <MobileTopNav sections={sections} />

      <div className="md:flex">
        {/* Left reserved column to avoid overlap with fixed sidenav */}
        <aside className="hidden md:block md:w-[18%] lg:w-[17%] xl:w-[15%] shrink-0" aria-hidden />

        {/* Right content column */}
        <div className="w-full md:w-[82%] lg:w-[83%] xl:w-[85%] md:ml-auto">
          {/* Header Section */}
          <section className="relative scroll-mt-24">
            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto">
                  <p className="uppercase tracking-[0.2em] text-xs text-[#072D42]/60 font-medium font-trajan mb-4">
                    Nuestro Equipo
                  </p>
                  <h1 className="font-bodoni text-3xl sm:text-4xl md:text-5xl text-[#072D42] mb-6 leading-[1.1]">
                    Talento y <span className="text-[#F29E38]">Dedicación</span>
                  </h1>
                  <div className="w-16 h-0.5 bg-[#F29E38] mx-auto mb-6 md:mb-8"></div>
                  <p className="text-[#072D42]/80 text-base sm:text-lg leading-relaxed font-trajan px-2 sm:px-0">
                    Conoce al equipo profesional detrás de Orbis Empresarial. 
                    Expertos comprometidos con la excelencia y la innovación.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Team Sections */}
          {sections.map((section, index) => (
            <section 
              key={section.id} 
              id={section.id} 
              className="relative scroll-mt-24 border-t border-[#072D42]/5"
            >
              <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <Reveal delay={index * 100}>
                  <div className="mb-8 md:mb-12 text-center">
                    <h2 className="font-bodoni text-2xl md:text-3xl text-[#072D42] mb-4">
                      {section.label}
                    </h2>
                    <div className="w-12 h-0.5 bg-[#F29E38] mx-auto"></div>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                  {teamMembers[section.id].map((member, memberIndex) => (
                    <Reveal key={member.id} delay={(index * 100) + (memberIndex * 50)}>
                      <div className="bg-white rounded-xl border border-[#072D42]/20 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full">
                        {/* Photo/Icon Section */}
                        <div className="flex items-center justify-center p-4 bg-white group-hover:bg-[#F4E9D7]/50 transition-colors duration-300">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#072D42] flex items-center justify-center overflow-hidden border-2 border-[#F29E38]/30">
                            <div className="text-[#F4E9D7]">
                              <User className="w-10 h-10 md:w-12 md:h-12" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-4 flex flex-col justify-center flex-grow">
                          <div className="mb-3 text-center">
                            <h3 className="font-bodoni text-lg text-[#072D42] font-bold mb-1">
                              {member.name}
                            </h3>
                            <p className="text-[#072D42]/70 text-sm font-trajan">
                              {member.position}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap justify-center gap-2 mt-auto">
                            {member.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="inline-flex items-center px-3 py-1 bg-[#F4E9D7] text-[#072D42] text-xs rounded-full font-trajan"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.skills.length > 3 && (
                              <span className="inline-flex items-center px-3 py-1 bg-[#072D42] text-white text-xs rounded-full font-trajan">
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
            </section>
          ))}

          {/* Call to Action Section */}
          <section className="relative bg-[#072D42] scroll-mt-24">
            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
              <Reveal>
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="font-bodoni text-2xl md:text-3xl text-white mb-6">
                    Únete a Nuestro Equipo
                  </h2>
                  <div className="w-12 h-0.5 bg-[#F29E38] mx-auto mb-6"></div>
                  <p className="text-white/80 mb-8 font-trajan leading-relaxed px-4 sm:px-0">
                    Buscamos talento apasionado por la innovación 
                    y la preservación de la memoria empresarial.
                  </p>
                  <button className="bg-[#F29E38] hover:bg-[#e58c25] text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-trajan transition-all duration-300 transform hover:scale-105">
                    Ver Oportunidades
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EquipoPage;