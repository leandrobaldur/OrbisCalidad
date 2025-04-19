import pool from '../db.js';

const insertarEmpresa = async (empresaData) => {
  const query = `
    INSERT INTO EMPRESAS (
      denominacion_social,
      nombre_comercial,
      fecha_fundacion,
      fecha_cierre,
      nit,
      eslogan,
      descripcion,
      url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id_empresa
  `;

  const values = [
    empresaData.denominacion_social,
    empresaData.nombre_comercial,
    empresaData.fecha_fundacion,
    empresaData.fecha_cierre || null,
    empresaData.nit,
    empresaData.eslogan,
    empresaData.descripcion,
    empresaData.url
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0].id_empresa;
  } catch (error) {
    console.error('Error en insertarEmpresa:', error); // Deja esto
  console.error('Detalle del error PostgreSQL:', error.message); // Agrega esto
  throw new Error('Error al crear la empresa');
  }
};

export default {
  insertarEmpresa,
};