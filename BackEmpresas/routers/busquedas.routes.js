import { Router } from 'express';
import { busquedaController } from '../controllers/busquedas.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Búsquedas
 *   description: Endpoints para buscar empresas con diversos filtros
 */

/**
 * @swagger
 * /busquedas:
 *   get:
 *     summary: Buscar empresas con filtros avanzados
 *     tags: [Búsquedas]
 *     parameters:
 *       - in: query
 *         name: nombre_empresa
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre comercial de la empresa
 *         example: tech
 *       - in: query
 *         name: nombre_fundador
 *         schema:
 *           type: string
 *         description: Nombre del fundador (solo busca por nombre, sin apellidos)
 *         example: juan
 *       - in: query
 *         name: item
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre de un item asociado a la empresa
 *         example: software
 *       - in: query
 *         name: actividad
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre de una actividad de la empresa
 *         example: tecnologia
 *     responses:
 *       200:
 *         description: Lista de empresas que coinciden con los criterios de búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_empresa:
 *                     type: integer
 *                     example: 1
 *                   nombre_comercial:
 *                     type: string
 *                     example: "Tech Solutions"
 *                   fecha_fundacion:
 *                     type: string
 *                     format: date
 *                     example: "2010-05-15"
 *                   nit:
 *                     type: string
 *                     example: "123456789"
 *                   url:
 *                     type: string
 *                     example: "http://techsolutions.com"
 *                   propietarios:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Juan Pérez López", "María García Fernández"]
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Software empresarial", "Soporte técnico"]
 *       400:
 *         description: Error cuando no se proporciona ningún criterio de búsqueda
 *       404:
 *         description: No se encontraron empresas con los criterios proporcionados
 *       500:
 *         description: Error interno del servidor
 */
router.get('/busquedas', busquedaController.getEmpresasFiltradas);

export default router;