import pool from '../db.js';

class Familia {
  static async create(nombre_familia, client = pool) {
    if (!nombre_familia) throw new Error('Nombre de familia requerido');
    console.log('Creando familia con nombre:', nombre_familia);

    try {
      // Verificamos si ya existe la familia por nombre
      const { rows } = await client.query(
        'SELECT id_familia FROM familia WHERE nombre_familia = $1',
        [nombre_familia]
      );

      console.log('Resultado del SELECT familia:', rows);

      // Si ya existe la familia, retornamos el id_familia
      if (rows.length > 0) {
        return rows[0].id_familia;
      }

      // Si no existe, insertamos la nueva familia
      const insertRes = await client.query(
        'INSERT INTO familia (nombre_familia) VALUES ($1) RETURNING id_familia',
        [nombre_familia]
      );

      console.log('Resultado del INSERT familia:', insertRes.rows);

      // Retornamos el id_familia generado automáticamente
      return insertRes.rows[0].id_familia;
    } catch (error) {
      // Esto solo lanza el error, no intentes responder aquí porque no hay `res` en modelos
      throw new Error(`Error creando familia: ${error.message}`);
    }
  }
}

export default Familia;