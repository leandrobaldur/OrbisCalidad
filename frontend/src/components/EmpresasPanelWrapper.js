import React from 'react';
import EmpresasPanel from './empresasPanel';
import EmpresasPanelNuevo from './empresaPanelNuevo';

const EmpresasPanelWrapper = ({ loggedInUser }) => {
    // La validación se realiza aquí, en el componente superior.
    if (loggedInUser?.id_rol === 1) {
        // Si el usuario es administrador, renderiza el panel completo.
        // EmpresasPanel tiene sus propios Hooks en la parte superior.
        return <EmpresasPanel loggedInUser={loggedInUser} />;
    } else {
        // Para cualquier otro rol, renderiza el panel simplificado.
        // EmpresasPanelNuevo tiene sus propios Hooks en la parte superior.
        return <EmpresasPanelNuevo loggedInUser={loggedInUser} />;
    }
};

export default EmpresasPanelWrapper;