import {rubroModel} from '../models/rubroModel.js';

// Validación auxiliar
function validarTexto(campo, nombreCampo, min = 1, max = 100) {
    if (!campo || typeof campo !== 'string') {
        return `${nombreCampo} es obligatorio y debe ser texto.`;
    }
    if (campo.trim().length < min) {
        return `${nombreCampo} no puede estar vacío.`;
    }
    if (campo.length > max) {
        return `${nombreCampo} no puede tener más de ${max} caracteres.`;
    }
    return null;
}

const agregarRubroController = async (req, res) => {
    try {
        const { nombre_rubro, url, id_usuario } = req.body;

        const errores = [];
        const errorNombre = validarTexto(nombre_rubro, 'Nombre del rubro');
        const errorUrl = validarTexto(url, 'URL del rubro', 1, 255);
        if (!id_usuario || isNaN(id_usuario)) {
            errores.push('ID de usuario inválido o no proporcionado.');
        }

        if (errorNombre) errores.push(errorNombre);
        if (errorUrl) errores.push(errorUrl);

        if (errores.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errores
            });
        }

        const rubro = await rubroModel.agregarRubro(nombre_rubro.trim(), url.trim(), id_usuario);

        res.status(201).json({
            success: true,
            message: 'Rubro agregado correctamente',
            rubro
        });

    } catch (error) {
        console.error('Error al agregar rubro:', error);
        res.status(500).json({ success: false, message: 'Error interno al agregar rubro' });
    }
};

const obtenerRubrosController = async (req, res) => {
    try {
        const rubros = await rubroModel.obtenerRubros();
        res.json({ success: true, rubros });
    } catch (error) {
        console.error('Error al obtener rubros:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener rubros' });
    }
};

export const rubroController = {
    agregarRubroController,
    obtenerRubrosController
};