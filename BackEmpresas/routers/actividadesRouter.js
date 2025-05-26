import { actividadesController } from "../controllers/actividadesControllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Actividades
 *     description: Operaciones relacionadas con las actividades económicas

 * /actividades:
 *   get:
 *     tags:
 *       - Actividades
 *     summary: Obtener todas las actividades
 *     description: Retorna una lista de todas las actividades económicas registradas en la base de datos
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_actividad:
 *                     type: integer
 *                     example: 1
 *                   nombre_actividad:
 *                     type: string
 *                     example: "Comercio al por menor"
 *                   descripcion:
 *                     type: string
 *                     example: "Actividades de venta al por menor de productos diversos"
 *       500:
 *         description: Error del servidor al obtener las actividades
 */

router.get("/", actividadesController.obtenerActividades);

export default router;
