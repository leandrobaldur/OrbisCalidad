import express from 'express';
import {
  createPropietario,
  getPropietariosByEmpresa,
  getAllPropietarios
} from '../controllers/propietarioController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Propietarios
 *   description: Endpoints para la gestión de propietarios
 */

/**
 * @swagger
 * /propietarios:
 *   post:
 *     summary: Crear un nuevo propietario
 *     tags: [Propietarios]
 *     description: Crea un propietario nuevo, incluyendo la creación de familia si no existe, y su historial de propiedad.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - familiaNombre
 *               - nombre
 *               - apellido_paterno
 *               - nacionalidad
 *               - id_empresa
 *               - fecha_inicio
 *               - es_familia
 *             properties:
 *               familiaNombre:
 *                 type: string
 *                 example: Familia Pérez
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido_paterno:
 *                 type: string
 *                 example: Pérez
 *               apellido_materno:
 *                 type: string
 *                 example: López
 *               nacionalidad:
 *                 type: string
 *                 example: Boliviana
 *               es_familia:
 *                 type: boolean
 *                 example: true
 *               id_empresa:
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
 *     responses:
 *       201:
 *         description: Propietario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createPropietario);

/**
 * @swagger
 * /propietarios/empresa/{empresaId}:
 *   get:
 *     summary: Obtener propietarios por empresa
 *     tags: [Propietarios]
 *     description: Devuelve los propietarios asociados a una empresa específica.
 *     parameters:
 *       - in: path
 *         name: empresaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Lista de propietarios por empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_propietario:
 *                     type: integer
 *                     example: 7
 *                   nombre:
 *                     type: string
 *                     example: María
 *                   apellido_paterno:
 *                     type: string
 *                     example: Gómez
 *                   apellido_materno:
 *                     type: string
 *                     example: Rojas
 *                   fecha_inicio:
 *                     type: string
 *                     format: date
 *                     example: 2023-01-01
 *                   fecha_fin:
 *                     type: string
 *                     format: date
 *                     example: 2023-12-31
 *       500:
 *         description: Error interno del servidor
 */
router.get('/empresa/:empresaId', getPropietariosByEmpresa);

/**
 * @swagger
 * /propietarios:
 *   get:
 *     summary: Obtener todos los propietarios
 *     tags: [Propietarios]
 *     description: Devuelve una lista de todos los propietarios registrados.
 *     responses:
 *       200:
 *         description: Lista de propietarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_propietario:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Carlos
 *                   apellido_paterno:
 *                     type: string
 *                     example: Fernández
 *                   apellido_materno:
 *                     type: string
 *                     example: Castro
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllPropietarios);

export default router;
