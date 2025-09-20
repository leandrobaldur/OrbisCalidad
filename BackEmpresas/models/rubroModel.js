import express from 'express';
import db from '../db.js'; 

// Crear rubro nuevo y registrar log
async function agregarRubro(nombre_rubro, url, id_usuario) {
    const client = await db.connect(); // Obtén el cliente del pool
    try {
        await client.query('BEGIN');

        const queryRubro = `
            INSERT INTO RUBROS (nombre_rubro, url)
            VALUES ($1, $2)
            RETURNING *;
        `;//se usa $1 y $2 para evitar inyecciones SQL
        const valuesRubro = [nombre_rubro, url];
        const resultRubro = await client.query(queryRubro, valuesRubro);
        const nuevoRubro = resultRubro.rows[0];

        const queryLog = `
            INSERT INTO log_transacciones (id_usuario, fecha_hora, tabla_afectada, operacion)
            VALUES ($1, NOW(), 'RUBROS', 'INSERT');
        `;//se usa $1 para evitar inyecciones SQL
        await client.query(queryLog, [id_usuario]);

        await client.query('COMMIT');
        return nuevoRubro;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release(); // Libera el cliente correctamente
    }
}

// Obtener todos los rubros
async function obtenerRubros() {
    const query = `SELECT * FROM RUBROS ORDER BY id_rubro ASC;`;
    const result = await db.query(query);
    return result.rows;
}

export const rubroModel = {
    agregarRubro,
    obtenerRubros
};
