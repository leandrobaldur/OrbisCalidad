import ingresarEmpresaModel from '../models/ingresarEmpresaModel.js';
import logsModel from '../models/logsModel.js';

const crearEmpresa = async (req, res) => {
  const requiredFields = [
    'denominacion_social',
    'nombre_comercial',
    'fecha_fundacion',
    'nit',
    'vision',
    'mision',
    'descripcion',
    'url',
    'direccion_web',
    'id_actividad',
    'id_tamanio'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      mensaje: `Faltan campos requeridos: ${missingFields.join(', ')}`
    });
  }

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
    res.status(500).json({ mensaje: 'Error del servidor al crear la empresa' });
  }
};

const actualizarEmpresa = async (req, res) => {
  const { id } = req.params;
  const {
    id_usuario,
    denominacion_social,
    nombre_comercial,
    fecha_fundacion,
    nit,
    vision,
    mision,
    descripcion,
    url,
    direccion_web,
    id_actividad,
    id_tamanio
  } = req.body;

  const requiredFields = [
    'id_usuario',
    'denominacion_social',
    'nombre_comercial',
    'fecha_fundacion',
    'nit',
    'vision',
    'mision',
    'descripcion',
    'url',
    'direccion_web',
    'id_actividad',
    'id_tamanio'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      mensaje: `Faltan campos requeridos: ${missingFields.join(', ')}`
    });
  }

 try {
    // Cambia empresaData por req.body, o arma un objeto con los campos necesarios:
    const empresaActualizada = await ingresarEmpresaModel.actualizarEmpresa(id, req.body);

    // Registro log, respuesta exitosa
    await logsModel.registrarLog({ id_usuario: req.body.id_usuario, tabla: 'empresas', tipo_log: 'update' });

    res.status(200).json({
      mensaje: 'Empresa actualizada exitosamente',
      empresa: empresaActualizada
    });
  } catch (error) {
    console.error('Error en actualizarEmpresa:', error.stack || error);
    res.status(500).json({ mensaje: 'Error al actualizar la empresa' });
  }
};

const buscarEmpresas = async (req, res) => {
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresasConPropietarios();
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error en buscarEmpresas:', error);
    res.status(500).json({ mensaje: 'Error al obtener empresas' });
  }
};

const obtenerPremios = async (req, res) => {
  try {
    const premios = await ingresarEmpresaModel.obtenerPremios();
    res.status(200).json(premios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener premios' });
  }
};

const filtrarEmpresasPorPremio = async (req, res) => {
  const { id_premio } = req.params;
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresasPorPremio(id_premio);
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error en filtrarEmpresasPorPremio:', error);
    res.status(500).json({ mensaje: 'Error al filtrar empresas por premio' });
  }
};

export default {
  crearEmpresa,
  buscarEmpresas,
  obtenerPremios,
  filtrarEmpresasPorPremio,
  actualizarEmpresa,   // <--- Agrega esta línea
};

