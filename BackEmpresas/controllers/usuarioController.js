import logsModel from '../models/logsModel.js';
import usuarioModel from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

const loginUsuario = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({
      mensaje: 'Debe proporcionar usuario y contraseña',
      encontrado: 0,
    });
  }

  try {
    const usuarioEncontrado = await usuarioModel.buscarUsuario(usuario);

    if (!usuarioEncontrado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
        encontrado: 0,
      });
    }

    const match = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

    if (!match) {
      return res.status(401).json({
        mensaje: 'Contraseña incorrecta',
        encontrado: 0,
      });
    }

    return res.status(200).json({
      mensaje: 'Usuario autenticado',
      encontrado: 1,
      usuario: usuarioEncontrado,
    });

  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return res.status(500).json({
      mensaje: 'Usuario no encontrado',
      encontrado: 0,
    });
  }
};

const createColaborador = async (req, res) => {
  try {
    const { usuario, contrasenia, id_usuario } = req.body;

    if (!usuario || !contrasenia || !id_usuario) {
      return res.status(400).json({ message: 'Usuario, contraseña e ID de usuario son requeridos' });
    }

    const usuarioExistente = await usuarioModel.buscarUsuario(usuario);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const nuevoUsuario = await usuarioModel.insertUsuario(usuario, contrasenia);

    await logsModel.registrarLog({
      id_usuario,
      tabla: 'usuarios',
      tipo_log: 'insert',
    });

    res.status(201).json({
      message: 'Colaborador creado exitosamente',
      usuario: nuevoUsuario,
    });

  } catch (error) {
    console.error('Error en createColaborador:', error);
    res.status(500).json({
      message: error.message || 'Error al crear colaborador',
    });
  }
};

// ✅ NUEVA FUNCIÓN GET /usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.obtenerTodosLosUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      mensaje: 'Error interno al obtener usuarios',
    });
  }
};

export default {
  loginUsuario,
  createColaborador,
  getUsuarios, // <-- añadido aquí
};
