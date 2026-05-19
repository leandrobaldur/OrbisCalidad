import { jest } from '@jest/globals';

// 1) Configuración de Mocks Modernos para ES Modules (Mapeando empresaModel)
jest.unstable_mockModule('../../../models/empresaModel.js', () => ({
    getTodasEmpresasResumen: jest.fn(),
    getEmpresaPorId: jest.fn(),
    getEmpresaYFamilia: jest.fn(),
    getEmpresaOperacionesInternacionales: jest.fn(),
    getTamanioEmpresa: jest.fn()
}));

// 2) Importaciones dinámicas después de declarar los mocks
const request = (await import('supertest')).default;
const express = (await import('express')).default;
const empresaRouter = (await import('../../../routers/empresas.js')).default;
const empresaModel = (await import('../../../models/empresaModel.js'));

// Configuración de la App Express de pruebas
const app = express();
app.use(express.json());
app.use('/', empresaRouter); // Tu router se monta directo sobre '/' según tu index.js

describe('Módulo de Empresas - Pruebas Unitarias Estructuradas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // SECCIÓN 1: obtenerTodasEmpresasResumen (1 y 2)
    // ==========================================

    test('1. cuandoSeSolicitaResumenRetornarListaDeEmpresas', async () => {
        // 1) Preparación de la Pruebas
        const mockResumen = [
            { denominacion_social: 'Empresa A', nombre_comercial: 'A', nombre_tamanio: 'Grande' }
        ];
        empresaModel.getTodasEmpresasResumen.mockResolvedValue(mockResumen);
        console.log("Inicializando Prueba 1.... resumen general de empresas");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/empresas/resumen');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResumen);
    });

    test('2. cuandoResumenFallaLanzarErrorServidor', async () => {
        // 1) Preparación de la Pruebas
        empresaModel.getTodasEmpresasResumen.mockRejectedValue(new Error('Fallo crítico de conexión'));
        console.log("Inicializando Prueba 2.... manejando excepción en resumen");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/empresas/resumen');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Error del servidor' });
    });

    // ==========================================
    // SECCIÓN 2: obtenerEmpresaPorId (3, 4 y 5)
    // ==========================================

    test('3. cuandoIdNoEsNumericoLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const idInvalido = 'abc';
        console.log("Inicializando Prueba 3.... validando ID alfanumérico");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idInvalido}`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('ID inválido, debe ser numérico');
    });

    test('4. cuandoIdValidoPeroNoExisteLanzarNotFound', async () => {
        // 1) Preparación de la Pruebas
        const idInexistente = 999;
        empresaModel.getEmpresaPorId.mockResolvedValue(null);
        console.log("Inicializando Prueba 4.... buscando ID inexistente");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idInexistente}`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Empresa no encontrada');
    });

    test('5. cuandoIdValidoRetornarDatosDeLaEmpresa', async () => {
        // 1) Preparación de la Pruebas
        const idValido = 10;
        const mockEmpresa = { id_empresa: 10, denominacion_social: 'Orbis Corp', nit: 123456 };
        empresaModel.getEmpresaPorId.mockResolvedValue(mockEmpresa);
        console.log("Inicializando Prueba 5.... obteniendo empresa por ID exitoso");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idValido}`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockEmpresa);
    });

    // ==========================================
    // SECCIÓN 3: obtenerEmpresaFamiliar (6 y 7)
    // ==========================================

    test('6. cuandoEmpresaNoEsFamiliarRetornarMensajeInformativo', async () => {
        // 1) Preparación de la Pruebas
        const idEmpresa = 5;
        empresaModel.getEmpresaYFamilia.mockResolvedValue(null);
        console.log("Inicializando Prueba 6.... validando empresa no familiar");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idEmpresa}/familia`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('La empresa no es familiar');
    });

    test('7. cuandoEmpresaEsFamiliarRetornarEstructuraCompleta', async () => {
        // 1) Preparación de la Pruebas
        const idEmpresa = 5;
        const mockFamilia = { id_empresa: 5, denominacion_social: 'Sora Hnos', familia: [{ apellido_familia: 'Sora' }] };
        empresaModel.getEmpresaYFamilia.mockResolvedValue(mockFamilia);
        console.log("Inicializando Prueba 7.... obteniendo datos de empresa familiar");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idEmpresa}/familia`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockFamilia);
    });

    // ==========================================
    // SECCIÓN 4: obtenerOperacionesInternacionales (8)
    // ==========================================

    test('8. cuandoNoTieneOperacionesInternacionalesRetornarMensaje', async () => {
        // 1) Preparación de la Pruebas
        const idEmpresa = 2;
        empresaModel.getEmpresaOperacionesInternacionales.mockResolvedValue(null);
        console.log("Inicializando Prueba 8.... validando operaciones internacionales vacías");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idEmpresa}/operaciones-internacionales`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('La empresa no tiene operaciones internacionales');
    });

    // ==========================================
    // SECCIÓN 5: obtenerTamanioEmpresa (9 y 10)
    // ==========================================

    test('9. cuandoEmpresaNoTieneTamanioRegistradoRetornarMensaje', async () => {
        // 1) Preparación de la Pruebas
        const idEmpresa = 12;
        const mockEmpresaSinTamanio = { id_empresa: 12, nombre_tamanio: null };
        empresaModel.getTamanioEmpresa.mockResolvedValue(mockEmpresaSinTamanio);
        console.log("Inicializando Prueba 9.... validando empresa sin tamaño mapeado");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idEmpresa}/tamanio`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('La empresa no tiene tamaño registrado');
    });

    test('10. cuandoEmpresaTieneTamanioRetornarEstructuraFormateada', async () => {
        // 1) Preparación de la Pruebas
        const idEmpresa = 12;
        const mockDbResult = { 
            id_empresa: 12, 
            denominacion_social: 'Industrias Alfa', 
            nombre_comercial: 'Alfa', 
            nombre_tamanio: 'Mediana' 
        };
        empresaModel.getTamanioEmpresa.mockResolvedValue(mockDbResult);
        console.log("Inicializando Prueba 10.... obteniendo estructura formateada de tamaño");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/empresa/${idEmpresa}/tamanio`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            id_empresa: 12,
            denominacion_social: 'Industrias Alfa',
            nombre_comercial: 'Alfa',
            tamanio: 'Mediana' // El controlador renombra 'nombre_tamanio' a 'tamanio'
        });
    });
});