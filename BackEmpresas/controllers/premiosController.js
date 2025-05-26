import premiosModel from '../models/premiosModel.js';

const obtenerPremios = async (req, res) => {
  try {
    const premios = await premiosModel.obtenerPremios();

    if (premios.length === 0) {
      return res.status(404).json({
        mensaje: 'No se encontraron premios',
        encontrado: 0
      });
    }

    res.status(200).json({
      mensaje: 'Premios encontrados',
      encontrado: 1,
      premios: premios
    });
  } catch (error) {
    console.error('Error en obtenerPremios:', error);
    res.status(500).json({
      mensaje: 'Error del servidor',
      encontrado: 0
    });
  }
};

const registrarPremioEmpresa = async (req, res) => {
  const { id_premio, id_empresa, anio } = req.body;

  if (!id_premio || !id_empresa || !anio) {
    return res.status(400).json({
      mensaje: 'Faltan datos requeridos',
      registrado: 0
    });
  }

  try {
    const nuevoRegistro = await premiosModel.registrarPremioEmpresa({
      id_premio,
      id_empresa,
      anio
    });

    res.status(201).json({
      mensaje: 'Premio registrado para la empresa exitosamente',
      registrado: 1,
      data: nuevoRegistro
    });
  } catch (error) {
    console.error('Error en registrarPremioEmpresa:', error);
    res.status(500).json({
      mensaje: 'Error del servidor al registrar el premio',
      registrado: 0
    });
  }
};



export default {
  obtenerPremios,
  registrarPremioEmpresa,
};
