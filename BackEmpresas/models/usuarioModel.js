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
    VALUES (2, $1, $2)
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

// ✅ NUEVA FUNCIÓN PARA GET /usuarios
const obtenerTodosLosUsuarios = async () => {
  const query = `
    SELECT id_usuario, id_rol, usuario
    FROM USUARIOS
    ORDER BY id_usuario ASC
  `;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error en obtenerTodosLosUsuarios:', error);
    throw new Error('Error al obtener la lista de usuarios');
  }
};
const eliminarUsuarioPorId = async (idUsuario) => {
  const query = `DELETE FROM USUARIOS WHERE id_usuario = $1`;
  const values = [idUsuario];
  try {
    await pool.query(query, values);
  } catch (error) {
    console.error('Error en eliminarUsuarioPorId:', error);
    throw new Error('Error al eliminar usuario');
  }
};



export default {
  buscarUsuario,
  insertUsuario,
  obtenerTodosLosUsuarios, // ✅ agregado al export
  eliminarUsuarioPorId, // ✅ agregado al export
};