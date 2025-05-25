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

  const obtenerImagenesDesdeBackend = async () => {
    try {
      // Paso 1: Obtener resumen de empresas (solo ID)
      const resumen = await axios.get(`${backendUrl}/empresas/resumen`);
      const ids = resumen.data.map((e) => e.id_empresa);

      // Paso 2: Obtener detalles por ID para extraer las URLs
      const respuestas = await Promise.all(
        ids.map((id) => axios.get(`${backendUrl}/empresa/${id}`))
      );

      const urls = respuestas
        .map((res) => res.data.url)
        .filter((url) => url && typeof url === 'string');

      const imagenesBarajadas = shuffleArray(urls);
      const distribuidas = distribuirEquitativamente(imagenesBarajadas, filas);
      setImagenesDistribuidas(distribuidas);
    } catch (error) {
      console.error('❌ Error al obtener imágenes desde backend:', error);
    }
  };

  const distribuirEquitativamente = (imagenes, filas) => {
    const distribuidas = Array.from({ length: filas }, () => []);
    imagenes.forEach((img, index) => {
      distribuidas[index % filas].push(img);
    });
    return distribuidas;
  };

  useEffect(() => {
    obtenerImagenesDesdeBackend();
  }, []);

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
              alt={`Logo empresa ${idx}`}
              loading="lazy"
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
