import tamaniosModel from '../models/tamanioModel.js';

const obtenerTamanios = async (req, res) => {
  try {
    const tamanios = await tamaniosModel.obtenerTamanios();
    
    if (tamanios.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron tamaños',
        encontrado: 0
      });
    }
    
    res.status(200).json({
      mensaje: 'Tamaños encontrados',
      encontrado: 1,
      tamanios: tamanios
    });
  } catch (error) {
    console.error('Error en obtenerTamanios:', error);
    res.status(500).json({
      mensaje: 'Error del servidor',
      encontrado: 0
    });
  }
};

export default {
  obtenerTamanios,
};
