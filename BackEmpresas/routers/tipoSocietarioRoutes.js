import express from 'express';
import {
  getTiposSocietarios,
  createEmpresaTipoSocietario
} from '../controllers/tipoSocietarioController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipos Societarios
 *   description: Endpoints relacionados a tipos societarios
 */

/**
 * @swagger
 * /tipos-societarios:
 *   get:
 *     summary: Obtener todos los tipos societarios
 *     tags: [Tipos Societarios]
 *     description: Devuelve una lista de todos los tipos societarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tipos societarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tipo:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Sociedad Anónima
 *                   descripcion:
 *                     type: string
 *                     example: Empresa con capital dividido en acciones
 *       500:
 *         description: Error interno del servidor
 */
router.get('/tipos-societarios', getTiposSocietarios);

/**
 * @swagger
 * /empresa-tipo-societario:
 *   post:
 *     summary: Asignar tipo societario a una empresa
 *     tags: [Tipos Societarios]
 *     description: Asocia un tipo societario a una empresa en una fecha determinada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_empresa
 *               - id_tipo
 *               - fecha_inicio
 *             properties:
 *               id_empresa:
 *                 type: integer
 *                 example: 12
 *               id_tipo:
 *                 type: integer
 *                 example: 3
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: 2024-04-17
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: 2025-04-17
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tipo societario asignado correctamente a la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id_relacion:
 *                   type: integer
 *                   example: 25
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/empresa-tipo-societario', createEmpresaTipoSocietario);

export default router;
