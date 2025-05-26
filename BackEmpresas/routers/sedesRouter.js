import express from 'express';
import sedesController from '../controllers/sedesController.js';

const router = express.Router();

/**
 * @swagger
 * /sedes/empresa/{id}:
 *   get:
 *     summary: Obtener la sede de una empresa
 *     tags:
 *       - Sedes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalle de la sede de la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_edificio:
 *                   type: string
 *                 zona:
 *                   type: string
 *                 calle:
 *                   type: string
 *                 referencias:
 *                   type: string
 *                 nombre_municipio:
 *                   type: string
 *                 nombre_ciudad:
 *                   type: string
 *                 nombre_depto:
 *                   type: string
 *       404:
 *         description: Sede no encontradas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id', sedesController.obtenerSedeById);

/**
 * @swagger
 * /sedes/munciudeptos:
 *   get:
 *     summary: Obtener los municipios, ciudades y departamentos de las sedes de las empresas
 *     tags:
 *       - Sedes
 *     responses:
 *       200:
 *         description: Municipios, ciudades y departamentos de las sedes de las empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_municipio:
 *                   type: number
 *                 nombre_municipio:
 *                   type: string
 *                 nombre_ciudad:
 *                   type: string
 *                 nombre_departo:
 *                   type: string
 *       404:
 *         description: unicipios, ciudades y departamentos no encontrados
 *       500:
 *         description: Error interno del servidor
 */

router.get('/munciudeptos', sedesController.obtenerMunCiuDeptos);

/**
 * @swagger
 * components:
 *   definitions:
 *     newSede:
 *       type: object
 *       properties:
 *         id_empresa:
 *           type: integer
 *         id_municipio:
 *           type: integer
 *         zona:
 *           type: string
 *         calle:
 *           type: string
 *         referencias:
 *           type: string
 *         nombre_edificio:
 *           type: string
 *         longitud:
 *           type: number
 *           format: double
 *         latitud:
 *           type: number
 *           format: double
 *         id_usuario:
 *           type: integer
 * 
 * tags:
 *   - name: Sedes
 *     description:
 * 
 * /sedes:
 *   post:
 *     tags: 
 *       - Sedes
 *     summary: Registra una sede en una empresa.
 *     description: |
 *       Verifica que los campos no estén vacíos.
 *       Verifica que la sede no haya sido registrada previamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/definitions/newSede'
 *     responses:
 *       200:
 *         description: Sede registrada exitosamente.
 *       400:
 *         description: Datos incompletos o la sede ya ha sido registrada.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/', sedesController.insertarSede);

export default router;
