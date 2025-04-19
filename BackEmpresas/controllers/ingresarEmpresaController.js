import ingresarEmpresaModel from '../models/ingresarEmpresaModel.js';

const crearEmpresa = async (req, res) => {
  const requiredFields = [
    'denominacion_social',
    'nombre_comercial',
    'fecha_fundacion',
    'nit',
    'eslogan',
    'descripcion',
    'url'
  ];

  // Verificar campos requeridos
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      mensaje: `Faltan campos requeridos: ${missingFields.join(', ')}`
    });
  }

  // Validar formato de fecha si se envía fecha_cierre
  if (req.body.fecha_cierre && req.body.fecha_cierre !== '') {
    if (isNaN(Date.parse(req.body.fecha_cierre))) {
      return res.status(400).json({
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
      });
    }
  }

  try {
    const idEmpresa = await ingresarEmpresaModel.insertarEmpresa(req.body);
    
    res.status(201).json({
      mensaje: 'Empresa creada exitosamente',
      id_empresa: idEmpresa
    });
  } catch (error) {
    console.error('Error en crearEmpresa:', error);
    res.status(500).json({
      mensaje: 'Error del servidor al crear la empresa'
    });
  }
};

export default {
  crearEmpresa,
};
