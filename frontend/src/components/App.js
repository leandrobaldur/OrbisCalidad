import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import InicioSesion from './inicioSesion';
import Navbar from './navbar.jsx';
import Header from './header';

import HomePage from '../screens/homePage';
import EmpresasPage from '../screens/empresasPage';
import ContactoPage from '../screens/contactoPage';
import HistoriaPage from '../screens/historiaPage';
import EditorEmpresasPage from '../screens/editorEmpresasPage';
import PanelEditorUsuarios from './panelEditorUsuarios_temp';

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

  const handleLogin = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    setLoggedInUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Header loggedInUser={loggedInUser} onLogout={handleLogout} onLogin={handleLogin} />
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/historia" element={<HistoriaPage />} />

          <Route
            path="/dashboards"
            element={
              loggedInUser ? (
                <Dashboard usuario={loggedInUser} onLogout={handleLogout} />
              ) : (
                <div style={{ padding: 50, textAlign: 'center', color: '#FF4201', fontWeight: 'bold' }}>
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
                  <div style={{ padding: 50, textAlign: 'center', color: '#FF4201', fontWeight: 'bold' }}>
                    No tienes permisos para acceder a esta página.
                  </div>
                }
              />
              <Route
                path="/panel-usuarios"
                element={
                  <div style={{ padding: 50, textAlign: 'center', color: '#FF4201', fontWeight: 'bold' }}>
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 120px)',
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

        {showLoginModal && !loggedInUser && (
          <InicioSesion
            onLogin={handleLogin}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
