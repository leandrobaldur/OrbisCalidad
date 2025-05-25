import pool from '../db.js';

const obtenerTamanios = async () => {
  const query = `
    SELECT * FROM TAMANIOS_EMPRESAS
    ORDER BY id_tamanio ASC
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error en obtenerTamanios:', error);
    throw new Error('Error al consultar los tamaños');
  }
};

export default {
  obtenerTamanios,
};
