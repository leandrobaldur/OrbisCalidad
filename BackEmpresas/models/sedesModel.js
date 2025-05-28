import pool from '../db.js'; 

const obtenerSedeById = async (id_empresa) => {
  const query = `
    SELECT nombre_edificio, zona, calle, referencias, nombre_municipio, nombre_ciudad, nombre_depto
    FROM sedes s, municipios m, ciudades c, departamentos d
    WHERE s.id_empresa = $1 AND s.id_municipio = m.id_municipio AND m.id_ciudad = c.id_ciudad AND c.id_departamento = d.id_departamento
    ORDER BY s.id_ubicacion asc;
  `;

  const { rows } = await pool.query(query, [id_empresa]);
  return rows;
};

const obtenerMunCiuDeptos = async () => {
  const query = `
    SELECT m.id_municipio, nombre_municipio, nombre_ciudad, nombre_depto
    FROM municipios m, ciudades c, departamentos d
    WHERE m.id_ciudad = c.id_ciudad AND c.id_departamento = d.id_departamento;
  `;

  const { rows } = await pool.query(query);
  return rows;
};

const newSede = async (id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, id_empresa) => {
  const query = `
    INSERT INTO sedes(id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, id_empresa)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id_ubicacion;
  `;

  const values = [id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, id_empresa];
  const id_ubicacion = await pool.query(query, values);
  return id_ubicacion.rows[0];
};

const verifySede = async (id_empresa, id_municipio, zona, calle, referencias, nombre_edificio) => {
  const query = `
  SELECT EXISTS(
    SELECT 1 FROM sedes s 
    WHERE s.id_empresa = $1 
    AND id_municipio = $2 AND zona = $3 AND calle = $4 AND referencias = $5 AND nombre_edificio = $6
  ) AS row_exists;
`;

  const values = [id_empresa, id_municipio, zona, calle, referencias, nombre_edificio];
  const row_exists = await pool.query(query, values);
  return row_exists.rows[0].row_exists;
};

export default {
  obtenerSedeById,
  obtenerMunCiuDeptos,
  newSede,
  verifySede
};