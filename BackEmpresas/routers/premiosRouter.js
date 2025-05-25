import express from 'express';
import premiosController from '../controllers/premiosController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   definitions:
 *     Premio:
 *       type: object
 *       properties:
 *         id_premio:
 *           type: integer
 *         entidad_otorgadora:
 *           type: string
 *         tipo_premio:
 *           type: boolean
 *         url:
 *           type: string
 *         descripcion:
 *           type: string
 * 
 * tags:
 *   - name: Premios
 *     description: Operaciones con premios otorgados a empresas
 * 
 * /premios:
 *   get:
 *     tags:
 *       - Premios
 *     summary: Obtiene todos los premios registrados
 *     description: Retorna la lista completa de premios
 *     responses:
 *       200:
 *         description: Lista de premios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 encontrado:
 *                   type: integer
 *                 premios:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/definitions/Premio'
 *       404:
 *         description: No se encontraron premios
 *       500:
 *         description: Error interno del servidor
 */

router.get('/premios', premiosController.obtenerPremios);


/**
 * @swagger
 * components:
 *   definitions:
 *     PremioEmpresaInput:
 *       type: object
 *       required:
 *         - id_premio
 *         - id_empresa
 *         - anio
 *         - id_usuario
 *       properties:
 *         id_premio:
 *           type: integer
 *         id_empresa:
 *           type: integer
 *         anio:
 *           type: integer
 *         id_usuario:
 *           type: integer
 * 
 * tags:
 *   - name: Premios-Empresas
 *     description: Asociación entre premios y empresas
 * 
 * /premios-empresas:
 *   post:
 *     tags:
 *       - Premios-Empresas
 *     summary: Asocia un premio a una empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/definitions/PremioEmpresaInput'
 *     responses:
 *       201:
 *         description: Asociación registrada exitosamente
 *       400:
 *         description: Datos inválidos o faltantes
 *       500:
 *         description: Error del servidor
 */

router.post('/premios-empresas', premiosController.registrarPremioEmpresa);

export default router;

