import { Router } from 'express';
import hitosController from '../controllers/hitosController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Hitos
 *   description: Gestión de hitos importantes de las empresas
 */

/**
 * @swagger
 * /hitos:
 *   post:
 *     summary: Crear un nuevo hito
 *     tags: [Hitos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_empresa
 *               - descripcion
 *             properties:
 *               id_empresa:
 *                 type: integer
 *                 example: 1
 *               descripcion:
 *                 type: string
 *                 example: "Lanzamiento exitoso del producto XYZ"
 *               fecha_h:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               url:
 *                 type: string
 *                 example: "https://ejemplo.com/hito"
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Hito creado exitosamente
 *       400:
 *         description: Datos requeridos faltantes o descripción muy corta
 *       500:
 *         description: Error del servidor
 */
router.post('/', hitosController.createHito);

/**
 * @swagger
 * /hitos:
 *   get:
 *     summary: Obtener hitos registrados
 *     tags: [Hitos]
 *     parameters:
 *       - in: query
 *         name: id_empresa
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de empresa
 *     responses:
 *       200:
 *         description: Lista de hitos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_hito:
 *                     type: integer
 *                     description: ID único del hito
 *                   id_empresa:
 *                     type: integer
 *                     description: ID de la empresa relacionada
 *                   descripcion:
 *                     type: string
 *                     description: Descripción detallada del hito
 *                   fecha_h:
 *                     type: string
 *                     format: date
 *                     nullable: true
 *                     description: Fecha del hito (opcional)
 *                   url:
 *                     type: string
 *                     nullable: true
 *                     description: URL relacionada al hito
 *                   id_usuario:
 *                     type: integer
 *                     description: id del usario que creó el hito
 *       500:
 *         description: Error del servidor
 */
router.get('/', hitosController.getHitos);

export default router;