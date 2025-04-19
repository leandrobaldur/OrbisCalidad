import pool from '../db.js';

export default class HistorialPropiedad {
  static async create({ id_propietario, id_empresa, fecha_inicio, fecha_fin, familia_activo }) {
    const query = `
      INSERT INTO "historial_propiedad" 
      (id_propietario, id_empresa, fecha_inicio, fecha_fin, familia_activo)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [
      id_propietario,
      id_empresa,
      fecha_inicio,
      fecha_fin || null,
      familia_activo
    ]);
  }
}