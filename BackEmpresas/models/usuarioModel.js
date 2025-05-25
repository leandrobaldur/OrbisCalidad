import pool from '../db.js'; 

const buscarUsuario = async (usuario) => {
  const query = `
    SELECT * FROM USUARIOS
    WHERE usuario = $1
    LIMIT 1
  `;
  const values = [usuario];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error en buscarUsuario:', error);
    throw new Error('Error al consultar la base de datos');
  }
};

const insertUsuario = async (usuario, contrasenia) => {
  const query = `
    INSERT INTO USUARIOS (id_rol, usuario, contrasenia)
    VALUES (2, $1, $2))
    RETURNING id_usuario, usuario, id_rol
  `;
  const values = [usuario, contrasenia];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error en insertUsuario:', error);
    throw new Error('Error al crear el usuario');
  }
};

export default {
  buscarUsuario,
  insertUsuario,
};
