import express from 'express';
import { familiaController } from '../controllers/familiaController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Familia
 *   description: Endpoints para gestión de familias
 */

/**
 * @swagger
 * /familia/agregar:
 *   post:
 *     summary: Agrega una nueva familia
 *     tags: [Familia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_empresa
 *               - fecha_inicio
 *               - apellido_familia
 *               - id_usuario
 *             properties:
 *               id_empresa:
 *                 type: integer
 *                 example: 1
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-24"
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *               apellido_familia:
 *                 type: string
 *                 example: "Gutiérrez"
 *               id_usuario:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       201:
 *         description: Familia agregada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post('/agregar', familiaController.agregarFamiliaController);

/**
 * @swagger
 * /familia/listar:
 *   get:
 *     summary: Obtener todas las familias
 *     tags: [Familia]
 *     responses:
 *       200:
 *         description: Lista de familias obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 familias:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor
 */
router.get('/listar', familiaController.obtenerFamiliasController);

export default router;
