import React from 'react';
import './historiaStyles.css';

const HistoriaPage = () => {
  return (
    <div className="historia-container">
      <div className="contenido">
        <div className="lado-izquierdo">
          <div className="figura">
            <img src="/media/header/logo.png" alt="Logo Bicentenario" className="logo-img" />
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
    </div>
  );
};

export default HistoriaPage;