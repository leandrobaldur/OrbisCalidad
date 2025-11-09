import API from './api';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300.png?text=Sin+Imagen';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const isValidImage = (url = '') => {
  const lowerUrl = url.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lowerUrl.includes(ext));
};

const pickFirstImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return PLACEHOLDER_IMAGE;
  }

  const firstValid = images.find((image) => {
    const url = typeof image === 'string' ? image : image?.url;
    return url && isValidImage(url);
  });

  const candidate = firstValid || images[0];
  const url = typeof candidate === 'string' ? candidate : candidate?.url;
  const finalUrl = url && isValidImage(url) ? url : null;

  return finalUrl || PLACEHOLDER_IMAGE;
};

export const getEmpresasCards = async (params = {}, variant = 'public') => {
  const endpoint = variant === 'private'
    ? '/api/empresas/cards/private'
    : '/api/empresas/cards/public';

  const response = await API.get(endpoint, { params });
  const raw = response.data?.data ?? response.data?.empresas?.data ?? [];

  return raw.map((empresa) => ({
    id: empresa.id,
    nombre: empresa.nombreComercial || 'Nombre no disponible',
    imagen: pickFirstImage(empresa.imagenes),
  }));
};

export const getEmpresaPublicById = async (id) => {
  if (!id) {
    throw new Error('El identificador de la empresa es requerido');
  }

  const response = await API.get(`/api/empresas/public/${id}`);
  const empresa = response.data?.empresa;

  if (!empresa) {
    throw new Error('No se encontró información para la empresa solicitada');
  }

  const rubros = Array.isArray(empresa.rubrosEmpresa)
    ? empresa.rubrosEmpresa
        .map((item) => item?.rubro?.nombre)
        .filter(Boolean)
        .join(', ')
    : '';

  const detalleImagen = pickFirstImage(empresa.imagenes);

  const hitos = Array.isArray(empresa.hitos)
    ? empresa.hitos.map((hito) => ({
        id: hito.id,
        nombre: hito.nombre,
        fecha: hito.fecha,
      }))
    : [];

  const descripcion = empresa.mensaje || 'Descripción no disponible.';

  return {
    id: empresa.id,
    nombre: empresa.nombreComercial || 'Nombre no disponible',
    descripcion,
    slogan: empresa.vision || '',
    rubro: rubros || 'Rubro no especificado',
    departamento: empresa.departamento?.nombre || 'Departamento no especificado',
    imagen: detalleImagen,
    hitos,
  };
};

export { pickFirstImage };
