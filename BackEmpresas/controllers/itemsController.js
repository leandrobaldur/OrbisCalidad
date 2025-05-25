import itemsModel from '../models/itemsModel.js';
import logsModel from '../models/logsModel.js';

const obtenerItems = async (req, res) => {
    try {
      const { id } = req.params;
      const items = await itemsModel.obtenerTodosItemsDisponibles(id);
      
      if (!items) {
        return res.status(404).json({ mensaje: 'Items no encontradas' });
      }
    
        res.json(items);
      } catch (error) {
        console.error('Error al obtener los items de la empresa:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
  };

const obtenerItemsById = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await itemsModel.obtenerTodosItemsById(id);
    
    if (!items) {
      return res.status(404).json({ mensaje: 'Items no encontradas' });
    }
  
      res.json(items);
    } catch (error) {
      console.error('Error al obtener los items de la empresa:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const insertarItem = async(req, res) => {
    const { id_empresa, id_item, fecha_inicio, fecha_fin, id_usuario } = req.body;

    if ( !id_empresa || !id_item || !fecha_inicio || !id_usuario ) {
        return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const row_exists = await itemsModel.verifyItem(id_empresa, id_item);
    if(row_exists === true){
      return res.status(400).json({ mensaje: 'El ítem ya ha sido registrado en esta empresa.' });
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha_inicio) || isNaN(new Date(fecha_inicio).getTime())) {
      return res.status(400).json({
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
      });
    }

    if(fecha_fin) {
      if (!fechaRegex.test(fecha_fin) || isNaN(new Date(fecha_fin).getTime())) {
        return res.status(400).json({
          mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
        });
      }
    }

    try {
        const msg = await itemsModel.insertarItem(id_empresa, id_item, fecha_inicio, fecha_fin);
        await logsModel.registrarLog({
          id_usuario,
          tabla: 'empresas_items',
          tipo_log: 'insert'
        });
        res.status(200).json({ mensaje: msg });
    } catch (error) {
        console.error('Error al insertar el item:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

export default {
  obtenerItemsById,
  obtenerItems,
  insertarItem
};
