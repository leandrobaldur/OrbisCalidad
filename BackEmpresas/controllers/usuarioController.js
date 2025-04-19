import usuarioModel from '../models/usuarioModel.js';

const loginUsuario = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).json({
      mensaje: 'Debe proporcionar usuario y contraseña',
      encontrado: 0,
    });
  }

  try {
    const usuarioEncontrado = await usuarioModel.buscarUsuario(usuario, contrasenia);
    
    if (usuarioEncontrado) {
      return res.status(200).json({
        mensaje: 'Usuario encontrado',
        encontrado: 1,
        usuario: usuarioEncontrado, 
      });
    } else {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado',
        encontrado: 0,
      });
    }
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return res.status(500).json({
      mensaje: 'Error del servidor',
      encontrado: 0,
    });
  }
};

export default {
  loginUsuario,
};
