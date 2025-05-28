import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CarruselImagenes = ({ altura, filas, backendUrl }) => {
  const [imagenesDistribuidas, setImagenesDistribuidas] = useState([]);
  const contenedorRef = useRef(null);

  const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/diswqpy8v/image/upload/v1745018920';

  const distribuirEquitativamente = (imagenes, filas) => {
    const distribuidas = Array.from({ length: filas }, () => []);
    imagenes.forEach((img, index) => {
      distribuidas[index % filas].push(img);
    });
    return distribuidas;
  };

  const obtenerImagenesDesdeBackend = async () => {
    try {
      const res = await axios.get(`${backendUrl}/empresas`);
      const urls = res.data
        .map((empresa) => empresa.url)
        .filter((nombre) => nombre && typeof nombre === 'string')
        .map((nombre) => `${CLOUDINARY_BASE_URL}/${nombre}`);

      const imagenesBarajadas = shuffleArray(urls);
      const distribuidas = distribuirEquitativamente(imagenesBarajadas, filas);
      setImagenesDistribuidas(distribuidas);
    } catch (error) {
      console.error('Error al obtener imágenes desde backend:', error);
    }
  };

  useEffect(() => {
    obtenerImagenesDesdeBackend();
  }, [obtenerImagenesDesdeBackend]); // <-- Añade aquí la dependencia
  

  return (
    <div
      ref={contenedorRef}
      className="w-full overflow-hidden relative"
      style={{ height: `${altura}px` }}
    >
      {imagenesDistribuidas.map((fila, i) => (
        <div
          key={i}
          className="flex whitespace-nowrap absolute w-full"
          style={{
            top: `${(100 / filas) * i}%`,
            height: `${100 / filas}%`,
            animation: `${i % 2 === 0 ? 'moverIzquierda' : 'moverDerecha'} 30s linear infinite`
          }}
        >
          {fila.concat(fila).map((img, idx) => (
            <img
              key={`${i}-${idx}`}
              src={img}
              alt={`img-${idx}`}
              className="object-cover"
              style={{
                height: '100%',
                width: `${100 / fila.length}%`
              }}
            />
          ))}
        </div>
      ))}

      <style>{`
        @keyframes moverIzquierda {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes moverDerecha {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CarruselImagenes;
