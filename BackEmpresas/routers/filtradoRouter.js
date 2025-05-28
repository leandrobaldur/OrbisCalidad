import { Router } from 'express';
import { filtrarController} from '../controllers/filtrarController.js';   

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Filtros
 *   description: Endpoints para filtrar empresas
 */

/**
 * @swagger
 * /filtrado/anio_fundacion/{aniosCumplidos}:
 *   get:
 *     summary: Filtrar empresas por año de fundación
 *     tags: [Filtros]
 *     parameters:
 *       - in: path
 *         name: aniosCumplidos
 *         required: true
 *         schema:
 *           type: integer
 *         description: Años cumplidos desde la fundación
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas por año de fundación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: No se encontraron empresas con esos años de fundación
 *       500:
 *         description: Error del servidor
 */
// Rutas para el filtrado de empresas por Año de Fundacion
router.get('/anio_fundacion/:aniosCumplidos', filtrarController.filtrarAnioFundacion);

/**
 * @swagger
 * /filtrado/departamento/{nombre_depto}:
 *   get:
 *     summary: Filtrar empresas por departamento
 *     tags: [Filtros]
 *     parameters:
 *       - in: path
 *         name: nombre_depto
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del departamento
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas por departamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: No se encontraron empresas en ese departamento
 *       500:
 *         description: Error del servidor
 */
// Rutas para el filtrado de empresas por Departamento
router.get('/departamento/:nombre_depto', filtrarController.filtrarDepartamento);

/**
 * @swagger
 * /filtrado/rubro/{nombre_rubro}:
 *   get:
 *     summary: Filtrar empresas por rubro
 *     tags: [Filtros]
 *     parameters:
 *       - in: path
 *         name: nombre_rubro
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del rubro
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas por rubro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: No se encontraron empresas en ese rubro
 *       500:
 *         description: Error del servidor
 */
// Rutas para el filtrado de empresas por Rubro
router.get('/rubro/:nombre_rubro', filtrarController.filtrarRubro);

export default router;