import React from 'react';

const ContactoPage = () => {
  const FlipCard = ({ frontImage, alt, backText }) => (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={frontImage} alt={alt} className="rounded-xl w-full h-64 object-cover" />
        </div>
        <div className="flip-card-back">
          <p className="text-center font-semibold p-4">{backText}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-7">
      <div className="w-full max-w-screen-xl bg-[rgba(0,0,0,0.7)] rounded-3xl p-9 shadow-2xl">
        <div className="bg-[rgb(255,255,255)] rounded-2xl p-6 space-y-8 font-sans text-black">
          
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-center mb-8">UNIVERSIDAD CATÓLICA BOLIVIANA</h1>

          {/* Encabezado con imágenes */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <img src="/media/contactoPage/entradaUcb.webp" alt="Imagen izquierda" className="w-full md:w-1/2 rounded-xl object-cover" />
            <img src="/media/contactoPage/logoUcb.jpg" alt="Imagen derecha" className="w-full md:w-1/2 rounded-xl object-cover" />
          </div>

          {/* QRs */}
          <section>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {[1, 2, 3].map((qr, idx) => (
                <div key={idx} className="flex flex-col items-center w-full md:w-1/3 text-center">
                  <img src="/media/contactoPage/qr.png" alt={`QR ${qr}`} className="w-2/3 rounded-xl object-contain" />
                  <p className="mt-2 font-semibold">QR {qr}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Nuestro equipo */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-4">NUESTRO EQUIPO</h2>
            <div className="grid grid-cols-1 gap-6 items-center">
              <img src="/media/contactoPage/equipo.jpg" alt="Equipo" className="mx-auto w-full rounded-xl object-contain" />
            </div>
            <p>
            Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.Somos jóvenes estudiantes de la universidad católica boliviana en busca de conocimiento y oportunidades para un futuro mejor y poder desempeñarnos en nuestra área laboral.
            </p>
          </section>

          {/* Misión y Visión */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-4">MISION Y VISION</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <FlipCard
                  frontImage="/media/contactoPage/mision.png"
                  alt="Misión"
                  backText="Nuestra misión es formar profesionales con valores humanos y compromiso social."
                />
                <p className="mt-2 font-semibold text-center text-[rgba(0,0,0,0.1)]">HAZ CLICK en la imagen</p>
              </div>
              <div className="text-center">
                <FlipCard
                  frontImage="/media/contactoPage/vision.png"
                  alt="Visión"
                  backText="Nuestra visión es ser líderes en educación superior en Bolivia y Latinoamérica."
                />
                <p className="mt-2 font-semibold text-center text-[rgba(0,0,0,0.1)]">HAZ CLICK en la imagen</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
