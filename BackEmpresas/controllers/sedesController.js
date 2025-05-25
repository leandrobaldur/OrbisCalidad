import sedesModel from '../models/sedesModel.js';
import logsModel from '../models/logsModel.js';

const obtenerSedeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sedes = await sedesModel.obtenerSedeById(id);
    
    if (!sedes) {
      return res.status(404).json({ mensaje: 'Sedes no encontradas' });
    }
  
      res.json(sedes);
    } catch (error) {
      console.error('Error al obtener las sedes de la empresa:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const obtenerMunCiuDeptos = async (req, res) => {
  try {
    const sedes = await sedesModel.obtenerMunCiuDeptos();
    
    if (!sedes) {
      return res.status(404).json({ mensaje: 'Municipios, ciudades y departamentos no encontrados' });
    }
  
      res.json(sedes);
    } catch (error) {
      console.error('Error al obtener los municipios, ciudades y departamentos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const insertarSede = async (req, res) => {
  const { id_empresa, id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, id_usuario } = req.body;
  
  if ( !id_empresa || !id_municipio || !zona || !calle || !referencias || !nombre_edificio || !longitud || !latitud || !id_usuario ) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
  }

  const row_exists = await sedesModel.verifySede(id_empresa, id_municipio, zona, calle, referencias, nombre_edificio);
  if(row_exists === true){
    return res.status(400).json({ mensaje: 'La sede ya ha sido registrada.' });
  }

  try {
      const id_ubicacion = await sedesModel.newSede(id_municipio, zona, calle, referencias, nombre_edificio, longitud, latitud, id_empresa);
      await logsModel.registrarLog({
        id_usuario,
        tabla: 'sedes',
        tipo_log: 'insert'
      });
      return res.status(200).json({ mensaje: `ID de la sede nueva: ${id_ubicacion.id_ubicacion}` });
  } catch (error) {
      console.error('Error al obtener los items de la empresa:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

export default {
  obtenerSedeById,
  obtenerMunCiuDeptos,
  insertarSede
};
