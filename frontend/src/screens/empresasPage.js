// src/screens/empresasPage.js
import React from "react";
import EmpresasPanel from "../components/empresasPanel";  // ajusta la ruta si hace falta

const EmpresasPage = ({ loggedInUser }) => {
  return <EmpresasPanel loggedInUser={loggedInUser} />;
};


export default EmpresasPage;
