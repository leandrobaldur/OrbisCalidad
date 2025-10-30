import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral";
import ImagenInteractiva from "../components/imagenInteractiva";
import CarruselImagenes from "../components/carruselImagenes";


const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* Video Principal - Responsive height */}
      <section className="relative">
        <VideoPanel height="clamp(40vh, 61.8vh, 80vh)">
          <video 
            className="w-full h-full object-cover" 
            src="/media/homePage/video.webm" 
            autoPlay 
            muted 
            loop 
          />
        </VideoPanel>
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Barra de Separación - Empresas que Forjaron el País */}
      <section className="relative">
        <BarraHorizontal
          texto="EMPRESAS QUE FORJARON EL PAIS"
          height="clamp(3vh, 6.18vh, 8vh)"
          margenHorizontal="clamp(10vw, 19.1vw, 25vw)"
          imagen="/media/homePage/barra.png"
        />
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Sección Principal de Contenido - Layout áureo perfectamente alineado */}
      <section className="w-full px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start" style={{ gap: 'clamp(2rem, 6.18vw, 4rem)' }}>
            {/* Panel Interactivo Izquierdo - Proporción áurea 30.9% (agrandado) */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-start" style={{ marginTop: 'clamp(2rem, 6.18vh, 4rem)' }}>
              <div className="w-full max-w-[400px] lg:max-w-none">
                <ImagenInteractiva
                  ancho="100%"
                  imagenDefault="/media/homePage/defaultImage.png"
                  items={[
                    {
                      icono: "/media/homePage/lightIcon.png",
                      subtitulo: "INNOVACIÓN",
                      imagen: "/media/homePage/c1.webp",
                      texto: "Más de cuatro décadas impulsando el cambio constante, reinventándonos para anticipar el futuro y ofrecer soluciones que transforman industrias y vidas.",
                    },
                    {
                      icono: "/media/homePage/recicleIcon.png",
                      subtitulo: "SOSTENIBILIDAD",
                      imagen: "/media/homePage/c2.webp",
                      texto: "Creciendo junto a nuestro entorno, adaptándonos y protegiendo recursos para garantizar un legado duradero y un impacto positivo en las generaciones futuras.",
                    },
                    {
                      icono: "/media/homePage/secureIcon.png",
                      subtitulo: "CONFIANZA",
                      imagen: "/media/homePage/c3.jpg",
                      texto: "Construimos relaciones sólidas y duraderas, basadas en la transparencia y el compromiso, que han sido el pilar para acompañar a nuestros clientes por más de cuatro décadas.",
                    },
                    {
                      icono: "/media/homePage/awardIcon.png",
                      subtitulo: "EXCELENCIA",
                      imagen: "/media/homePage/c4.jpg",
                      texto: "Más de 40 años superando expectativas y estableciendo estándares de calidad, dedicados a la perfección en cada producto y servicio que ofrecemos.",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Contenedor Lateral Derecho - Proporción áurea 69.1% pegado al lateral derecho */}
            <div className="w-full lg:w-[60%] flex justify-end">
              <div className="w-full ml-auto -mr-4 md:-mr-8 lg:-mr-16 xl:-mr-32">
                <ContenedorLateral
                  subtitulo="SEMANA DE ACTIVIDADES"
                  imagen="/media/homePage/work.jpeg"
                  ancho="100%"
                  alto="clamp(40vh, 61.8vh, 70vh)"
                  ovaloRedondez="20px"
                  cuadroRedondez="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>
      
      {/* Barra de Separación - Recorridos de +40 Años */}
      <section className="relative">
        <BarraHorizontal
          texto="RECORRIDOS DE +40 AÑOS"
          height="clamp(3vh, 6.18vh, 8vh)"
          margenHorizontal="clamp(10vw, 19.1vw, 25vw)"
          imagen="/media/homePage/barra.png"
        />
      </section>

      {/* Espaciado responsive entre secciones */}
      <div className="h-8 md:h-12 lg:h-16"></div>

      {/* Carrusel de Imágenes - Responsive padding */}
      <section className="w-full bg-surface py-8 md:py-12 lg:py-16">
        <CarruselImagenes
          altura={600}
          filas={3}
          backendUrl="http://localhost:3001"
        />
      </section>
    </div>
  );
};

export default HomePage;