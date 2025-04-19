import express from 'express';
import empresaController from '../controllers/ingresarEmpresaController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   definitions:
 *     NuevaEmpresa:
 *       type: object
 *       required:
 *         - denominacion_social
 *         - nombre_comercial
 *         - fecha_fundacion
 *         - nit
 *         - eslogan
 *         - descripcion
 *         - url
 *       properties:
 *         denominacion_social:
 *           type: string
 *           example: "Empresa S.A."
 *         nombre_comercial:
 *           type: string
 *           example: "La mejor empresa"
 *         fecha_fundacion:
 *           type: string
 *           format: date
 *           example: "2020-01-01"
 *         fecha_cierre:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: "2020-01-01 (mandar cadena vacia en caso de que sea null)"
 *         nit:
 *           type: integer
 *           example: 123456789
 *         eslogan:
 *           type: string
 *           example: "Haciendo lo imposible"
 *         descripcion:
 *           type: string
 *           example: "Descripción detallada de la empresa"
 *         url:
 *           type: string
 *           example: "https://empresa.com"
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
 *     description: Registra una nueva empresa en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/definitions/NuevaEmpresa'
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

export default router;