import pool from '../db.js';

const insertarEmpresa = async (empresaData) => {
  const query = `
    INSERT INTO EMPRESAS (
      denominacion_social,
      nombre_comercial,
      fecha_fundacion,
      nit,
      vision,
      mision,
      descripcion,
      url,
      direccion_web,
      id_actividad,
      id_tamanio
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id_empresa
  `;

  const values = [
    empresaData.denominacion_social,
    empresaData.nombre_comercial,
    empresaData.fecha_fundacion,
    empresaData.nit,
    empresaData.vision,
    empresaData.mision,
    empresaData.descripcion,
    empresaData.url,
    empresaData.direccion_web,
    empresaData.id_actividad,
    empresaData.id_tamanio
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0].id_empresa;
  } catch (error) {
    console.error('Error en insertarEmpresa:', error);
    console.error('Detalle del error PostgreSQL:', error.message);
    throw new Error('Error al crear la empresa');
  }
};

const actualizarEmpresa = async (id, empresaData) => {
  const query = `
    UPDATE EMPRESAS
    SET
      denominacion_social = $1,
      nombre_comercial = $2,
      fecha_fundacion = $3,
      nit = $4,
      vision = $5,
      mision = $6,
      descripcion = $7,
      url = $8,
      direccion_web = $9,
      id_actividad = $10,
      id_tamanio = $11
    WHERE id_empresa = $12
    RETURNING id_empresa
  `;

  const values = [
    empresaData.denominacion_social,
    empresaData.nombre_comercial,
    empresaData.fecha_fundacion,
    empresaData.nit,
    empresaData.vision,
    empresaData.mision,
    empresaData.descripcion,
    empresaData.url,
    empresaData.direccion_web,
    empresaData.id_actividad,
    empresaData.id_tamanio,
    id
  ];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Error en actualizarEmpresa:', error);
    throw new Error('Error al actualizar la empresa');
  }
};

const obtenerEmpresasConPropietarios = async () => {
  const query = `
    SELECT 
      e.id_empresa,
      e.nombre_comercial,
      e.denominacion_social,
      COALESCE(STRING_AGG(
        CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno), ', '
      ), 'Sin propietario') AS nombre_propietario
    FROM empresas e
    LEFT JOIN historial_propiedad hp ON e.id_empresa = hp.id_empresa
    LEFT JOIN propietarios p ON hp.id_propietario = p.id_propietario
    GROUP BY e.id_empresa, e.nombre_comercial, e.denominacion_social
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error en obtenerEmpresasConPropietarios:', error);
    throw new Error('Error al obtener empresas');
  }
};



export default {
  insertarEmpresa,
  obtenerEmpresas,
  obtenerEmpresasConPropietarios,
};
