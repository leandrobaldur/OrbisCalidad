import { Flag, Eye, Target, Rocket, Landmark } from "lucide-react";
import { Reveal } from "./Reveal";
import { Timeline } from "./Timeline";
import AboutSection from "./NosotrosSection";
import SideNav from "./SideNav";
import MobileTopNav from "./MobileTopNav";

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
  }

  .font-trajan {
    font-family: 'TrajanPro', serif;
  }
`;

// Insertar estilos en el head del documento
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = fontStyles;
  document.head.appendChild(styleElement);
}

export default function AboutUsContainer() {
  const timeline = [
    {
      id: "seed",
      label: "2019",
      title: "La semilla de la idea",
      description:
        "Un grupo de historiadores y profesionales bolivianos identificó la necesidad de rescatar y ordenar la memoria empresarial del país. Nació así un sueño: crear un archivo vivo que conecte generaciones.",
    },
    {
      id: "research",
      label: "2020",
      title: "Investigación y metodología",
      description:
        "Se definieron criterios curatoriales y una metodología rigurosa de documentación: entrevistas, archivos digitales, y alianzas con cámaras y universidades para garantizar veracidad y contexto histórico.",
    },
    {
      id: "pilot",
      label: "2021",
      title: "Proyecto piloto",
      description:
        "Un piloto con empresas de distintos rubros permitió validar el enfoque humano y técnico del proyecto. Aprendimos a narrar historias con respeto, precisión y sensibilidad.",
    },
    {
      id: "platform",
      label: "2022",
      title: "Nace la plataforma",
      description:
        "Construimos Orbis Empresarial como un espacio digital seguro y accesible, diseñado para preservar, inspirar y educar a nuevas generaciones a través de la memoria empresarial.",
    },
  ];

  const sections = [
    { id: "about", label: "Sobre" },
    { id: "objective", label: "Objetivo" },
    { id: "mission", label: "Misión" },
    { id: "vision", label: "Visión" },
    { id: "origin", label: "Origen" },
    { id: "story", label: "Cómo empezó" },
  ];

  return (
    <div className="min-h-screen bg-[#F4E9D7]">
      <SideNav sections={sections} />
      <MobileTopNav sections={sections} />

      <div className="md:flex">
        {/* Left reserved column to avoid overlap with fixed sidenav */}
        <aside className="hidden md:block md:w-[18%] lg:w-[17%] xl:w-[15%] shrink-0" aria-hidden />

        {/* Right content column */}
        <div className="md:w-[82%] lg:w-[83%] xl:w-[85%] md:ml-auto">
          {/* About */}
          <AboutSection />

          {/* Objetivo */}
          <section id="objective" className="relative bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16 relative">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Reveal direction="right">
                  <div>
                    <h2 className="font-bodoni text-3xl text-[#072D42] flex items-center gap-3">
                      <Target className="text-[#072D42]" /> Objetivo
                    </h2>
                    <div className="mt-3 mb-6 h-1 w-16 bg-[#F29E38]"></div>
                    <p className="text-[#072D42]/90 leading-relaxed font-trajan">
                      Reunir, organizar y difundir el legado de las empresas bolivianas, resaltando su impacto económico, social y cultural a lo largo del tiempo. Buscamos que cada historia sea accesible, confiable y significativa.
                    </p>
                  </div>
                </Reveal>
                <Reveal direction="left" delay={100}>
                  <div className="border-l-4 border-[#F29E38] pl-6 py-2">
                    <p className="text-[#072D42]/80 leading-relaxed italic font-trajan">
                      Preservar la memoria empresarial no es solo conservar datos: es reconocer el esfuerzo de generaciones, entender los contextos que moldearon decisiones y proyectar aprendizajes para construir un futuro más sólido.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Misión */}
          <section id="mission" className="relative bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16 relative">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Reveal>
                  <div>
                    <h2 className="font-bodoni text-3xl text-[#072D42] flex items-center gap-3">
                      <Flag className="text-[#072D42]" /> Misión
                    </h2>
                    <div className="mt-3 mb-6 h-1 w-16 bg-[#F29E38]"></div>
                    <p className="text-[#072D42]/90 leading-relaxed font-trajan">
                      Resguardar, documentar y compartir historias empresariales con un enfoque ético y profesional, promoviendo la cultura de archivo, la transparencia y el orgullo por el trabajo bien hecho.
                    </p>
                  </div>
                </Reveal>
                <Reveal direction="left" delay={100}>
                  <div className="border-l-4 border-[#F29E38] pl-6 py-2">
                    <ul className="list-disc pl-5 space-y-2 text-[#072D42]/80 font-trajan">
                      <li>Desarrollar un repositorio seguro y organizado.</li>
                      <li>Facilitar la investigación académica y periodística.</li>
                      <li>Acercar a la ciudadanía historias que inspiran y enseñan.</li>
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Visión */}
          <section id="vision" className="relative bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16 relative">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Reveal direction="right">
                  <div>
                    <h2 className="font-bodoni text-3xl text-[#072D42] flex items-center gap-3">
                      <Eye className="text-[#072D42]" /> Visión
                    </h2>
                    <div className="mt-3 mb-6 h-1 w-16 bg-[#F29E38]"></div>
                    <p className="text-[#072D42]/90 leading-relaxed font-trajan">
                      Convertirnos en el referente nacional de memoria empresarial, un puente entre generaciones que aporte a la identidad productiva del país y promueva una cultura de integridad y excelencia.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border-l-4 border-[#F29E38] pl-6 py-2">
                    <p className="text-[#072D42]/80 leading-relaxed italic font-trajan">
                      Aspiramos a que cada empresa, grande o pequeña, encuentre aquí un hogar para su historia: un espacio digno, ordenado y humano donde su legado perdure.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Origen */}
          <section id="origin" className="relative bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16 relative">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Reveal direction="right">
                  <div>
                    <h2 className="font-bodoni text-3xl text-[#072D42] flex items-center gap-3">
                      <Landmark className="text-[#072D42]" /> Origen
                    </h2>
                    <div className="mt-3 mb-6 h-1 w-16 bg-[#F29E38]"></div>
                    <p className="text-[#072D42]/90 leading-relaxed font-trajan">
                      Nuestro proyecto nace de la convicción de que las empresas tienen historias que merecen ser contadas, no solo como registros económicos, sino como testimonios de perseverancia, innovación y contribución al desarrollo nacional.
                    </p>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="border-l-4 border-[#F29E38] pl-6 py-2">
                    <p className="text-[#072D42]/80 leading-relaxed font-trajan">
                      Documentamos historias que superan las cuatro décadas, destacando esfuerzos familiares, innovaciones, resiliencia y el impacto social de las empresas que construyeron país.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Cómo empezó */}
          <section id="story" className="relative bg-white scroll-mt-24">
            <div className="container mx-auto px-4 py-16 relative">
              <Reveal>
                <div className="flex items-center gap-3">
                  <h2 className="font-bodoni text-3xl text-[#072D42] flex items-center gap-3">
                    <Rocket className="text-[#072D42]" /> Cómo empezó el proyecto
                  </h2>
                </div>
                <div className="mt-3 mb-8 h-1 w-16 bg-[#F29E38]"></div>
                <Timeline items={timeline} />
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}