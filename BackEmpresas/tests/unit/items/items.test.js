import { jest } from '@jest/globals';

// 1) Configuración de Mocks Modernos para ES Modules (itemsModel y logsModel)
jest.unstable_mockModule('../../../models/itemsModel.js', () => ({
    default: {
        obtenerTodosItemsDisponibles: jest.fn(),
        obtenerTodosItemsById: jest.fn(),
        verifyItem: jest.fn(),
        insertarItem: jest.fn()
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
const itemsRouter = (await import('../../../routers/itemsRouter.js')).default;
const itemsModel = (await import('../../../models/itemsModel.js')).default;
const logsModel = (await import('../../../models/logsModel.js')).default;

// Configuración de la App Express de pruebas
const app = express();
app.use(express.json());
app.use('/items', itemsRouter); // Montado bajo /items según tu index.js

describe('Módulo de Ítems - Pruebas Unitarias Estructuradas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // SECCIÓN 1: obtenerItems (1 y 2)
    // ==========================================

    test('1. cuandoExistanItemsDisponiblesRetornarLista', async () => {
        // 1) Preparación de la Pruebas
        const mockItemsDisponibles = [{ id_item: 1, nombre_item: 'Item Libre A' }];
        itemsModel.obtenerTodosItemsDisponibles.mockResolvedValue(mockItemsDisponibles);
        console.log("Inicializando Prueba 1.... obteniendo ítems disponibles para registrar");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/items/1');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockItemsDisponibles);
    });

    test('2. cuandoNoExistanItemsDisponiblesLanzarNotFound', async () => {
        // 1) Preparación de la Pruebas
        itemsModel.obtenerTodosItemsDisponibles.mockResolvedValue(null);
        console.log("Inicializando Prueba 2.... manejando lista de disponibles vacía");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/items/999');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.mensaje).toBe('Items no encontradas');
    });

    // ==========================================
    // SECCIÓN 2: obtenerItemsById (3 y 4)
    // ==========================================

    test('3. cuandoEmpresaTieneItemsRetornarDetalleExitoso', async () => {
        // 1) Preparación de la Pruebas
        const mockItemsEmpresa = [{ nombre_item: 'Laptop', descripcion: 'Gamer', tipo_item: true }];
        itemsModel.obtenerTodosItemsById.mockResolvedValue(mockItemsEmpresa);
        console.log("Inicializando Prueba 3.... obteniendo ítems asignados a una empresa");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/items/empresa/1');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockItemsEmpresa);
    });

    test('4. cuandoObtenerItemsByIdFallaLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        itemsModel.obtenerTodosItemsById.mockRejectedValue(new Error('Fallo de conexión en Supabase'));
        console.log("Inicializando Prueba 4.... controlando excepción en obtenerItemsById");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/items/empresa/1');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Error interno del servidor');
    });

    // ==========================================
    // SECCIÓN 3: insertarItem (5 al 10)
    // ==========================================

    test('5. cuandoFaltanCamposObligatoriosLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const bodyIncompleto = { id_empresa: 1, fecha_inicio: '2026-01-01' }; // Faltan id_item e id_usuario
        console.log("Inicializando Prueba 5.... validando datos incompletos en inserción");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyIncompleto);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('Datos incompletos');
    });

    test('6. cuandoItemYaEstaRegistradoLanzarBadRequestPorDuplicado', async () => {
        // 1) Preparación de la Pruebas
        const bodyDuplicado = { id_empresa: 1, id_item: 2, fecha_inicio: '2026-01-01', id_usuario: 5 };
        itemsModel.verifyItem.mockResolvedValue(true); // Ya existe en la empresa
        console.log("Inicializando Prueba 6.... validando ítem duplicado en la misma empresa");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyDuplicado);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('El ítem ya ha sido registrado en esta empresa.');
    });

    test('7. cuandoFechaInicioTieneFormatoInvalidoLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const bodyFechaMala = { id_empresa: 1, id_item: 2, fecha_inicio: '01-01-2026', id_usuario: 5 }; // Formato incorrecto DD-MM-YYYY
        itemsModel.verifyItem.mockResolvedValue(false);
        console.log("Inicializando Prueba 7.... validando formato Regex de fecha_inicio");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyFechaMala);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('Formato de fecha inválido. Use YYYY-MM-DD');
    });

    test('8. cuandoFechaFinTieneFormatoInvalidoLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const bodyFechaFinMala = { 
            id_empresa: 1, id_item: 2, fecha_inicio: '2026-01-01', fecha_fin: '2026/13/45', id_usuario: 5 
        }; // Fecha inexistente/inválida
        itemsModel.verifyItem.mockResolvedValue(false);
        console.log("Inicializando Prueba 8.... validando validez de objeto fecha_fin");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyFechaFinMala);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.mensaje).toBe('Formato de fecha inválido. Use YYYY-MM-DD');
    });

    test('9. cuandoDatosYFechasSonValidosInsertarItemYRegistrarLog', async () => {
        // 1) Preparación de la Pruebas
        const bodyValido = { 
            id_empresa: 1, id_item: 2, fecha_inicio: '2026-01-01', fecha_fin: '2026-12-31', id_usuario: 10 
        };
        itemsModel.verifyItem.mockResolvedValue(false);
        itemsModel.insertarItem.mockResolvedValue('Ítem asignado correctamente');
        logsModel.registrarLog.mockResolvedValue(true);
        console.log("Inicializando Prueba 9.... inserción exitosa de ítem con auditoría");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyValido);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Ítem asignado correctamente');
        expect(logsModel.registrarLog).toHaveBeenCalledWith({
            id_usuario: 10,
            tabla: 'empresas_items',
            tipo_log: 'insert'
        });
    });

    test('10. cuandoFallaInsercionDeItemLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        const bodyValido = { id_empresa: 1, id_item: 2, fecha_inicio: '2026-01-01', id_usuario: 10 };
        itemsModel.verifyItem.mockResolvedValue(false);
        itemsModel.insertarItem.mockRejectedValue(new Error('Fallo de inserción'));
        console.log("Inicializando Prueba 10.... excepción durante el guardado de la asignación");

        // 2) Lógica de la Pruebas
        const response = await request(app).post('/items').send(bodyValido);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.mensaje).toBe('Error interno del servidor');
    });
});