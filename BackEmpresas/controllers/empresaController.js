import {
  getEmpresaPorId,
  getTodasEmpresasResumen
} from '../models/empresaModel.js';

export async function obtenerTodasEmpresasResumen(req, res) {
  try {
    const empresas = await getTodasEmpresasResumen();
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener resumen de empresas:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
export async function obtenerEmpresaPorId(req, res) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido, debe ser numérico' });
  }

  try {
    const empresa = await getEmpresaPorId(Number(id));
    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    res.json(empresa);
  } catch (error) {
    console.error('❌ Error al obtener empresa:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
import { getEmpresaYFamilia } from '../models/empresaModel.js';

export async function obtenerEmpresaFamiliar(req, res) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido, debe ser numérico' });
  }

  try {
    const empresa = await getEmpresaYFamilia(Number(id));

    if (!empresa) {
      return res.json({ mensaje: 'La empresa no es familiar' });
    }

    res.json(empresa);
  } catch (error) {
    console.error('❌ Error al obtener empresa y familia:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
import { getEmpresaOperacionesInternacionales } from '../models/empresaModel.js';

export async function obtenerOperacionesInternacionales(req, res) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const empresa = await getEmpresaOperacionesInternacionales(Number(id));

    if (!empresa) {
      return res.json({
        mensaje: 'La empresa no tiene operaciones internacionales'
      });
    }

    res.json(empresa);
  } catch (error) {
    console.error('❌ Error al obtener operaciones internacionales:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
import { getTamanioEmpresa } from '../models/empresaModel.js';

export async function obtenerTamanioEmpresa(req, res) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const empresa = await getTamanioEmpresa(Number(id));

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    if (!empresa.nombre_tamanio) {
      return res.json({
        mensaje: 'La empresa no tiene tamaño registrado'
      });
    }

    res.json({
      id_empresa: empresa.id_empresa,
      denominacion_social: empresa.denominacion_social,
      nombre_comercial: empresa.nombre_comercial,
      tamanio: empresa.nombre_tamanio
    });

  } catch (error) {
    console.error('❌ Error al obtener tamaño:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
}

