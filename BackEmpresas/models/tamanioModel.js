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

const asignarTamanioEmpresa = async ({ id_empresa, id_tamanio, fecha_inicio_et, fecha_fin_et, num_empleados }) => {
  const query = `
    INSERT INTO EMPRESAS_TAMANIOS (id_empresa, id_tamanio, fecha_inicio_et, fecha_fin_et, num_empleados)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [id_empresa, id_tamanio, fecha_inicio_et, fecha_fin_et || null, num_empleados];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error en asignarTamanioEmpresa:', error);
    throw new Error('Error al asignar tamaño a la empresa');
  }
};

export default {
  obtenerTamanios,
  asignarTamanioEmpresa,
};
