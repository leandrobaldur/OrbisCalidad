import pool from '../db.js';

export default class TipoSocietario {
  static async getAll() {
    const query = `SELECT * FROM tipos_societarios ORDER BY id_tipsoc`;
    const result = await pool.query(query);
    return result.rows;
  }
}
