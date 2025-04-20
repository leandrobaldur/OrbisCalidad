import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/homePage';
import EmpresasPage from './screens/empresasPage';
import ContactoPage from './screens/contactoPage';
import HistoriaPage from './screens/historiaPage';
import EditorEmpresasPage from './screens/editorEmpresasPage';
import EditorUsuariosPage from './screens/editorUsuariosPage';
import DashboardPage from './screens/dashboardPage';


import Header from './components/header'; // ⬅️ Este es el nuevo import
import Navbar from './components/navbar.jsx';

ReactDOM.render(
  <Router>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
        <Route path="/editor-usuarios" element={<EditorUsuariosPage />} />
        <Route path="/dashboards" element={<DashboardPage />} />

      </Routes>
    </div>
  </Router>,
  document.getElementById('root')
);
