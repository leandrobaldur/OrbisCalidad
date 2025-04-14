import React from "react";
import VideoPanel from "../components/videoPanel";
import BarraHorizontal from "../components/barraHorizontal";
import ContenedorLateral from "../components/contenedorLateral";
import ContenedorImagenes from "../components/contenedorImagenes";
import MapaBolivia from "../components/mapaBolivia";

// Importa los nuevos componentes con los nombres actualizados
import InicioSesion from "../components/inicioSesion";
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

      <div className="w-full flex justify-end">
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
        alto="40vh"
        imagenes={[
          { titulo: "CBN", ruta: "/media/homePage/empresa1.png" },
          { titulo: "TIGO", ruta: "/media/homePage/empresa2.png" },
          { titulo: "TOYOSA", ruta: "/media/homePage/empresa3.png" },
        ]}
      />

      <MapaBolivia />

      {/* Se agrega el componente de Inicio de Sesión */}
      <InicioSesion onLogin={(data) => console.log("Inicio de sesión:", data)} />

      {/* Se agrega el FooterBar al final de la página */}
      <FooterBar />
    </div>
  );
};

export default HomePage;
