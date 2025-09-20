import db from '../db.js'; 

// Insertar nueva familia y registrar log
async function agregarFamilia(id_empresa, fecha_inicio, fecha_fin, apellido_familia, id_usuario) {
    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const queryInsert = `
            INSERT INTO FAMILIA (id_empresa, fecha_inicio, fecha_fin, apellido_familia)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const valuesInsert = [id_empresa, fecha_inicio, fecha_fin || null, apellido_familia];
        const result = await client.query(queryInsert, valuesInsert);
        const nuevaFamilia = result.rows[0];

        const queryLog = `
            INSERT INTO log_transacciones (id_usuario, fecha_hora, tabla_afectada, operacion)
            VALUES ($1, NOW(), 'FAMILIA', 'INSERT');
        `;
        await client.query(queryLog, [id_usuario]);

        await client.query('COMMIT');
        return nuevaFamilia;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Obtener todas las familias
async function obtenerFamilias() {
    const result = await db.query('SELECT * FROM FAMILIA ORDER BY id_familia ASC;');
    return result.rows;
}

export const familiaModel = {
    agregarFamilia,
    obtenerFamilias
};
