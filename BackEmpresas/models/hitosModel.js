import pool from '../db.js';

export default {
  // Insertar nuevo hito
  async insertHito(id_empresa, descripcion, fecha_h = null, url = null) {
    try {
      const result = await pool.query(
        `INSERT INTO hitos 
        (id_empresa, descripcion, fecha_h, url) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [id_empresa, descripcion, fecha_h, url]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Obtener hitos
  async getHitos(id_empresa = null) {
    try {
      let query = 'SELECT * FROM hitos';
      const params = [];
      
      if (id_empresa) {
        query += ' WHERE id_empresa = $1';
        params.push(id_empresa);
      }
      
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};