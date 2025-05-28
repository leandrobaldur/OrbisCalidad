import express from 'express';
import empresaController from '../controllers/ingresarEmpresaController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NuevaEmpresa:
 *       type: object
 *       required:
 *         - id_usuario
 *         - denominacion_social
 *         - nombre_comercial
 *         - fecha_fundacion
 *         - nit
 *         - vision
 *         - mision
 *         - descripcion
 *         - url
 *         - direccion_web
 *         - id_actividad
 *         - id_tamanio
 *       properties:
 *         id_usuario:
 *           type: integer
 *         denominacion_social:
 *           type: string
 *         nombre_comercial:
 *           type: string
 *         fecha_fundacion:
 *           type: string
 *           format: date
 *         nit:
 *           type: integer
 *         vision:
 *           type: string
 *         mision:
 *           type: string
 *         descripcion:
 *           type: string
 *         url:
 *           type: string
 *         direccion_web:
 *           type: string
 *         id_actividad:
 *           type: integer
 *         id_tamanio:
 *           type: integer
 *
 * tags:
 *   - name: Empresas
 *     description: Operaciones con empresas
 *
 * /ingresarEmpresa:
 *   post:
 *     tags:
 *       - Empresas
 *     summary: Crea una nueva empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevaEmpresa'
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 id_empresa:
 *                   type: integer
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */

router.post('/ingresarEmpresa', empresaController.crearEmpresa);

/**
 * @swagger
 * /actualizarEmpresa/{id}:
 *   put:
 *     tags:
 *       - Empresas
 *     summary: Actualiza una empresa por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevaEmpresa'
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 empresa:
 *                   type: object
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
router.put('/actualizarEmpresa/:id', empresaController.actualizarEmpresa);


export default router;
