import db from '../db.js';

const buscarEmpresas = async (query, params) => {
    const result = await db.query(query, params);
    return result.rows;
};

export const busquedaModel = {
    buscarEmpresas
};
