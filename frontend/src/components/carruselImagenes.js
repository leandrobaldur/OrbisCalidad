import React, { useEffect, useRef, useState } from 'react';
//import axios from 'axios';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CarruselImagenes = ({ altura, filas, backendUrl, modoPrueba = true }) => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenesDistribuidas, setImagenesDistribuidas] = useState([]);
  const contenedorRef = useRef(null);

  const distribuirEquitativamente = (imagenes, filas) => {
    const distribuidas = Array.from({ length: filas }, () => []);
    imagenes.forEach((img, index) => {
      distribuidas[index % filas].push(img);
    });
    return distribuidas;
  };

  /*
  const obtenerImagenes = async () => {
    try {
      const res = await axio.get(backendUrl);
      const imagenesBarajadas = shuffleArray(res.data);
      setImagenes(imagenesBarajadas);
      setImagenesDistribuidas(distribuirEquitativamente(imagenesBarajadas, filas));
    } catch (error) {
      console.error('Error al obtener imágenes:', error);
    }
  };
    */
  const obtenerImagenesPrueba = () => {
    const cantidad = 30;
    const rutas = Array.from({ length: cantidad }, (_, i) => 
      `/media/homePage/carruselImagenes/img${i + 1}.jpg`
    );

    const imagenesBarajadas = shuffleArray(rutas);
    setImagenes(imagenesBarajadas);
    setImagenesDistribuidas(distribuirEquitativamente(imagenesBarajadas, filas));
  };

  useEffect(() => {
    if (modoPrueba) {
      obtenerImagenesPrueba();
    } else {
      //obtenerImagenes();
    }
  }, [backendUrl, modoPrueba]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const siguiente = shuffleArray(imagenes);
      setImagenesDistribuidas(distribuirEquitativamente(siguiente, filas));
    }, 10000);
    return () => clearInterval(intervalo);
  }, [imagenes, filas]);

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
            animation: `${i % 2 === 0 ? 'moverIzquierda' : 'moverDerecha'} 20s linear infinite`
          }}
        >
          {fila.map((img, idx) => (
            <img
              key={idx}
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
          100% { transform: translateX(-50%); }
        }
        @keyframes moverDerecha {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CarruselImagenes;
