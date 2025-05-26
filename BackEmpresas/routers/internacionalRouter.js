import { Router } from 'express';
import internacionalController from '../controllers/internacionalController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Operaciones Internacionales
 *   description: Gestión de operaciones internacionales de empresas
 */

/**
 * @swagger
 * /internacional:
 *   post:
 *     summary: Crear una nueva operación internacional
 *     tags: [Operaciones Internacionales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pais
 *               - id_empresa
 *             properties:
 *               pais:
 *                 type: string
 *                 example: "Argentina"
 *               id_empresa:
 *                 type: integer
 *                 example: 1
 *               url:
 *                 type: string
 *                 example: "https://ejemplo.com/documento"
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Operación creada exitosamente
 *       400:
 *         description: Datos requeridos faltantes
 *       500:
 *         description: Error del servidor
 */
router.post('/', internacionalController.createOperacion);

/**
 * @swagger
 * /internacional:
 *   get:
 *     summary: Obtener operaciones internacionales
 *     tags: [Operaciones Internacionales]
 *     parameters:
 *       - in: query
 *         name: id_empresa
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de empresa
 *     responses:
 *       200:
 *         description: Lista de operaciones internacionales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id_operacion:
 *                     type: integer
 *                     description: ID único de la operación
 *                   Pais:
 *                     type: string
 *                     description: Nombre del país
 *                   id_empresa:
 *                     type: integer
 *                     description: ID de la empresa relacionada
 *                   url:
 *                     type: string
 *                     nullable: true
 *                     description: URL relacionada a la operación
 *       500:
 *         description: Error del servidor
 */
router.get('/', internacionalController.getOperaciones);

export default router;