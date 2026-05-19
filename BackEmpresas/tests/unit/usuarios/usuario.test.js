import { jest } from '@jest/globals';

// 1) Configuración de Mocks Modernos para ES Modules (Debe ir antes de importar los controladores)
jest.unstable_mockModule('../../../models/usuarioModel.js', () => ({
    default: {
        buscarUsuario: jest.fn(),
        insertUsuario: jest.fn(),
        obtenerTodosLosUsuarios: jest.fn(),
        eliminarUsuarioPorId: jest.fn()
    }
}));

jest.unstable_mockModule('../../../models/logsModel.js', () => ({
    default: {
        registrarLog: jest.fn()
    }
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        compare: jest.fn()
    }
}));

// 2) Importaciones dinámicas después de declarar los mocks
const request = (await import('supertest')).default;
const express = (await import('express')).default;
const usuarioRouter = (await import('../../../routers/usuarioRouter.js')).default;
const usuarioModel = (await import('../../../models/usuarioModel.js')).default;
const logsModel = (await import('../../../models/logsModel.js')).default;
const bcrypt = (await import('bcrypt')).default;

// Configuración de la App Express de pruebas
const app = express();
app.use(express.json());
app.use('/usuarios', usuarioRouter);

describe('Módulo de Gestión de Usuarios - Pruebas Unitarias Estructuradas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // PRUEBAS DE POST /usuarios/login (1 al 5)
    // ==========================================

    test('1. cuandoCredencialesCorrectasAutenticarUsuario', async () => {
        // 1) Preparación de la Pruebas
        const reqBody = { usuario: 'leandro', contrasenia: 'passwordUcb123' };
        const mockUserDb = { usuario: 'leandro', contrasenia: 'hashedPassword123', id_usuario: 1 };
        usuarioModel.buscarUsuario.mockResolvedValue(mockUserDb);
        bcrypt.compare.mockResolvedValue(true);
        console.log("Inicializando Prueba 1.... login exitoso");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/login').send(reqBody);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Usuario autenticado');
        expect(response.body.encontrado).toBe(1);
    });

    test('2. cuandoFaltanCamposLanzarErrorBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const reqBodyIncompleto = { usuario: '', contrasenia: 'soloContrasenia' };
        console.log("Inicializando Prueba 2.... validación de campos vacíos");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/login').send(reqBodyIncompleto);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('Debe proporcionar usuario y contraseña');
        expect(response.body.encontrado).toBe(0);
    });

    test('3. cuandoUsuarioNoExisteLanzarErrorNotFound', async () => {
        // 1) Preparación de la Pruebas
        const reqBody = { usuario: 'inexistente', contrasenia: 'clave123' };
        usuarioModel.buscarUsuario.mockResolvedValue(null);
        console.log("Inicializando Prueba 3.... buscando usuario inexistente");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/login').send(reqBody);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.mensaje).toBe('Usuario no encontrado');
        expect(response.body.encontrado).toBe(0);
    });

    test('4. cuandoContraseniaIncorrectaLanzarErrorUnauthorized', async () => {
        // 1) Preparación de la Pruebas
        const reqBody = { usuario: 'leandro', contrasenia: 'claveErronea' };
        const mockUserDb = { usuario: 'leandro', contrasenia: 'hashedOriginal' };
        usuarioModel.buscarUsuario.mockResolvedValue(mockUserDb);
        bcrypt.compare.mockResolvedValue(false);
        console.log("Inicializando Prueba 4.... validando contraseña errónea");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/login').send(reqBody);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(401);
        expect(response.body.mensaje).toBe('Contraseña incorrecta');
        expect(response.body.encontrado).toBe(0);
    });

    test('5. cuandoFallaBaseDatosLanzarErrorInternalServer', async () => {
        // 1) Preparación de la Pruebas
        const reqBody = { usuario: 'leandro', contrasenia: 'clave123' };
        usuarioModel.buscarUsuario.mockRejectedValue(new Error('Fallo crítico de base de datos'));
        console.log("Inicializando Prueba 5.... simulando excepción de conexión");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/login').send(reqBody);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Usuario no encontrado');
        expect(response.body.encontrado).toBe(0);
    });

    // ==========================================
    // PRUEBAS DE POST /usuarios/registro (6 al 8)
    // ==========================================

    test('6. cuandoDatosValidosRegistrarColaboradorYCrearLog', async () => {
        // 1) Preparación de la Pruebas
        const nuevoColaborador = { usuario: 'nuevoColab', contrasenia: 'pass123', id_usuario: 99 };
        const mockUserInsertado = { id_usuario: 5, usuario: 'nuevoColab' };
        usuarioModel.buscarUsuario.mockResolvedValue(null);
        usuarioModel.insertUsuario.mockResolvedValue(mockUserInsertado);
        logsModel.registrarLog.mockResolvedValue(true);
        console.log("Inicializando Prueba 6.... registro exitoso de colaborador");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/registro').send(nuevoColaborador);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Colaborador creado exitosamente');
        expect(logsModel.registrarLog).toHaveBeenCalledWith({
            id_usuario: 99,
            tabla: 'usuarios',
            tipo_log: 'insert'
        });
    });

    test('7. cuandoFaltanCamposRegistroLanzarErrorBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const datosIncompletos = { usuario: 'soloUsuario', contrasenia: '' };
        console.log("Inicializando Prueba 7.... validación de campos vacíos en registro");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/registro').send(datosIncompletos);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Usuario, contraseña e ID de usuario son requeridos');
    });

    test('8. cuandoLugarOcupadoLanzarExcepcion', async () => {
        // 1) Preparación de la Pruebas
        const datosDuplicados = { usuario: 'colaborador1', contrasenia: 'Password123!', id_usuario: 1 };
        usuarioModel.buscarUsuario.mockResolvedValue({ usuario: 'colaborador1' });
        console.log("Inicializando Prueba 8.... simulando colisión de nombre de usuario");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/usuarios/registro').send(datosDuplicados);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('El nombre de usuario ya está en uso');
    });

    // ==========================================
    // PRUEBAS DE GET Y DELETE (9 y 10)
    // ==========================================

    test('9. cuandoSeSolicitanUsuariosRetornarListaExitosa', async () => {
        // 1) Preparación de la Pruebas
        const mockListaUsuarios = [{ id_usuario: 1, usuario: 'usr1' }, { id_usuario: 2, usuario: 'usr2' }];
        usuarioModel.obtenerTodosLosUsuarios.mockResolvedValue(mockListaUsuarios);
        console.log("Inicializando Prueba 9.... obteniendo todos los usuarios");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/usuarios');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockListaUsuarios);
    });

    test('10. cuandoIdValidoEliminarUsuarioExitosamente', async () => {
        // 1) Preparación de la Pruebas
        const idEliminar = 15;
        usuarioModel.eliminarUsuarioPorId.mockResolvedValue(true);
        console.log("Inicializando Prueba 10.... eliminando usuario por ID");

        // 2) Lógica de la Pruebas
        const response = await request(app).delete(`/usuarios/${idEliminar}`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Usuario eliminado exitosamente');
    });
});