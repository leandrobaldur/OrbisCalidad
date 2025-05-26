import { filtradoModel } from '../models/filtradoModel.js';

const filtrarRubro = async (req, res) => {
    try {
        const { nombre_rubro } = req.params; // Properly destructure the param
        const rubros = await filtradoModel.obtenerRubros(nombre_rubro);
        
        if (!rubros || rubros.length === 0) {
            return res.status(404).json({ 
                ok: false,
                mensaje: 'No se encontraron rubros' 
            });
        }
        
        return res.status(200).json({ 
            ok: true,
            data: rubros 
        });
    } catch (error) {
        console.error('Error al obtener los rubros:', error);
        return res.status(500).json({ 
            ok: false,
            mensaje: 'Error interno del servidor' 
        });    
    }
};

const filtrarDepartamento = async (req, res) => {
    try {
        const { nombre_depto } = req.params; // Properly destructure the param
        const departamentos = await filtradoModel.obtenerDepartamentos(nombre_depto);
        
        if (!departamentos || departamentos.length === 0) {
            return res.status(404).json({ 
                ok: false,
                mensaje: 'No se encontraron departamentos' 
            });
        }
        
        return res.status(200).json({ 
            ok: true,
            data: departamentos 
        });
    } catch (error) {
        console.error('Error al obtener los departamentos:', error);
        return res.status(500).json({ 
            ok: false,
            mensaje: 'Error interno del servidor' 
        });    
    }
};

const filtrarAnioFundacion = async (req, res) => {
    try {
        const { aniosCumplidos } = req.params; // Properly destructure the param
        const anios = await filtradoModel.obtenerAnioFundacion(aniosCumplidos);
        
        if (!anios || anios.length === 0) {
            return res.status(404).json({ 
                ok: false,
                mensaje: 'No se encontraron empresas con esos años de fundación' 
            });
        }
        
        return res.status(200).json({ 
            ok: true,
            data: anios 
        });
    } catch (error) {
        console.error('Error al obtener los años de fundación:', error);
        return res.status(500).json({ 
            ok: false,
            mensaje: 'Error interno del servidor' 
        });    
    }
}

export const filtrarController = {
    filtrarAnioFundacion,
    filtrarDepartamento,
    filtrarRubro
}