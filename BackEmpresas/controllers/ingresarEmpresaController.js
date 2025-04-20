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

const listarEmpresas = async (req, res) => {
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresas();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener empresas' });
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

const obtenerRubros = async (req, res) => {
  try {
    const rubros = await ingresarEmpresaModel.obtenerRubros();
    res.status(200).json(rubros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener rubros' });
  }
};

const filtrarEmpresasPorRubro = async (req, res) => {
  const { id_rubro } = req.params;
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresasPorRubro(id_rubro);
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error en filtrarEmpresasPorRubro:', error);
    res.status(500).json({ mensaje: 'Error al filtrar empresas por rubro' });
  }
};

const obtenerEmpresasMayoresA50 = async (req, res) => {
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresasMayoresA50();
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error en obtenerEmpresasMayoresA50:', error);
    res.status(500).json({ mensaje: 'Error al obtener empresas mayores a 50 años' });
  }
};


const obtenerDepartamentos = async (req, res) => {
  try {
    const departamentos = await ingresarEmpresaModel.obtenerDepartamentos();
    res.status(200).json(departamentos);
  } catch (error) {
    console.error('Error en obtenerDepartamentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener departamentos' });
  }
};

const filtrarEmpresasPorDepartamento = async (req, res) => {
  const { id_departamento } = req.params;
  try {
    const empresas = await ingresarEmpresaModel.obtenerEmpresasPorDepartamento(id_departamento);
    res.status(200).json(empresas);
  } catch (error) {
    console.error('Error en filtrarEmpresasPorDepartamento:', error);
    res.status(500).json({ mensaje: 'Error al filtrar empresas por departamento' });
  }
};


export default {
  crearEmpresa,
  listarEmpresas,
  buscarEmpresas,
  obtenerPremios,
  filtrarEmpresasPorPremio,
  obtenerRubros,
  filtrarEmpresasPorRubro,
  obtenerEmpresasMayoresA50,
  obtenerDepartamentos,
  filtrarEmpresasPorDepartamento,
};
