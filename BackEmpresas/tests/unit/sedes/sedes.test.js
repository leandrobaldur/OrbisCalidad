import { jest } from '@jest/globals';

// 1) Configuración de Mocks Modernos para ES Modules (sedesModel y logsModel)
jest.unstable_mockModule('../../../models/sedesModel.js', () => ({
    default: {
        obtenerSedeById: jest.fn(),
        obtenerMunCiuDeptos: jest.fn(),
        verifySede: jest.fn(),
        newSede: jest.fn()
    }
}));

jest.unstable_mockModule('../../../models/logsModel.js', () => ({
    default: {
        registrarLog: jest.fn()
    }
}));

// 2) Importaciones dinámicas después de declarar los mocks
const request = (await import('supertest')).default;
const express = (await import('express')).default;
const sedesRouter = (await import('../../../routers/sedesRouter.js')).default;
const sedesModel = (await import('../../../models/sedesModel.js')).default;
const logsModel = (await import('../../../models/logsModel.js')).default;

// Configuración de la App Express de pruebas
const app = express();
app.use(express.json());
app.use('/sedes', sedesRouter); // Montado bajo /sedes según tu index.js

describe('Módulo de Sedes - Pruebas Unitarias Estructuradas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // SECCIÓN 1: obtenerSedeById (1, 2 y 3)
    // ==========================================

    test('1. cuandoEmpresaTieneSedesRetornarDetalleExitoso', async () => {
        // 1) Preparación de la Pruebas
        const mockSede = { nombre_edificio: 'Torre Orbis', zona: 'Calacoto', calle: '21' };
        sedesModel.obtenerSedeById.mockResolvedValue(mockSede);
        console.log("Inicializando Prueba 1.... obteniendo sede por ID de empresa");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/empresa/1');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockSede);
    });

    test('2. cuandoEmpresaNoTieneSedesLanzarNotFound', async () => {
        // 1) Preparación de la Pruebas
        sedesModel.obtenerSedeById.mockResolvedValue(null);
        console.log("Inicializando Prueba 2.... buscando sedes de empresa inexistente");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/empresa/999');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.mensaje).toBe('Sedes no encontradas');
    });

    test('3. cuandoObtenerSedeByIdFallaLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        sedesModel.obtenerSedeById.mockRejectedValue(new Error('Error de Postgres'));
        console.log("Inicializando Prueba 3.... controlando excepción en obtenerSedeById");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/empresa/1');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Error interno del servidor');
    });

    // ==========================================
    // SECCIÓN 2: obtenerMunCiuDeptos (4, 5 y 6)
    // ==========================================

    test('4. cuandoExistanDivisionesPoliticasRetornarListaCompleta', async () => {
        // 1) Preparación de la Pruebas
        const mockDivisiones = [{ id_municipio: 1, nombre_municipio: 'Nuestra Señora de La Paz' }];
        sedesModel.obtenerMunCiuDeptos.mockResolvedValue(mockDivisiones);
        console.log("Inicializando Prueba 4.... obteniendo catálogo de municipios");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/munciudeptos');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockDivisiones);
    });

    test('5. cuandoNoExistanDivisionesPoliticasLanzarNotFound', async () => {
        // 1) Preparación de la Pruebas
        sedesModel.obtenerMunCiuDeptos.mockResolvedValue(null);
        console.log("Inicializando Prueba 5.... catálogo de divisiones vacío");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/munciudeptos');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.mensaje).toBe('Municipios, ciudades y departamentos no encontrados');
    });

    test('6. cuandoObtenerMunCiuDeptosFallaLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        sedesModel.obtenerMunCiuDeptos.mockRejectedValue(new Error('Timeout de Supabase'));
        console.log("Inicializando Prueba 6.... controlando excepción en munciudeptos");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/sedes/munciudeptos');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Error interno del servidor');
    });

    // ==========================================
    // SECCIÓN 3: insertarSede (7, 8, 9 y 10)
    // ==========================================

    test('7. cuandoFaltanCamposEnElBodyLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const bodyIncompleto = { id_empresa: 1, zona: 'Miraflores' }; // Faltan casi todos los campos obligatorios
        console.log("Inicializando Prueba 7.... validación de campos obligatorios al insertar");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/sedes').send(bodyIncompleto);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('Datos incompletos');
    });

    test('8. cuandoSedeYaExisteLanzarBadRequestPorDuplicado', async () => {
        // 1) Preparación de la Pruebas
        const bodySede = {
            id_empresa: 1, id_municipio: 4, zona: 'Central', calle: 'Potosí',
            referencias: 'Esquina Ayacucho', nombre_edificio: 'Edif. Central',
            longitud: -68.123, latitud: -16.456, id_usuario: 10
        };
        sedesModel.verifySede.mockResolvedValue(true); // Indica que ya existe
        console.log("Inicializando Prueba 8.... intentando registrar sede duplicada");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/sedes').send(bodySede);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('La sede ya ha sido registrada.');
    });

    test('9. cuandoDatosSonValidosInsertarSedeYRegistrarLog', async () => {
        // 1) Preparación de la Pruebas
        const bodySedeValido = {
            id_empresa: 1, id_municipio: 4, zona: 'Central', calle: 'Potosí',
            referencias: 'Esquina Ayacucho', nombre_edificio: 'Edif. Nuevo',
            longitud: -68.123, latitud: -16.456, id_usuario: 10
        };
        sedesModel.verifySede.mockResolvedValue(false); // No está duplicado
        sedesModel.newSede.mockResolvedValue({ id_ubicacion: 75 }); // Devuelve el nuevo ID generado
        logsModel.registrarLog.mockResolvedValue(true);
        console.log("Inicializando Prueba 9.... inserción exitosa de sede con log de auditoría");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/sedes').send(bodySedeValido);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('ID de la sede nueva: 75');
        expect(logsModel.registrarLog).toHaveBeenCalledWith({
            id_usuario: 10,
            tabla: 'sedes',
            tipo_log: 'insert'
        });
    });

    test('10. cuandoFallaInsercionLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        const bodySede = {
            id_empresa: 1, id_municipio: 4, zona: 'Central', calle: 'Potosí',
            referencias: 'Esquina Ayacucho', nombre_edificio: 'Edif. Error',
            longitud: -68.123, latitud: -16.456, id_usuario: 10
        };
        sedesModel.verifySede.mockResolvedValue(false);
        sedesModel.newSede.mockRejectedValue(new Error('Fallo al escribir fila'));
        console.log("Inicializando Prueba 10.... excepción durante el guardado de la sede");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/sedes').send(bodySede);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Error interno del servidor');
    });
});