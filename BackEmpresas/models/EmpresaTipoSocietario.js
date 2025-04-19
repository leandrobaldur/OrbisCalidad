import pool from '../db.js';

export default class EmpresaTipoSocietario {
  static async create({ id_empresa, id_tipsoc, fecha_inicio, fecha_fin }, client = pool) {
    const query = `
      INSERT INTO empresas_tipos_societarios 
      (id_empresa, id_tipsoc, fecha_inicio, fecha_fin)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await client.query(query, [id_empresa, id_tipsoc, fecha_inicio, fecha_fin]);
    return result.rows[0];
  }
}
