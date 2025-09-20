// src/screens/empresasPage.js
import React from "react";
import EmpresasPanel from "../components/empresasPanel";

const EmpresasPage = ({ loggedInUser }) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <EmpresasPanel loggedInUser={loggedInUser} />
    </div>
  );
};

export default EmpresasPage;
