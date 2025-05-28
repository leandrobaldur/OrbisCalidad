import { busquedaModel } from '../models/busquedas.model.js';

const getEmpresasFiltradas = async (req, res) => {
    try {
        // Limpieza de parámetros
        const cleanParam = (param) => param ? param.toString().trim() : null;
        
        const nombre_empresa = cleanParam(req.query.nombre_empresa);
        const nombre_fundador = cleanParam(req.query.nombre_fundador);
        const item = cleanParam(req.query.item);
        const actividad = cleanParam(req.query.actividad);

        // Validación
        if (!nombre_empresa && !nombre_fundador && !item && !actividad) {
            return res.status(400).json({ 
                error: 'Debe proporcionar al menos un criterio de búsqueda',
                ejemplo_valido: '/busquedas?nombre_empresa=tech'
            });
        }

        // Array para almacenar las subconsultas
        const subqueries = [];
        const params = [];
        
        // 1. Subconsulta para nombre de empresa
        if (nombre_empresa) {
            params.push(`%${nombre_empresa}%`);
            subqueries.push(`
                SELECT id_empresa FROM empresas 
                WHERE nombre_comercial ILIKE $${params.length}
            `);
        }

        // 2. Subconsulta para fundador (MODIFICADO: ahora solo busca por nombre)
        if (nombre_fundador) {
            params.push(`%${nombre_fundador}%`);
            subqueries.push(`
                SELECT hp.id_empresa 
                FROM historial_propiedad hp
                JOIN propietarios p ON hp.id_propietario = p.id_propietario
                WHERE p.nombre ILIKE $${params.length}  -- Solo busca por nombre, sin apellidos
            `);
        }

        // 3. Subconsulta para item
        if (item) {
            params.push(`%${item}%`);
            subqueries.push(`
                SELECT ei.id_empresa
                FROM empresas_items ei
                JOIN items i ON ei.id_item = i.id_item
                WHERE i.nombre_item ILIKE $${params.length}
            `);
        }

        // 4. Subconsulta para actividad
        if (actividad) {
            params.push(`%${actividad}%`);
            subqueries.push(`
                SELECT ea.id_empresa
                FROM empresa_actividad ea
                JOIN actividades a ON ea.id_actividad = a.id_actividad
                WHERE a.nombre_actividad ILIKE $${params.length}
            `);
        }

        // Construcción de la consulta final
        let query = `
            SELECT DISTINCT 
                e.id_empresa, 
                e.nombre_comercial, 
                e.fecha_fundacion, 
                e.nit, 
                e.url,
                (
                    SELECT STRING_AGG(
                        CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', COALESCE(p.apellido_materno, '')), 
                        ', '
                    )
                    FROM historial_propiedad hp
                    JOIN propietarios p ON hp.id_propietario = p.id_propietario
                    WHERE hp.id_empresa = e.id_empresa
                ) AS propietarios,
                (
                    SELECT STRING_AGG(i.nombre_item, ', ')
                    FROM empresas_items ei
                    JOIN items i ON ei.id_item = i.id_item
                    WHERE ei.id_empresa = e.id_empresa
                ) AS items
            FROM empresas e
        `;

        // Solo agregar WHERE si hay subconsultas
        if (subqueries.length > 0) {
            query += `WHERE e.id_empresa IN (\n`;
            
            // Si hay múltiples filtros, usamos INTERSECT para que cumplan todos
            if (subqueries.length > 1) {
                query += subqueries.join('\nINTERSECT\n');
            } else {
                query += subqueries[0];
            }
            
            query += `\n)`;
        }

        // Ordenamiento y límite para resultados
        query += `\nORDER BY e.nombre_comercial ASC LIMIT 100`;

        console.log('Consulta generada:', query);
        console.log('Parámetros:', params);

        const empresas = await busquedaModel.buscarEmpresas(query, params);
        
        if (empresas.length === 0) {
            return res.status(404).json({ 
                message: 'No se encontraron empresas con los criterios proporcionados',
                parametros_usados: {
                    nombre_empresa,
                    nombre_fundador,
                    item,
                    actividad
                },
                consulta_generada: query,
                sugerencia: 'Intente con términos más generales o verifique los datos'
            });
        }

        // Formatear los resultados para mejor presentación
        const resultadosFormateados = empresas.map(empresa => ({
            id_empresa: empresa.id_empresa,
            nombre_comercial: empresa.nombre_comercial,
            fecha_fundacion: empresa.fecha_fundacion,
            nit: empresa.nit,
            url: empresa.url,
            propietarios: empresa.propietarios ? empresa.propietarios.split(', ') : [],
            items: empresa.items ? empresa.items.split(', ') : []
        }));

        res.json(resultadosFormateados);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ 
            error: 'Error en la búsqueda',
            detalle: process.env.NODE_ENV === 'development' ? error.message : 'Contacte al administrador'
        });
    }
};

export const busquedaController = {
    getEmpresasFiltradas
};