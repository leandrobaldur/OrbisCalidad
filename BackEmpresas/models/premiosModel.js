import pool from '../db.js';

const obtenerPremios = async () => {
  const query = `
    SELECT * FROM PREMIOS
    ORDER BY id_premio ASC
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error en obtenerPremios:', error);
    throw new Error('Error al consultar los premios');
  }
};

const registrarPremioEmpresa = async ({ id_premio, id_empresa, anio }) => {
  const query = `
    INSERT INTO PREMIOS_EMPRESAS (id_premio, id_empresa, anio)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(query, [id_premio, id_empresa, anio]);
    return rows[0];
  } catch (error) {
    console.error('Error en registrarPremioEmpresa:', error);
    throw new Error('Error al registrar el premio para la empresa');
  }
};

export default {
  obtenerPremios,
  registrarPremioEmpresa,
};
