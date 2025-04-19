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

const asignarTamanioEmpresa = async (req, res) => {
  const { id_empresa, id_tamanio, fecha_inicio_et, fecha_fin_et, num_empleados } = req.body;

  if (!id_empresa || !id_tamanio || !fecha_inicio_et || !num_empleados) {
    return res.status(400).json({
      mensaje: 'Faltan campos obligatorios',
      creado: 0
    });
  }

  

  // Validar formato de fecha si se envía fecha_cierre
  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha_inicio_et) || isNaN(new Date(fecha_inicio_et).getTime())) {
    return res.status(400).json({
      mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD',
      registrado: 0
    });
  }

  if(fecha_fin_et) {

    if (!fechaRegex.test(fecha_fin_et) || isNaN(new Date(fecha_fin_et).getTime())) {
      return res.status(400).json({
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD',
        registrado: 0
      });
    }
  }

  try {
    const registro = await tamaniosModel.asignarTamanioEmpresa({
      id_empresa,
      id_tamanio,
      fecha_inicio_et,
      fecha_fin_et,
      num_empleados
    });

    res.status(201).json({
      mensaje: 'Tamaño asignado correctamente a la empresa',
      asignacion: registro
    });
  } catch (error) {
    console.error('Error en asignarTamanioEmpresa:', error);
    res.status(500).json({
      mensaje: 'Error del servidor',
      creado: 0
    });
  }
};

export default {
  obtenerTamanios,
  asignarTamanioEmpresa,
};
