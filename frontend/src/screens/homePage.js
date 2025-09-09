import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral";
import ImagenInteractiva from "../components/imagenInteractiva";
import CarruselImagenes from "../components/carruselImagenes";


const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8 mt-5">
      <VideoPanel height="60vh">
        <video className="w-full h-full object-cover" src="/media/homePage/video.webm" autoPlay muted loop />
      </VideoPanel>

      <BarraHorizontal
        texto="EMPRESAS QUE FORJARON EL PAIS"
        height="3vh"
        margenHorizontal="30vw"
        imagen="/media/homePage/barra.png"
      />

      <div className="w-full flex justify-start items-start gap-[0vw] px-[0vw]">
        <div className="mt-[10vh]">
          <ImagenInteractiva
            ancho="30vw"
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

        <ContenedorLateral
          subtitulo="SEMANA DE ACTIVIDADES"
          imagen="/media/homePage/work.jpeg"
          ancho="70vw"
          alto="50.5vw"
          ovaloRedondez="20px"
          cuadroRedondez="10px"
        />
      </div>
      
      <BarraHorizontal
        texto="RECORRIDOS DE +40 AÑOS"
        height="3vh"
        margenHorizontal="30vw"
        imagen="/media/homePage/barra.png"
      />
    </div>
  );
};

export default HomePage;

