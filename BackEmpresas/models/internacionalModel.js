import pool from '../db.js';

export default {
  // Insertar nueva operación internacional
  async insertOperacion(pais, id_empresa, url = null) {
    try {
      const result = await pool.query(
        'INSERT INTO operaciones_internacionales (pais, id_empresa, url) VALUES ($1, $2, $3) RETURNING *',
        [pais, id_empresa, url]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Obtener operaciones
  async getOperaciones(id_empresa = null) {
    try {
      let query = 'SELECT * FROM operaciones_internacionales';
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