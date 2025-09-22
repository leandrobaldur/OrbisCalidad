// src/screens/empresasPage.js
import React from "react";
//import EmpresasPanel from "../components/empresasPanel";
import EmpresasPanelWrapper from '../components/EmpresasPanelWrapper';

const EmpresasPage = ({ loggedInUser }) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <EmpresasPanelWrapper loggedInUser={loggedInUser} />
    </div>
  );
};

export default EmpresasPage;
