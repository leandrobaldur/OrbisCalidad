import express from 'express';
import tamaniosController from '../controllers/tamanioController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   definitions:
 *     Tamanio:
 *       type: object
 *       properties:
 *         id_tamanio:
 *           type: integer
 *         nombre_tamanio:
 *           type: string
 * 
 * tags:
 *   - name: Tamaños
 *     description: Operaciones con tamaños de empresas
 * 
 * /tamanios:
 *   get:
 *     tags:
 *       - Tamaños
 *     summary: Obtiene todos los tamaños de empresas
 *     description: Retorna la lista completa de tamaños empresariales disponibles
 *     responses:
 *       200:
 *         description: Lista de tamaños
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 encontrado:
 *                   type: integer
 *                 tamanios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/definitions/Tamanio'
 *       404:
 *         description: No se encontraron tamaños
 *       500:
 *         description: Error interno del servidor
 */

router.get('/tamanios', tamaniosController.obtenerTamanios);

export default router;