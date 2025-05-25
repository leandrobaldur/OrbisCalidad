import express from 'express';
import { rubroController } from '../controllers/rubroController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rubros
 *   description: Endpoints para gestión de rubros
 */

/**
 * @swagger
 * /rubros:
 *   post:
 *     summary: Crear un nuevo rubro
 *     tags: [Rubros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_rubro
 *               - url
 *               - id_usuario
 *             properties:
 *               nombre_rubro:
 *                 type: string
 *                 example: "Electrodomésticos"
 *               url:
 *                 type: string
 *                 example: "https://midominio.com/rubro/electrodomesticos"
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Rubro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 rubro:
 *                   type: object
 *                   properties:
 *                     id_rubro:
 *                       type: integer
 *                     nombre_rubro:
 *                       type: string
 *                     url:
 *                       type: string
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post('/rubros', rubroController.agregarRubroController);

/**
 * @swagger
 * /rubros:
 *   get:
 *     summary: Obtener todos los rubros
 *     tags: [Rubros]
 *     responses:
 *       200:
 *         description: Lista de rubros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 rubros:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_rubro:
 *                         type: integer
 *                       nombre_rubro:
 *                         type: string
 *                       url:
 *                         type: string
 */
router.get('/rubros', rubroController.obtenerRubrosController);

export default router;
