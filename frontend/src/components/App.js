import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import InicioSesion from './inicioSesion';
import Navbar from './navbar.jsx';
import Header from './header';
import RevistaPage from '../screens/revistaPage.jsx';
import HomePage from '../screens/homePage';
import EmpresasPage from '../screens/empresasPage';
import ContactoPage from '../screens/contactoPage';
import HistoriaPage from '../screens/historiaPage';
import EquipoPage from '../screens/equipoPage.js'; // Importar el componente EquipoPage
import EditorEmpresasPage from '../screens/editorEmpresasPage';
import PanelEditorUsuarios from './panelEditorUsuarios_temp';
import FooterBar from './footerBar.js';


function RedirectDashboard() {
  useEffect(() => {
    window.open('https://dashboard.serverbb.site/', '_blank');
  }, []);

  return (
    <div className="p-12 text-center">
      Abriendo el dashboard externo en una nueva pestaña...
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogin = useCallback((userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setLoggedInUser(userData);
    setShowLoginModal(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50/50">
        <Header 
          loggedInUser={loggedInUser} 
          onLogout={handleLogout} 
          onLogin={handleLogin} 
          toggleMobileMenu={toggleMobileMenu}
        />
        {/* CORRECCIÓN: Asegurarnos de pasar loggedInUser al Navbar */}
        <Navbar 
          loggedInUser={loggedInUser} 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <main className="flex-grow pt-[156px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empresas" element={<EmpresasPage loggedInUser={loggedInUser} />} />
            <Route path="/revistaPage" element={<RevistaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/historia" element={<HistoriaPage />} />
            <Route path="/equipo" element={<EquipoPage />} /> {/* Nueva ruta agregada */}

            <Route
              path="/dashboards"
              element={
                loggedInUser ? (
                  <RedirectDashboard />
                ) : (
                  <div className="p-12 text-center text-accent font-bold">
                    Acceso denegado. Inicia sesión.
                  </div>
                )
              }
            />

            {loggedInUser && loggedInUser.id_rol === 1 && (
              <>
                <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
                <Route path="/panel-usuarios" element={<PanelEditorUsuarios />} />
              </>
            )}

            {loggedInUser && loggedInUser.id_rol !== 1 && (
              <>
                <Route
                  path="/editor-empresas"
                  element={
                    <div className="p-12 text-center text-accent font-bold">
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
                <Route
                  path="/panel-usuarios"
                  element={
                    <div className="p-12 text-center text-accent font-bold">
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
              </>
            )}

            {!loggedInUser && (
              <Route
                path="*"
                element={
                  <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] text-center">
                    <h1 className="text-4xl mb-4">Plataforma de Empresas</h1>
                    <p className="mb-6">Por favor, inicie sesión para acceder al sistema.</p>
                    <button onClick={() => setShowLoginModal(true)}>
                      Iniciar Sesión
                    </button>
                  </div>
                }
              />
            )}
          </Routes>
        </main>

        {showLoginModal && !loggedInUser && (
          <InicioSesion onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
        )}

        <FooterBar />
      </div>
    </Router>
  );
}

export default App;
