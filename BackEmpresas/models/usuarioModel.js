import pool from '../db.js'; 

const buscarUsuario = async (usuario, contrasenia) => {
  const query = `
    SELECT * FROM USUARIOS
    WHERE usuario = $1 AND contrasenia = $2
    LIMIT 1
  `;
  const values = [usuario, contrasenia];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error en buscarUsuario:', error);
    throw new Error('Error al consultar la base de datos');
  }
};

export default {
  buscarUsuario,
};
