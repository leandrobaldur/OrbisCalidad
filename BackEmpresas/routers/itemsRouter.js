import express from 'express';
import itemsController from '../controllers/itemsController.js';

const router = express.Router();

/**
 * @swagger
 * /items/empresa/{id}:
 *   get:
 *     summary: Obtener los ítems de una empresa
 *     tags:
 *       - Ítems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalle de los ítems de la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre_item:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 tipo_item:
 *                   type: boolean
 *                 producto_servicio:
 *                   type: boolean
 *                 url:
 *                   type: string
 *                 fecha_inicio:
 *                   type: string
 *                   format: date
 *                 fecha_fin:
 *                   type: string
 *                   format: date
 *                   nullable: yes
 *       404:
 *         description: Ítems no encontradas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id', itemsController.obtenerItemsById);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Obtener todos los ítems que no hayan sido registrados en la empresa
 *     tags:
 *       - Ítems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalle de todos los ítems que no hayan sido registrados en la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_item:
 *                   type: integer
 *                 nombre_item:
 *                   type: string
 *       404:
 *         description: Ítems no encontradas
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', itemsController.obtenerItems);

/**
 * @swagger
 * components:
 *   definitions:
 *     newItem:
 *       type: object
 *       properties:
 *         id_empresa:
 *           type: integer
 *         id_item:
 *           type: integer
 *         fecha_inicio:
 *           type: string
 *           format: date
 *         fecha_fin:
 *           type: string
 *           format: date
 *         id_usuario:
 *           type: integer
 * 
 * tags:
 *   - name: Ítems
 *     description:
 * 
 * /items:
 *   post:
 *     tags: 
 *       - Ítems
 *     summary: Registra un ítem ya registrado en una empresa.
 *     description: |
 *       Verifica que los campos no estén vacíos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/definitions/newItem'
 *     responses:
 *       200:
 *         description: Ítem registrado exitosamente.
 *       400:
 *         description: Datos incompletos o formato de fecha inválido.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/', itemsController.insertarItem);

export default router;
