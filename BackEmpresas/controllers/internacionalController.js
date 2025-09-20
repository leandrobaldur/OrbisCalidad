import internacionalModel from '../models/internacionalModel.js';
import logsModel from '../models/logsModel.js';

export default {
    // Crear nueva operación internacional
    async createOperacion(req, res) {
      try {
        const { pais, id_empresa, url, id_usuario } = req.body;
  
        // Validación de campos obligatorios
        if (!pais || !id_empresa || !id_usuario) {
          return res.status(400).json({ message: 'País, ID de empresa e ID de usuario son requeridos' });
        }
  
        // Crear la operación
        const nuevaOperacion = await internacionalModel.insertOperacion(pais, id_empresa, url);
  
        // Registrar log SOLO si la operación fue exitosa
        await logsModel.registrarLog({
          id_usuario,
          tabla: 'operaciones_internacionales',
          tipo_log: 'insert'
        });
  
        res.status(201).json(nuevaOperacion);
      } catch (error) {
        res.status(500).json({ message: 'Error al crear operación', error: error.message });
      }
    },

  // Obtener todas las operaciones
  async getOperaciones(req, res) {
    try {
      const { id_empresa } = req.query;
      const operaciones = await internacionalModel.getOperaciones(id_empresa);
      res.status(200).json(operaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener operaciones', error: error.message });
    }
  }
};