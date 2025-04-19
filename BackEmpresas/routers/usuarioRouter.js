import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   definitions:
 *     buscarUsuario:
 *       type: object
 *       properties:
 *         usuario:
 *           type: string
 *         contrasenia:
 *           type: string
 * 
 * tags:
 *   - name: Login
 *     description: Operaciones de autenticación
 * 
 * /usuarios/login:
 *   post:
 *     tags:  # <--- Agrega esta línea
 *       - Login
 *     summary: Inicia sesión con usuario y contraseña.
 *     description: |
 *       Verifica las credenciales del usuario y devuelve la información correspondiente. 
 *       El usuario y la contraseña deben ser válidos para un inicio de sesión exitoso.
 *       Ejemplo de credenciales válidas:
 *         - Usuario: admin1
 *         - Contraseña: admin123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/definitions/buscarUsuario'
 *     responses:
 *       200:
 *         description: Usuario encontrado y login exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 encontrado:
 *                   type: integer
 *                 usuario:
 *                   type: object
 *       400:
 *         description: Se requiere el nombre de usuario y la contraseña.
 *       404:
 *         description: El usuario no fue encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


router.post('/login', usuarioController.loginUsuario);

export default router;
