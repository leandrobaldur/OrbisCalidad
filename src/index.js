
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
import Navbar from './components/Navbar';

ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/empresas" element={<EmpresasPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/historia" element={<HistoriaPage />} />
      <Route path="/editor-empresas" element={<EditorEmpresasPage />} />
      <Route path="/editor-usuarios" element={<EditorUsuariosPage />} />
      
    </Routes>
  </Router>,
  document.getElementById('root')
);
