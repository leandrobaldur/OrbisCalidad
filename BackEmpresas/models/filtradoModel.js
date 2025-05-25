import db from '../db.js';  

const obtenerDepartamentos = async (nombre_depto) => {
    try {
        const query = {
            text: `SELECT empresas.id_empresa, nombre_depto, empresas.nombre_comercial, 
                    EXTRACT(YEAR FROM fecha_fundacion) || '-' || 
                    EXTRACT(MONTH FROM fecha_fundacion) || '-' || 
                    EXTRACT(DAY FROM fecha_fundacion) AS Fecha_Completa, empresas.nit,
                    empresas.url from empresas, empresas_sedes, sedes, municipios, ciudades, departamentos
                  WHERE empresas.id_empresa = empresas_sedes.id_empresa
                  and empresas_sedes.id_ubicacion = sedes.id_ubicacion
                  and sedes.id_municipio = municipios.id_municipio
                  and municipios.id_ciudad = ciudades.id_ciudad
                  and ciudades.id_departamento = departamentos.id_departamento 
                  and departamentos.nombre_depto ILIKE $1;`,
            values: [nombre_depto]
        };
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error en obtenerDepartamentos:', error);
        throw error;
    }
};
    
const obtenerAnioFundacion = async (anios) => {
    try {
        const query = {
            text: `SELECT empresas.id_empresa,
                  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM fecha_fundacion) AS existencia_años, 
                  EXTRACT(YEAR FROM fecha_fundacion) AS Años_Fundacion, empresas.nombre_comercial,EXTRACT(YEAR FROM fecha_fundacion) || '-' || 
                    EXTRACT(MONTH FROM fecha_fundacion) || '-' || 
                    EXTRACT(DAY FROM fecha_fundacion) AS Fecha_Completa, empresas.nit,
                  empresas.url
                  FROM empresas
                  WHERE DATE_PART('year', fecha_fundacion) = $1;`,
            values: [anios]
        };
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener el año de fundación:', error);
        throw error;
    }
};

const obtenerRubros = async (rubro) => {
    try {
        const query = {
            text: `SELECT empresas.id_empresa, nombre_rubro, empresas.nombre_comercial, 
                    EXTRACT(YEAR FROM fecha_fundacion) || '-' || 
                    EXTRACT(MONTH FROM fecha_fundacion) || '-' || 
                    EXTRACT(DAY FROM fecha_fundacion) AS Fecha_Completa, empresas.nit,
                    empresas.url FROM empresas, empresa_actividad, actividades, rubros_actividades, rubros
                  WHERE empresas.id_empresa = empresa_actividad.id_empresa
                  AND empresa_actividad.id_actividad = actividades.id_actividad
                  AND actividades.id_actividad = rubros_actividades.id_actividad
                  AND rubros_actividades.id_rublo = rubros.id_rublo
                  AND translate(lower(rubros.nombre_rubro), 'áéíóúüñ', 'aeiouun') = translate(lower($1), 'áéíóúüñ', 'aeiouun')`,
            values: [rubro]
        };
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        console.error('Error en obtenerRubros:', error);
        throw error;
    }
};

export const filtradoModel = {
    obtenerDepartamentos,
    obtenerAnioFundacion,
    obtenerRubros
};