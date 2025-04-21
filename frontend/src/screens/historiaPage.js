import React from 'react';
import './historiaStyles.css';
import VideoPanel from '../components/videoPanel';

const HistoriaPage = () => {
  return (
    <div className="historia-container">
      <div className="contenido">
        <div className="lado-izquierdo">
          <div className="figura">
            <img
              src="/media/header/logo.png"
              alt="Logo Bicentenario"
              className="logo-img"
            />
          </div>
        </div>

        <div className="lado-derecho">
          <h1>Lorem ipsum</h1>
          <p>
            Lorem ipsum, Lorem ipsum, Lorem ipsum,<br />
            Lorem ipsum, Lorem ipsum, Lorem ipsum,<br />
            Lorem ipsum, Lorem ipsum, Lorem ipsum,<br />
            Lorem ipsum, Lorem ipsum, Lorem ipsum,<br />
            Lorem ipsum,
          </p>
        </div>
      </div>

      {/* 🎥 Video debajo de TODO el contenido blanco */}
      <div className="video-panel-container">
        <VideoPanel height="60vh">
          <video src="/media/homePage/video.webm" autoPlay muted loop />
        </VideoPanel>
      </div>
    </div>
  );
};

export default HistoriaPage;
