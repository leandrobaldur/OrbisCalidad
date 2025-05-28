import React, { useState } from 'react';

const ContactoPage = () => {
  const items = [
    {
      src: '/media/contactoPage/LP.png',
      alt: 'Universidad Católica Boliviana La Paz',
      text: 'Universidad Católica Boliviana\nLA PAZ',
      link: 'https://www.ucb.edu.bo/',
      hoverImg: '/media/contactoPage/UCB.png', // Imagen extra para hover
    },
    {
      src: '/media/contactoPage/SIS - H.png',
      alt: 'Carrera de Ingeniería de Sistemas',
      text: 'Carrera de Ingeniería\nde Sistemas',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-de-sistemas/',
      hoverImg: '/media/contactoPage/SIS-QR.png',
    },
    {
      src: '/media/contactoPage/IIE - H.png',
      alt: 'Carrera de Ingeniería Innovación Empresarial',
      text: 'Carrera de Ingeniería\nInnovación empresarial',
      link: 'https://lpz.ucb.edu.bo/pregrado/ingenieria-innovacion-empresarial/',
      hoverImg: '/media/contactoPage/IIE-QR.png',
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.line} />
        <h2 style={styles.subtitle}>EMPRESAS QUE FORJARON EL PAIS</h2>
        <div style={styles.line} />
      </header>

      <section style={styles.contentBox}>
        <h1 style={styles.title}>DEPARTAMENTOS ANHIDADOS</h1>
        <p style={styles.description}>
          Explora las últimas noticias, actualizaciones y promociones disponibles en nuestra plataforma.
        </p>

        <div style={styles.grid}>
          {items.map(({ src, alt, text, link, hoverImg }, idx) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              style={styles.card}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div style={{ position: 'relative' }}>
                <img src={src} alt={alt} style={styles.image} />
                {hoverIndex === idx && (
                  <div style={styles.hoverCard}>
                    <img src={hoverImg} alt={`Detalle de ${alt}`} style={styles.hoverImage} />
                  </div>
                )}
              </div>
              <p style={styles.cardText}>
                {text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
};

const styles = {
  page: {
    backgroundColor: '#F5EEE2',
    minHeight: '100vh',
    padding: '8rem 6rem',
    fontFamily: "'Montserrat', sans-serif",
    color: '#032F27',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '4rem',
    width: '100%',
    maxWidth: 1400,
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 5,
    backgroundImage:
      'repeating-linear-gradient(90deg, #032F27, #032F27 20px, transparent 20px, transparent 40px)',
    borderRadius: 3,
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    color: '#032F27',
    whiteSpace: 'nowrap',
  },
  contentBox: {
    backgroundColor: '#FDF8F0',
    padding: '6rem 8rem',
    borderRadius: '40px',
    boxShadow: '0 18px 36px rgba(3,47,39,0.2)',
    maxWidth: 1400,
    textAlign: 'center',
  },
  title: {
    fontSize: '4rem',
    fontWeight: '900',
    marginBottom: '3rem',
  },
  description: {
    fontSize: '2rem',
    lineHeight: 2,
    maxWidth: 900,
    margin: '0 auto 5rem',
    color: '#032F27',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '4rem',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#F5EEE2',
    borderRadius: '28px',
    padding: '4rem',
    boxShadow: '0 10px 40px rgba(3,47,39,0.25)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    color: '#032F27',
    minHeight: 360,
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    marginBottom: '2rem',
  },
  cardText: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#032F27',
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
  hoverCard: {
    position: 'absolute',
    top: '50%',
    left: '110%',
    transform: 'translateY(-50%)',
    backgroundColor: '#FDF8F0',
    padding: '1rem',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(3,47,39,0.2)',
    zIndex: 10,
    width: '220px',
    height: '220px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoverImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
};

export default ContactoPage;
