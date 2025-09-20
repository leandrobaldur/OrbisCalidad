import TipoSocietario from '../models/TipoSocietario.js';
import EmpresaTipoSocietario from '../models/EmpresaTipoSocietario.js';
import pool from '../db.js';
import logsModel from '../models/logsModel.js';

export const getTiposSocietarios = async (req, res) => {
  try {
    const tipos = await TipoSocietario.getAll();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos societarios:', error);
    res.status(500).json({ error: 'Error al obtener tipos societarios' });
  }
};

export const createEmpresaTipoSocietario = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id_empresa, id_tipsoc, fecha_inicio, fecha_fin, id_usuario } = req.body;
    await client.query('BEGIN');

    const nuevaRelacion = await EmpresaTipoSocietario.create(
      { id_empresa, id_tipsoc, fecha_inicio, fecha_fin },
      client
    );

    await logsModel.registrarLog({
      id_usuario,
      tabla: 'empresas_tipos_societarios',
      tipo_log: 'insert',
    });

    await client.query('COMMIT');
    res.status(201).json(nuevaRelacion);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear empresa tipo societario:', error);
    res.status(500).json({ error: 'Error al crear empresa tipo societario' });
  } finally {
    client.release();
  }
};

export default {
  getTiposSocietarios,
  createEmpresaTipoSocietario
};
