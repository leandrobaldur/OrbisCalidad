import {Router} from 'express';
import logsController from '../controllers/logsControllers.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Registro de transacciones del sistema
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Obtener todos los logs de transacciones
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del log
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario que realizó la operación
 *                   fecha_hora:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de la transacción (hora de La Paz)
 *                   tabla_afectada:
 *                     type: string
 *                     description: Nombre de la tabla afectada
 *                   operacion:
 *                     type: string
 *                     description: Tipo de operación realizada (INSERT, UPDATE, DELETE)
 *       500:
 *         description: Error al obtener los logs
 */

router.get('/', logsController.obtenerLogs);

export default router;
