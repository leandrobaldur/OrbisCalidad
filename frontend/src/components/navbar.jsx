import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ROL_ADMIN = 1;

const getRoleName = (id_rol) => {
  switch (id_rol) {
    case 1:
      return "Administrador";
    case 2:
      return "Colaborador";
    default:
      return "Usuario";
  }
};

const Navbar = ({ loggedInUser, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseLinks = [
    { label: "NOSOTROS", path: "/historia" },
    { label: "REVISTA", path: "/revistaPage" },
    { label: "INICIO", path: "/" },
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
      className="w-full fixed top-20 z-50 flex items-center justify-center bg-[#F6F0E0] border-b border-gray-200 shadow-sm py-4 px-6 md:px-10 lg:px-20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Espacio flexible a la izquierda */}
      <div className="flex-1 min-w-[50px] md:min-w-[unset]"></div>

      {/* Enlaces escritorio */}
      <div className="hidden md:flex flex-nowrap justify-center items-center gap-x-6 lg:gap-x-8">
        {finalLinks.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <React.Fragment key={index}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`font-['Century Gothic'] text-[1.146rem] tracking-widest font-light relative pb-1 cursor-pointer select-none inline-block ${
                    isActive ? "text-[#052018]" : "text-[#333333]"
                  } hover:text-[#052018] transition-colors duration-200 whitespace-nowrap`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="h-0.5 bg-[#010C16] rounded-md absolute bottom-0 left-0 right-0"
                    />
                  )}
                </Link>
              </motion.div>
              {index < finalLinks.length - 1 && (
                <motion.span
                  className="text-gray-300 font-extralight select-none text-[1.146rem]"
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

        {/* Info usuario y logout */}
        {loggedInUser && (
          <div className="flex items-center gap-2 ml-8">
            <span className="font-['Century Gothic'] text-base text-gray-700 whitespace-nowrap">
              {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
            </span>
            <button
              onClick={onLogout}
              className="bg-red-700 hover:bg-red-800 border-none text-white px-3 py-1.5 rounded-md font-semibold cursor-pointer font-['Century Gothic'] text-sm transition-colors duration-300 whitespace-nowrap"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>

      {/* Espacio flexible a la derecha */}
      <div className="flex-1 min-w-[50px] md:min-w-[unset]"></div>

      {/* Botón hamburguesa móvil */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-[#052018] focus:outline-none text-2xl">
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#F6F0E0] z-40 flex flex-col items-center justify-center space-y-6 md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={toggleMobileMenu} className="absolute top-4 right-6 text-[#052018] text-4xl focus:outline-none">
              &times;
            </button>

            {finalLinks.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    to={item.path}
                    className={`font-['Century Gothic'] text-2xl tracking-widest font-light relative pb-1 cursor-pointer select-none inline-block ${
                      isActive ? "text-[#052018]" : "text-[#333333]"
                    } hover:text-[#052018]`}
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="underline-mobile"
                        className="h-1 bg-[#010C16] rounded-md absolute bottom-0 left-0 right-0"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {loggedInUser && (
              <div className="flex flex-col items-center gap-4 mt-6">
                <span className="font-['Century Gothic'] text-lg text-gray-700">
                  {loggedInUser.usuario} ({getRoleName(loggedInUser.id_rol)})
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMobileMenu();
                  }}
                  className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-md font-semibold font-['Century Gothic'] text-base transition-colors duration-300"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
