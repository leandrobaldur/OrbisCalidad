import axios from 'axios';

const BASE_URL = 'http://localhost:3000/usuarios';

export const registrarUsuario = async (usuario, contrasenia, id_usuario) => {
  return axios.post(`${BASE_URL}/registro`, {
    usuario,
    contrasenia,
    id_usuario,
  });
};
