import express from 'express';
import {obtenerEmpresaPorId,obtenerTodasEmpresasResumen,obtenerEmpresaFamiliar,obtenerOperacionesInternacionales,obtenerTamanioEmpresa} from '../controllers/empresaController.js';

const router = express.Router();

/**
 * @swagger
 * /empresas/resumen:
 *   get:
 *     summary: Obtener listado de empresas en formato resumido
 *     description: Devuelve una lista de todas las empresas con su denominación social, nombre comercial y tamaño empresarial.
 *     tags:
 *       - Empresas
 *     responses:
 *       200:
 *         description: Listado obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   denominacion_social:
 *                     type: string
 *                   nombre_comercial:
 *                     type: string
 *                   nombre_tamanio:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */

router.get('/empresas/resumen', obtenerTodasEmpresasResumen);
/**
/**
 * @swagger
 * /empresa/{id}:
 *   get:
 *     summary: Obtener información detallada de una empresa por su ID
 *     description: Retorna los datos generales de la empresa y todas sus relaciones (tipo societario, actividad, rubros, operaciones internacionales, familia, hitos, ítems, premios, tamaño, sedes y ubicación).
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_empresa:
 *                   type: integer
 *                 denominacion_social:
 *                   type: string
 *                 nombre_comercial:
 *                   type: string
 *                 fecha_fundacion:
 *                   type: string
 *                   format: date
 *                 nit:
 *                   type: integer
 *                 vision:
 *                   type: string
 *                 mision:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 url:
 *                   type: string
 *                 direccion_web:
 *                   type: string
 *                 nombre_tipsoc:
 *                   type: string
 *                 fecha_inicio_societario:
 *                   type: string
 *                   format: date
 *                 fecha_fin_societario:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *                 nombre_actividad:
 *                   type: string
 *                 descripcion_actividad:
 *                   type: string
 *                 nombre_tamanio:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_item:
 *                         type: string
 *                       descripcion_item:
 *                         type: string
 *                 rubros:
 *                   type: array
 *                   items:
 *                     type: string
 *                 operaciones_internacionales:
 *                   type: array
 *                   items:
 *                     type: string
 *                 familia:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fecha_inicio:
 *                         type: string
 *                         format: date
 *                       fecha_fin:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                       apellido_familia:
 *                         type: string
 *                 premios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entidad_otorgadora:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       anio:
 *                         type: integer
 *                       tipo:
 *                         type: string
 *                         enum: [Nacional, Internacional]
 *                 hitos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       descripcion:
 *                         type: string
 *                       fecha:
 *                         type: string
 *                         format: date
 *                 sedes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre_edificio:
 *                         type: string
 *                       ciudad:
 *                         type: string
 *                       municipio:
 *                         type: string
 *                       departamento:
 *                         type: string
 *       400:
 *         description: ID inválido (no numérico)
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */


router.get('/empresa/:id', obtenerEmpresaPorId);
/**
 * @swagger
 * /empresa/{id}/familia:
 *   get:
 *     summary: Obtener datos familiares de una empresa
 *     description: Devuelve la denominación social, nombre comercial y los registros de la tabla FAMILIA si la empresa es familiar. Si no lo es, devuelve un mensaje.
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Datos familiares de la empresa o mensaje si no es familiar
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id_empresa:
 *                       type: integer
 *                     denominacion_social:
 *                       type: string
 *                     nombre_comercial:
 *                       type: string
 *                     familia:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           fecha_inicio:
 *                             type: string
 *                             format: date
 *                           fecha_fin:
 *                             type: string
 *                             format: date
 *                             nullable: true
 *                           apellido_familia:
 *                             type: string
 *                 - type: object
 *                   properties:
 *                     mensaje:
 *                       type: string
 *                       example: La empresa no es familiar
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
 */


router.get('/empresa/:id/familia', obtenerEmpresaFamiliar);
/**
 * @swagger
 * /empresa/{id}/operaciones-internacionales:
 *   get:
 *     summary: Obtener operaciones internacionales de una empresa
 *     description: Devuelve los datos de la empresa junto con sus operaciones internacionales si existen. Si no tiene, responde un objeto vacío.
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Datos de la empresa con sus operaciones internacionales o un objeto vacío
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id_empresa:
 *                       type: integer
 *                     denominacion_social:
 *                       type: string
 *                     nombre_comercial:
 *                       type: string
 *                     operaciones_internacionales:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_operacion:
 *                             type: integer
 *                           pais:
 *                             type: string
 *                           url:
 *                             type: string
 *                 - type: object
 *                   description: Si no hay operaciones
 *                   example: {}
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Error del servidor
 */

router.get('/empresa/:id/operaciones-internacionales', obtenerOperacionesInternacionales);
/**
 * @swagger
 * /empresa/{id}/tamanio:
 *   get:
 *     summary: Obtener el tamaño de una empresa
 *     description: Devuelve el tamaño (nombre_tamanio) de la empresa si está registrado. Si no lo está, muestra un mensaje.
 *     tags:
 *       - Empresas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Tamaño encontrado o mensaje si no está registrado
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     id_empresa:
 *                       type: integer
 *                     denominacion_social:
 *                       type: string
 *                     nombre_comercial:
 *                       type: string
 *                     tamanio:
 *                       type: string
 *                 - type: object
 *                   properties:
 *                     mensaje:
 *                       type: string
 *                       example: La empresa no tiene tamaño registrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get('/empresa/:id/tamanio', obtenerTamanioEmpresa);
export default router;
