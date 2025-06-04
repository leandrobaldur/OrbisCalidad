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

  // Convierte el enlace de Google Drive en una URL accesible para la imagen
  const convertirUrlDrive = (url) => {
    if (url && url.includes("drive.google.com")) {
      const id = url.split("/d/")[1]?.split("/")[0]; // Extrae el ID del archivo
      if (id) {
        return `https://drive.google.com/uc?export=view&id=${id}`; // URL de imagen directa
      }
    }
    return url; // Devolver la URL tal cual está si es válida
  };

  const obtenerImagenesDesdeBackend = async () => {
    try {
      const resumen = await axios.get(`${backendUrl}/empresas/resumen`);
      const ids = resumen.data.map((e) => e.id_empresa);

      const respuestas = await Promise.all(
        ids.map((id) => axios.get(`${backendUrl}/empresa/${id}`))
      );

      const imagenes = respuestas.map((res) => {
        const url = convertirUrlDrive(res.data.url); // Convierte la URL si es válida
        console.log('Imagen URL:', url); // Verifica la URL convertida
        return {
          id_empresa: res.data.id_empresa,
          imagen: url || "", // Si la URL no es válida, asigna un string vacío
        };
      });

      const imagenesBarajadas = shuffleArray(imagenes);
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
      style={{ height: `${altura}px`, position: 'relative' }}
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
          {fila.concat(fila).map((empresa, idx) => (
            <div
              key={`${i}-${idx}`}
              style={{
                height: '100%',
                width: `${100 / fila.length}%`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {empresa.imagen ? (
                <img
                  src={empresa.imagen || '/path/to/default-image.jpg'}  // Usar imagen predeterminada si no hay imagen
                  alt={`Logo empresa ${empresa.id_empresa}`}
                  loading="lazy"
                  className="object-contain"
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span>No Image</span> {/* En caso de no tener imagen, muestra un texto de marcador */}
                </div>
              )}
            </div>
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
