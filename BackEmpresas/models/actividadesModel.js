import pool from '../db.js';

const obtenerActividades = async () => {
    const query = `
        SELECT * FROM ACTIVIDADES
        ORDER BY id_actividad ASC
    `;
    
    try {
        const { rows } = await pool.query(query);
        return rows;
    }
    catch (error) {
        console.error('Error en obtenerActividades:', error);
        throw new Error('Error al consultar las actividades');
    }
}

export const actividadesModel = {
    obtenerActividades,
}