import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral";
import ImagenInteractiva from "../components/imagenInteractiva";
import CarruselImagenes from "../components/carruselImagenes";
import FooterBar from "../components/footerBar";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8">
      <VideoPanel height="60vh">
        <video src="/media/homePage/video.webm" autoPlay muted loop />
      </VideoPanel>

      <BarraHorizontal
        texto="¡Bienvenidos a nuestra página!"
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
                subtitulo: "Primera Selección",
                imagen: "/media/contenido/contenido1.png",
                texto: "Este es el contenido relacionado al primer ícono.",
              },
              {
                icono: "/media/homePage/recicleIcon.png",
                subtitulo: "Segunda Selección",
                imagen: "/media/contenido/contenido2.png",
                texto: "Información para el segundo ícono seleccionada.",
              },
              {
                icono: "/media/homePage/secureIcon.png",
                subtitulo: "Tercera Selección",
                imagen: "/media/contenido/contenido3.png",
                texto: "Texto descriptivo para el tercer ícono.",
              },
              {
                icono: "/media/homePage/awardIcon.png",
                subtitulo: "Tercera Selección",
                imagen: "/media/contenido/contenido3.png",
                texto: "Texto descriptivo para el tercer ícono.",
              },
            ]}
          />
      </div>

        <ContenedorLateral
          subtitulo="SEMANA DE ACTIVIDADES"
          texto="Explorá las últimas noticias, actualizaciones y promociones disponibles en nuestra plataforma."
          imagen="/media/homePage/lateral.png"
          ancho="70vw"
          alto="80vh"
          ovaloRedondez="20px"
          cuadroRedondez="10px"
        />
      </div>

      
      <BarraHorizontal
        texto="EMPRESAS CON RECORRIDO DE +500 AÑOS"
        height="3vh"
        margenHorizontal="30vw"
        imagen="/media/homePage/barra.png"
      />



      <CarruselImagenes
        altura={800}
        filas={6}
        backendUrl="http://localhost:3000"
        modoPrueba={true}
      />


      {/* Se agrega el componente de Inicio de Sesión */}

      {/* Se agrega el FooterBar al final de la página */}
      <FooterBar />
    </div>
  );
};

export default HomePage;
