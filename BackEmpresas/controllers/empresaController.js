import {
  obtenerEmpresaPorId,
  obtenerTodasEmpresasResumen
} from '../models/empresaModel.js';

export const getTodasEmpresasResumen = async (req, res) => {
  try {
    const empresas = await obtenerTodasEmpresasResumen();
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getEmpresaDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await obtenerEmpresaPorId(id);

    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }

    res.json(empresa);
  } catch (error) {
    console.error('Error al obtener detalles de la empresa:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
