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
    console.error('Error en insertarEmpresa:', error);
    console.error('Detalle del error PostgreSQL:', error.message);
    throw new Error('Error al crear la empresa');
  }
};

const obtenerEmpresas = async () => {
  const query = "SELECT id_empresa, nombre_comercial, denominacion_social FROM EMPRESAS";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    throw new Error('Error al obtener empresas');
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

const obtenerPremios = async () => {
  const query = `SELECT id_premio, descripcion FROM premios`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener premios:', error);
    throw new Error('Error al obtener premios');
  }
};

const obtenerEmpresasPorPremio = async (idPremio) => {
  const query = `
    SELECT e.id_empresa, e.nombre_comercial, e.denominacion_social
    FROM empresas e
    JOIN premios_empresas pe ON e.id_empresa = pe.id_empresa
    JOIN premios p ON pe.id_premio = p.id_premio
    WHERE pe.id_premio = $1
  `;
  try {
    const { rows } = await pool.query(query, [idPremio]);
    return rows;
  } catch (error) {
    console.error('Error al filtrar empresas por premio:', error);
    throw new Error('Error al filtrar empresas por premio');
  }
};

const obtenerRubros = async () => {
  const query = `SELECT id_rublo, nombre_rubro FROM rubros`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener rubros:', error);
    throw new Error('Error al obtener rubros');
  }
};

const obtenerEmpresasPorRubro = async (idRublo) => {
  const query = `
    SELECT DISTINCT e.id_empresa, e.nombre_comercial, e.denominacion_social
    FROM empresas e
    JOIN empresa_actividad ea ON e.id_empresa = ea.id_empresa
    JOIN rubros_actividades ra ON ea.id_actividad = ra.id_actividad
    WHERE ra.id_rublo = $1
  `;
  try {
    const { rows } = await pool.query(query, [idRublo]);
    return rows;
  } catch (error) {
    console.error('Error al filtrar empresas por rubro:', error);
    throw new Error('Error al filtrar empresas por rubro');
  }
};

const obtenerEmpresasMayoresA50 = async () => {
  const query = `
    SELECT 
      id_empresa, 
      nombre_comercial, 
      denominacion_social,
      fecha_fundacion,
      fecha_cierre,
      EXTRACT(YEAR FROM COALESCE(fecha_cierre, CURRENT_DATE)) - EXTRACT(YEAR FROM fecha_fundacion) AS antiguedad
    FROM empresas
    WHERE 
      (EXTRACT(YEAR FROM COALESCE(fecha_cierre, CURRENT_DATE)) - EXTRACT(YEAR FROM fecha_fundacion)) > 50
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener empresas mayores a 50 años:', error);
    throw new Error('Error al obtener empresas con antigüedad mayor a 50 años');
  }
};

// Obtener todos los departamentos
const obtenerDepartamentos = async () => {
  const query = `SELECT id_departamento, nombre_depto FROM departamentos`;
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    throw new Error('Error al obtener departamentos');
  }
};


const obtenerEmpresasPorDepartamento = async (idDepartamento) => {
  const query = `
    SELECT DISTINCT e.id_empresa, e.nombre_comercial, e.denominacion_social
    FROM empresas e
    INNER JOIN empresas_sedes es ON e.id_empresa = es.id_empresa
    INNER JOIN sedes s ON es.id_ubicacion = s.id_ubicacion
    INNER JOIN municipios m ON s.id_municipio = m.id_municipio
    INNER JOIN ciudades c ON m.id_ciudad = c.id_ciudad
    INNER JOIN departamentos d ON c.id_departamento = d.id_departamento
    WHERE d.id_departamento = $1
  `;

  try {
    const { rows } = await pool.query(query, [idDepartamento]);
    return rows;
  } catch (error) {
    console.error('Error al filtrar empresas por departamento:', error.message); // más claro
    throw new Error('Error al filtrar empresas por departamento');
  }
};





export default {
  insertarEmpresa,
  obtenerEmpresas,
  obtenerEmpresasConPropietarios,
  obtenerPremios,
  obtenerEmpresasPorPremio,
  obtenerRubros,
  obtenerEmpresasPorRubro,
  obtenerEmpresasMayoresA50,
  obtenerDepartamentos,
  obtenerEmpresasPorDepartamento,
};
