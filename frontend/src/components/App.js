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
import EditorEmpresasPage from '../screens/editorEmpresasPage';
import PanelEditorUsuarios from './panelEditorUsuarios_temp';

// Componente para abrir el dashboard externo en nueva pestaña
function RedirectDashboard() {
  useEffect(() => {
    window.open('https://dashboard.serverbb.site/', '_blank');
  }, []);

  return (
    <div style={{ padding: 50, textAlign: 'center' }}>
      Abriendo el dashboard externo en una nueva pestaña...
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      {/* Este div principal encapsula toda la aplicación */}
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* Header y Navbar se renderizan fuera de las rutas */}
        <Header loggedInUser={loggedInUser} onLogout={handleLogout} onLogin={handleLogin} />
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />

        {/* Este es el div que contiene todas tus páginas.
          Le añadimos la clase 'pt-[140px]' para que el contenido empiece debajo
          de tu Header (80px) y tu Navbar (aprox 60px).
        */}
        <div className="pt-[140px]"> {/* <--- AÑADIDO AQUÍ */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empresas" element={<EmpresasPage loggedInUser={loggedInUser} />} />
            <Route path="/revistaPage" element={<RevistaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/historia" element={<HistoriaPage />} />

            {/* Ruta dashboards */}
            <Route
              path="/dashboards"
              element={
                loggedInUser ? (
                  <RedirectDashboard />
                ) : (
                  <div
                    style={{
                      padding: 50,
                      textAlign: 'center',
                      color: '#FF4201',
                      fontWeight: 'bold',
                    }}
                  >
                    Acceso denegado. Inicia sesión.
                  </div>
                )
              }
            />

            {/* Rutas de administrador */}
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
                    <div
                      style={{
                        padding: 50,
                        textAlign: 'center',
                        color: '#FF4201',
                        fontWeight: 'bold',
                      }}
                    >
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
                <Route
                  path="/panel-usuarios"
                  element={
                    <div
                      style={{
                        padding: 50,
                        textAlign: 'center',
                        color: '#FF4201',
                        fontWeight: 'bold',
                      }}
                    >
                      No tienes permisos para acceder a esta página.
                    </div>
                  }
                />
              </>
            )}

            {/* Ruta de fallback si no está logueado y no hay otras rutas */}
            {!loggedInUser && (
              <Route
                path="*"
                element={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 'calc(100vh - 120px)', // Esto también podría necesitar ajuste de padding-top
                      textAlign: 'center',
                    }}
                  >
                    <h1>Plataforma de Empresas</h1>
                    <p>Por favor, inicie sesión para acceder al sistema.</p>
                    <button
                      style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        backgroundColor: '#166D3B',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                      }}
                      onClick={() => setShowLoginModal(true)}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                }
              />
            )}
          </Routes>
        </div>

        {showLoginModal && !loggedInUser && (
          <InicioSesion onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;