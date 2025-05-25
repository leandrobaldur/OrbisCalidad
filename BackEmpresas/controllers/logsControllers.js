import logsModel from '../models/logsModel.js';

const obtenerLogs = async (req, res) => {
    try {
        const logs = await logsModel.obtenerLogs();
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error al obtener los logs:', error);
        res.status(500).json({ error: 'Error al obtener los logs' });
    }
}

export default {
    obtenerLogs,
}