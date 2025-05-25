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
    // Buscar solo por el nombre de usuario (NO comparar la contraseña aquí)
    const usuarioEncontrado = await usuarioModel.buscarUsuario(usuario);

    if (!usuarioEncontrado) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
        encontrado: 0,
      });
    }

    // Comparar contraseñas con bcrypt
    const match = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

    if (!match) {
      return res.status(401).json({
        mensaje: 'Contraseña incorrecta',
        encontrado: 0,
      });
    }

    // Autenticación exitosa
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

    // Validar campos requeridos
    if (!usuario || !contrasenia || !id_usuario) {
      return res.status(400).json({ message: 'Usuario, contraseña e ID de usuario son requeridos' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await usuarioModel.buscarUsuario(usuario);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Crear nuevo colaborador (rol 2)
    const nuevoUsuario = await usuarioModel.insertUsuario(usuario, contrasenia);

    // Registrar en logs SOLO si el usuario fue creado exitosamente
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

export default {
  loginUsuario,
  createColaborador,
};
