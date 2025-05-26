import { busquedaModel } from '../models/busquedas.model.js';

const sanitizeSearchParam = (param) => {
    if (param === undefined || param === null) return null;
    const str = param.toString().trim();
    if (str.length > 100) {
        throw new Error('El parámetro de búsqueda excede la longitud máxima permitida');
    }
    const cleanStr = str.replace(/[;'"\\\-\-]/g, '');
    if (cleanStr.length === 0) return null;
    return cleanStr;
};

const validateSearchParams = (params) => {
    const hasValidParam = Object.values(params).some(
        param => param !== null && param !== undefined && param.toString().trim().length > 0
    );
    if (!hasValidParam) {
        throw new Error('Debe proporcionar al menos un criterio de búsqueda válido');
    }
};

const getEmpresasFiltradas = async (req, res) => {
    try {
        const searchParams = {
            nombre_empresa: sanitizeSearchParam(req.query.nombre_empresa),
            apellido_familia: sanitizeSearchParam(req.query.apellido_familia),
            item: sanitizeSearchParam(req.query.item),
            actividad: sanitizeSearchParam(req.query.actividad),
        };

        validateSearchParams(searchParams);

        const subqueries = [];
        const params = [];

        if (searchParams.nombre_empresa) {
            params.push(`%${searchParams.nombre_empresa}%`);
            subqueries.push(`
                SELECT id_empresa FROM EMPRESAS 
                WHERE nombre_comercial ILIKE $${params.length} 
                OR denominacion_social ILIKE $${params.length}
            `);
        }

        if (searchParams.apellido_familia) {
            params.push(`%${searchParams.apellido_familia}%`);
            subqueries.push(`
                SELECT id_empresa
                FROM FAMILIA
                WHERE apellido_familia ILIKE $${params.length}
            `);
        }

        if (searchParams.item) {
            params.push(`%${searchParams.item}%`);
            subqueries.push(`
                SELECT EI.id_empresa
                FROM EMPRESAS_ITEMS EI
                JOIN ITEMS I ON EI.id_item = I.id_item
                WHERE I.nombre_item ILIKE $${params.length}
            `);
        }

        if (searchParams.actividad) {
            params.push(`%${searchParams.actividad}%`);
            subqueries.push(`
                SELECT E.id_empresa
                FROM EMPRESAS E
                JOIN ACTIVIDADES A ON E.id_actividad = A.id_actividad
                WHERE A.nombre_actividad ILIKE $${params.length}
            `);
        }

        let query = `
            SELECT DISTINCT 
                E.id_empresa, 
                E.nombre_comercial, 
                E.denominacion_social,
                E.fecha_fundacion, 
                E.nit, 
                E.url,
                E.direccion_web,
                A.nombre_actividad,
                TE.nombre_tamanio,
                (
                    SELECT STRING_AGG(DISTINCT I.nombre_item, ', ')
                    FROM EMPRESAS_ITEMS EI
                    JOIN ITEMS I ON EI.id_item = I.id_item
                    WHERE EI.id_empresa = E.id_empresa
                    AND (EI.fecha_fin_c IS NULL OR EI.fecha_fin_c > CURRENT_DATE)
                ) AS items,
                (
                    SELECT STRING_AGG(DISTINCT CONCAT(M.nombre_municipio, ', ', C.nombre_ciudad, ', ', D.nombre_depto), '; ')
                    FROM SEDES S
                    JOIN MUNICIPIOS M ON S.id_municipio = M.id_municipio
                    JOIN CIUDADES C ON M.id_ciudad = C.id_ciudad
                    JOIN DEPARTAMENTOS D ON C.id_departamento = D.id_departamento
                    WHERE S.id_empresa = E.id_empresa
                ) AS ubicaciones
            FROM EMPRESAS E
            JOIN ACTIVIDADES A ON E.id_actividad = A.id_actividad
            JOIN TAMANIOS_EMPRESAS TE ON E.id_tamanio = TE.id_tamanio
        `;

        if (subqueries.length > 0) {
            query += `WHERE E.id_empresa IN (\n${subqueries.join('\nINTERSECT\n')}\n)`;
        }

        query += `\nORDER BY E.nombre_comercial ASC LIMIT 100`;

        const empresas = await busquedaModel.buscarEmpresas(query, params);
        
        if (empresas.length === 0) {
            return res.status(404).json({ 
                message: 'No se encontraron empresas con los criterios proporcionados',
                parametros_usados: searchParams,
                sugerencia: 'Intente con términos más generales o verifique los datos'
            });
        }

        const resultadosFormateados = empresas.map(empresa => ({
            id_empresa: empresa.id_empresa,
            nombre_comercial: empresa.nombre_comercial,
            denominacion_social: empresa.denominacion_social,
            fecha_fundacion: empresa.fecha_fundacion,
            nit: empresa.nit,
            url: empresa.url,
            direccion_web: empresa.direccion_web,
            actividad: empresa.nombre_actividad,
            tamanio: empresa.nombre_tamanio,
            items: empresa.items?.split(', ') ?? [],
            ubicaciones: empresa.ubicaciones?.split('; ').map(ubic => {
                const [municipio, ciudad, departamento] = ubic.split(', ');
                return { municipio, ciudad, departamento };
            }) ?? []
        }));

        res.json(resultadosFormateados);
    } catch (error) {
        console.error('Error en búsqueda:', error);
        
        if (error.message.includes('longitud máxima') || error.message.includes('criterio de búsqueda')) {
            return res.status(400).json({ 
                error: error.message,
                ejemplo_valido: '/busquedas?nombre_empresa=tech&actividad=software'
            });
        }
        
        res.status(500).json({ 
            error: 'Error en la búsqueda',
            detalle: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
        });
    }
};

export const busquedaController = {
    getEmpresasFiltradas
};
