import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROL_ADMIN = 1;

const Navbar = ({ loggedInUser }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseLinks = [
    { label: "NOSOTROS", path: "/historia" },
    { label: "EQUIPO", path: "/equipo" },
    { label: "INICIO", path: "/" },
    { label: "REVISTA", path: "/revistaPage" },
    
     // Nueva entrada agregada
    { label: "EMPRESAS", path: "/empresas" },
    { label: "CONTACTO", path: "/contacto" },
  ];

  let finalLinks = [...baseLinks];
  if (loggedInUser && loggedInUser.id_rol === ROL_ADMIN) {
    finalLinks.push({ label: "ADMIN USUARIOS", path: "/panel-usuarios" });
    finalLinks.push({ label: "DASHBOARDS", path: "/dashboards" });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="w-full fixed top-20 z-50 flex items-center justify-center bg-surface border-b border-stroke shadow-sm py-4 px-6 md:px-10 lg:px-20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1 min-w-[50px] md:min-w-[unset]"></div>

      <div className="hidden md:flex flex-nowrap justify-center items-center gap-x-6 lg:gap-x-8">
        {finalLinks.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <React.Fragment key={index}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  /* AJUSTE MINIMALISTA: Se usa tracking-widest para un look más elegante */
                  className={`font-bodoni text-base tracking-widest relative pb-1 cursor-pointer select-none inline-block transition-colors duration-200 whitespace-nowrap ${
                    isActive ? "text-primary" : "text-text-main"
                  } hover:text-primary`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="h-0.5 bg-primary rounded-md absolute bottom-0 left-0 right-0"
                    />
                  )}
                </Link>
              </motion.div>
              {index < finalLinks.length - 1 && (
                <motion.span
                  className="text-stroke font-light select-none text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  |
                </motion.span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex-1 min-w-[50px] md:min-w-[unset]"></div>

      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-primary focus:outline-none text-2xl">
          ☰
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-surface z-40 flex flex-col items-center justify-center space-y-6 md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={toggleMobileMenu} className="absolute top-4 right-6 text-primary text-4xl focus:outline-none">
              &times;
            </button>
            {finalLinks.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    to={item.path}
                    className={`font-bodoni text-2xl tracking-widest relative pb-1 cursor-pointer select-none inline-block ${
                      isActive ? "text-primary" : "text-text-main"
                    } hover:text-primary`}
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="underline-mobile"
                        className="h-1 bg-primary rounded-md absolute bottom-0 left-0 right-0"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;