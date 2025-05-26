import hitosModel from '../models/hitosModel.js';
import logsModel from '../models/logsModel.js';

export default {
    async createHito(req, res) {
        try {
            const { id_empresa, descripcion, fecha_h, url, id_usuario } = req.body;

            // Validaciones
            if (!id_empresa || !descripcion || !id_usuario) {
                return res.status(400).json({ message: 'ID empresa, descripción e ID usuario son requeridos' });
            }

            if (descripcion.length <= 10) {
                return res.status(400).json({ message: 'La descripción debe tener más de 10 caracteres' });
            }

            // Insertar el nuevo hito
            const nuevoHito = await hitosModel.insertHito(id_empresa, descripcion, fecha_h, url);

            // Registrar log si se insertó correctamente
            await logsModel.registrarLog({
                id_usuario,
                tabla: 'hitos',
                tipo_log: 'insert'
            });

            res.status(201).json(nuevoHito);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear hito', error: error.message });
        }
    },


    // Obtener todos los hitos
    async getHitos(req, res) {
        try {
            const { id_empresa } = req.query;
            const hitos = await hitosModel.getHitos(id_empresa);
            res.status(200).json(hitos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener hitos', error: error.message });
        }
    }
};