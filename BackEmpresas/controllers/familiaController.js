import {familiaModel} from '../models/familiaModel.js';

// Validaciones básicas
function validarTexto(campo, nombreCampo, min = 1, max = 200) {
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

const agregarFamiliaController = async (req, res) => {
    try {
        const { id_empresa, fecha_inicio, fecha_fin, apellido_familia, id_usuario } = req.body;

        const errores = [];

        if (!id_empresa || isNaN(id_empresa)) {
            errores.push('ID de empresa es inválido o no proporcionado.');
        }

        if (!fecha_inicio || isNaN(Date.parse(fecha_inicio))) {
            errores.push('Fecha de inicio inválida o no proporcionada.');
        }

        if (fecha_fin && isNaN(Date.parse(fecha_fin))) {
            errores.push('Fecha de fin inválida.');
        }

        if (!id_usuario || isNaN(id_usuario)) {
            errores.push('ID de usuario inválido o no proporcionado.');
        }

        const errorApellido = validarTexto(apellido_familia, 'Apellido de la familia', 1, 200);
        if (errorApellido) errores.push(errorApellido);

        if (errores.length > 0) {
            return res.status(400).json({ success: false, message: 'Errores de validación', errores });
        }

        const familia = await familiaModel.agregarFamilia(
            parseInt(id_empresa),
            fecha_inicio,
            fecha_fin,
            apellido_familia.trim(),
            parseInt(id_usuario)
        );

        res.status(201).json({ success: true, message: 'Familia agregada correctamente', familia });

    } catch (error) {
        console.error('Error al agregar familia:', error);
        res.status(500).json({ success: false, message: 'Error interno al agregar familia' });
    }
};

const obtenerFamiliasController = async (req, res) => {
    try {
        const familias = await familiaModel.obtenerFamilias();
        res.json({ success: true, familias });
    } catch (error) {
        console.error('Error al obtener familias:', error);
        res.status(500).json({ success: false, message: 'Error interno al obtener familias' });
    }
};

export const familiaController = {
    agregarFamiliaController,
    obtenerFamiliasController
};
