import pool from '../db.js';

const obtenerLogs = async () => {
  const query = `
    SELECT * FROM log_transacciones
    ORDER BY id ASC;
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
    }
    catch (error) {
    console.error('Error en obtenerLogs:', error);
    throw new Error('Error al consultar los logs');
    }
}

const registrarLog = async ({ id_usuario, tabla, tipo_log }) => {
  const query = `
    insert into log_transacciones (id_usuario, tabla_afectada, operacion)
    values($1, $2, $3);
  `;

  try {
    const { rows } = await pool.query(query, [id_usuario, tabla, tipo_log]);
    return rows[0];
  } catch (error) {
    console.error('Error en registrarLog:', error);
    throw new Error('Error al registrar el log');
  }
};

export default {
    obtenerLogs,
    registrarLog,
};