import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral"; // Asegúrate de usar la ruta correcta
import ContenedorImagenes from "../components/contenedorImagenes";
import MapaBolivia from "../components/mapaBolivia";
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

      <div className="w-full flex justify-end">
        <ContenedorLateral
          subtitulo="Novedades"
          texto="Explorá las últimas noticias, actualizaciones y promociones disponibles en nuestra plataforma."
          imagen="/media/homePage/lateral.png"
          ancho="70vw" // Aquí pasamos el valor de ancho
          alto="80vh" // Aquí pasamos el valor de alto
          ovaloRedondez="20px" // Redondez máxima del óvalo blanco
          cuadroRedondez="10px" // Redondez del contenedor principal
        />
      </div>
      
      <BarraHorizontal
        texto="EMPRESAS CON RECORRIDO DE +500 AÑOS"
        height="3vh"
        margenHorizontal="30vw"
        imagen="/media/homePage/barra.png"
      />


      <ContenedorImagenes
        alto="40vh"
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
