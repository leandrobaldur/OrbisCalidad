import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InicioSesion from "./inicioSesion";

function Header({ loggedInUser, onLogout, onLogin, toggleMobileMenu }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Measure header height and apply as CSS variable and root padding
    const applyHeaderSpacing = () => {
      try {
        const el = headerRef.current || document.querySelector('header.w-full.fixed');
        const h = el ? el.offsetHeight : 0;
  // set CSS variable on :root for use in styles
  document.documentElement.style.setProperty('--site-header-height', h + 'px');
      } catch (err) {
        // ignore
        console.warn('applyHeaderSpacing error', err);
      }
    };

    // apply initially and on resize / font load
    applyHeaderSpacing();
    window.addEventListener('resize', applyHeaderSpacing);
    window.addEventListener('load', applyHeaderSpacing);
    // fonts might change metrics
    var fontsReadyPromise = null;
    if (document.fonts && document.fonts.ready) {
      fontsReadyPromise = document.fonts.ready.then(applyHeaderSpacing).catch(()=>{});
    }
    return () => {
      window.removeEventListener('resize', applyHeaderSpacing);
      window.removeEventListener('load', applyHeaderSpacing);
      // do not modify CSS variable on cleanup to avoid visual jumps; just remove stored promise reference
      fontsReadyPromise = null;
    };
  }, []);

  const handleLoginClick = () => {
    if (loggedInUser) {
      return;
    }
    setShowLogin(true);
  };

  const handleCloseLogin = () => setShowLogin(false);

  const getRoleName = (idRol) => {
    switch (idRol) {
      case 1:
        return "Superadmin";
      case 2:
        return "Admin";
      case 3:
        return "Investigador";
      case 4:
        return "Temporal";
      case 5:
        return "Visitante";
      default:
        return "Usuario";
    }
  };

  const styles = {
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2.5rem",
      backgroundColor: "white",
      position: "relative",
      zIndex: 50,
    },
    icon: {
      color: "black",
      cursor: "pointer",
    },
    logo: {
      height: "64px",
      objectFit: "contain",
    },
    dropdown: {
      position: "absolute",
      top: "80px",
      right: "40px",
      backgroundColor: "white",
      border: "1px solid #e2e2e2",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      zIndex: 99,
    },
    dropdownItem: {
      padding: "10px 16px",
      width: "200px",
      textAlign: "left",
      cursor: "pointer",
      backgroundColor: "white",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <>
  <header ref={headerRef} className="w-full fixed top-0 h-28 flex justify-between items-center px-4 md:px-10 bg-primary backdrop-blur-sm z-40">
        {/* Izquierda: Icono de menú para móvil */}
        <div className="flex-1 flex justify-start">
          {/* Botón de menú hamburguesa (siempre visible en móvil) */}
          <button 
            onClick={toggleMobileMenu}
            className="block md:hidden focus:outline-none p-0 shadow-none font-normal rounded-none"
            aria-label="Abrir menú"
            style={{ background: 'none', boxShadow: 'none', border: 'none', color: '#FEFCFB', zIndex: 9999 }}
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: '#FEFCFB', display: 'block' }}
            >
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#FEFCFB"
                strokeWidth={window.innerWidth <= 640 ? 1.5 : window.innerWidth <= 768 ? 2 : 2.5}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Centro: Título limpio */}
        <div
          className="flex items-center justify-center select-none cursor-pointer"
          onClick={() => navigate("/")}
          title="Inicio"
        >
          <img
            src="/media/header/logo.png"
            alt="Logo Orbis Empresarial"
            className="h-16 sm:h-20 md:h-24 lg:h-24 object-contain block"
            draggable={false}
          />
        </div>

        {/* Derecha: Icono Login y datos de usuario */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.img
            src={window.innerWidth <= 640 ? "/media/header/login-beige-mobile.svg" : "/media/header/login-beige.svg"}
            alt="Iniciar sesión"
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 cursor-pointer object-contain select-none"
            onClick={handleLoginClick}
            draggable={false}
            title="Iniciar sesión"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />

          {loggedInUser && (
            <>
              <motion.span
                className="font-sans text-sm text-brand-slate select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loggedInUser.usuario} ({getRoleName(loggedInUser.idRol)})
              </motion.span>

              <motion.button
                onClick={() => {
                  onLogout?.();
                  navigate("/");
                }}
                className="bg-brand-dark hover:bg-brand-slate text-white px-4 py-2 rounded-md cursor-pointer font-sans text-sm transition-all duration-200 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Cerrar sesión"
              >
                Cerrar Sesión
              </motion.button>
            </>
          )}
        </div>
      </header>

      {/* Modal Login */}
      {showLogin && (
        <InicioSesion
          onLogin={(authData) => {
            onLogin?.(authData);
            setShowLogin(false);
          }}
          onClose={handleCloseLogin}
        />
      )}
    </>
  );
}

export default Header;
