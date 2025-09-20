// ✅ MODELO - models/empresaModel.js 
import pool from '../db.js';

export async function getTodasEmpresasResumen() {
  const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      te.nombre_tamanio
    FROM EMPRESAS e
    JOIN TAMANIOS_EMPRESAS te ON te.id_tamanio = e.id_tamanio
    ORDER BY e.denominacion_social;
  `;
  const { rows } = await pool.query(query);
  return rows;
}export async function getEmpresaPorId(id) {
  const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      e.fecha_fundacion,
      e.nit,
      e.vision,
      e.mision,
      e.descripcion,
      e.url,
      e.direccion_web,
      ts.nombre_tipsoc,
      ets.fecha_inicio AS fecha_inicio_societario,
      ets.fecha_fin AS fecha_fin_societario,
      a.nombre_actividad,
      a.descripcion AS descripcion_actividad,
      te.nombre_tamanio,

      -- Ítems
      COALESCE((
        SELECT json_agg(DISTINCT jsonb_build_object(
          'nombre_item', i.nombre_item,
          'descripcion_item', i.descripcion
        ))
        FROM EMPRESAS_ITEMS ei
        JOIN ITEMS i ON i.id_item = ei.id_item
        WHERE ei.id_empresa = e.id_empresa
      ), '[]'::json) AS items,

      -- Rubros
      COALESCE((
        SELECT json_agg(DISTINCT r.nombre_rubro)
        FROM RUBROS_EMPRESAS re
        JOIN RUBROS r ON r.id_rubro = re.id_rubro
        WHERE re.id_empresa = e.id_empresa
      ), '[]'::json) AS rubros,

      -- Operaciones internacionales
      COALESCE((
        SELECT json_agg(DISTINCT oi.pais)
        FROM OPERACIONES_INTERNACIONALES oi
        WHERE oi.id_empresa = e.id_empresa
      ), '[]'::json) AS operaciones_internacionales,

      -- Familia
      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'fecha_inicio', f.fecha_inicio,
          'fecha_fin', f.fecha_fin,
          'apellido_familia', f.apellido_familia
        ))
        FROM FAMILIA f
        WHERE f.id_empresa = e.id_empresa
      ), '[]'::json) AS familia,

      -- Hitos
      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'descripcion', h.descripcion,
          'fecha', h.fecha_h
        ))
        FROM HITOS h
        WHERE h.id_empresa = e.id_empresa
      ), '[]'::json) AS hitos,

      -- Premios
      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'entidad_otorgadora', p.entidad_otorgadora,
          'descripcion', p.descripcion,
          'anio', pe.anio,
          'tipo', CASE WHEN p.tipo_premio THEN 'Internacional' ELSE 'Nacional' END
        ))
        FROM PREMIOS_EMPRESAS pe
        JOIN PREMIOS p ON p.id_premio = pe.id_premio
        WHERE pe.id_empresa = e.id_empresa
      ), '[]'::json) AS premios,

      -- Sedes
      COALESCE((
        SELECT json_agg(jsonb_build_object(
          'nombre_edificio', s.nombre_edificio,
          'ciudad', c.nombre_ciudad,
          'municipio', m.nombre_municipio,
          'departamento', d.nombre_depto
        ))
        FROM SEDES s
        JOIN MUNICIPIOS m ON m.id_municipio = s.id_municipio
        JOIN CIUDADES c ON c.id_ciudad = m.id_ciudad
        JOIN DEPARTAMENTOS d ON d.id_departamento = c.id_departamento
        WHERE s.id_empresa = e.id_empresa
      ), '[]'::json) AS sedes

    FROM EMPRESAS e
    LEFT JOIN (
      SELECT DISTINCT ON (id_empresa) *
      FROM EMPRESAS_TIPOS_SOCIETARIOS
      ORDER BY id_empresa, fecha_inicio DESC
    ) ets ON ets.id_empresa = e.id_empresa
    LEFT JOIN TIPOS_SOCIETARIOS ts ON ts.id_tipsoc = ets.id_tipsoc
    LEFT JOIN ACTIVIDADES a ON a.id_actividad = e.id_actividad
    LEFT JOIN TAMANIOS_EMPRESAS te ON te.id_tamanio = e.id_tamanio
    WHERE e.id_empresa = $1;
  `;

  console.log('📤 Ejecutando query para empresa con ID:', id);
  console.log('🧠 SQL:', query);

  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) {
    console.log('❌ No se encontró ninguna empresa con ese ID.');
  } else {
    console.log('✅ Empresa encontrada:', rows[0]);
  }

  return rows[0];
}


export async function getEmpresaYFamilia(id) {
  const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      f.fecha_inicio,
      f.fecha_fin,
      f.apellido_familia
    FROM EMPRESAS e
    LEFT JOIN FAMILIA f ON f.id_empresa = e.id_empresa
    WHERE e.id_empresa = $1;
  `;
  const { rows } = await pool.query(query, [id]);

  if (!rows.length) return null;

  const empresa = {
    id_empresa: rows[0].id_empresa,
    denominacion_social: rows[0].denominacion_social,
    nombre_comercial: rows[0].nombre_comercial,
    familia: rows
      .filter(r => r.fecha_inicio) // si no hay familia, todos son null
      .map(r => ({
        fecha_inicio: r.fecha_inicio,
        fecha_fin: r.fecha_fin,
        apellido_familia: r.apellido_familia
      }))
  };

  if (empresa.familia.length === 0) return null;

  return empresa;
}
export async function getEmpresaOperacionesInternacionales(id) {
  const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      oi.id_operacion,
      oi.pais,
      oi.url
    FROM EMPRESAS e
    JOIN OPERACIONES_INTERNACIONALES oi ON oi.id_empresa = e.id_empresa
    WHERE e.id_empresa = $1;
  `;
  const { rows } = await pool.query(query, [id]);

  if (!rows.length) return null;

  const empresa = {
    id_empresa: rows[0].id_empresa,
    denominacion_social: rows[0].denominacion_social,
    nombre_comercial: rows[0].nombre_comercial,
    operaciones_internacionales: rows.map(r => ({
      id_operacion: r.id_operacion,
      pais: r.pais,
      url: r.url
    }))
  };

  return empresa;
}
export async function getTamanioEmpresa(id) {
  const query = `
    SELECT 
      e.id_empresa,
      e.denominacion_social,
      e.nombre_comercial,
      te.nombre_tamanio
    FROM EMPRESAS e
    LEFT JOIN TAMANIOS_EMPRESAS te ON te.id_tamanio = e.id_tamanio
    WHERE e.id_empresa = $1;
  `;

  const { rows } = await pool.query(query, [id]);
  return rows[0] || null;
}

