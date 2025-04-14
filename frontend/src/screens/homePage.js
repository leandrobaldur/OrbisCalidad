import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral"; // Asegúrate de usar la ruta correcta
import ContenedorImagenes from "../components/contenedorImagenes";
import MapaBolivia from "../components/mapaBolivia";
import ImagenInteractiva from "../components/imagenInteractiva";
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
            ancho="40vw"
            imagenDefault="/media/homePage/defaultImage.png"
            items={[
              {
                icono: "/media/homePage/defaultImage.png",
                subtitulo: "Primera Selección",
                imagen: "/media/contenido/contenido1.png",
                texto: "Este es el contenido relacionado al primer ícono.",
              },
              {
                icono: "/media/homePage/defaultImage.png",
                subtitulo: "Segunda Selección",
                imagen: "/media/contenido/contenido2.png",
                texto: "Información para el segundo ícono seleccionada.",
              },
              {
                icono: "/media/homePage/defaultImage.png",
                subtitulo: "Tercera Selección",
                imagen: "/media/contenido/contenido3.png",
                texto: "Texto descriptivo para el tercer ícono.",
              },
            ]}
          />
      </div>

        <ContenedorLateral
          subtitulo="Novedades"
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


      <ContenedorImagenes
        alto="50vh"
        imagenes={[
          { titulo: "CBN", ruta: "/media/homePage/empresa1.png" },
          { titulo: "TIGO", ruta: "/media/homePage/empresa2.png" },
          { titulo: "TOYOSA", ruta: "/media/homePage/empresa3.png" },
        ]}
      />

      <MapaBolivia/>


    </div>
  );
};

export default HomePage;
