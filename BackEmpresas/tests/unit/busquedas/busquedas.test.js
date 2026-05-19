import { jest } from '@jest/globals';

// 1) Configuración de Mocks Modernos para ES Modules (busquedaModel)
jest.unstable_mockModule('../../../models/busquedas.model.js', () => ({
    busquedaModel: {
        buscarEmpresas: jest.fn()
    }
}));

// 2) Importaciones dinámicas después de declarar los mocks
const request = (await import('supertest')).default;
const express = (await import('express')).default;
const busquedasRouter = (await import('../../../routers/busquedasRouter.js')).default;
const { busquedaModel } = await import('../../../models/busquedas.model.js');

// Configuración de la App Express de pruebas
const app = express();
app.use(express.json());
app.use('/', busquedasRouter); // Tu router expone '/busquedas' directamente

describe('Módulo de Búsquedas Avanzadas - Pruebas Unitarias Estructuradas', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ==========================================
    // VALIDACIONES DE ENTRADA Y SANITIZACIÓN (1 al 4)
    // ==========================================

    // ==========================================
    // VALIDACIONES DE ENTRADA Y SANITIZACIÓN (1 al 4)
    // ==========================================

    test('1. cuandoNoSeEnviaNingunCriterioLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        console.log("Inicializando Prueba 1.... buscando sin parámetros en la query");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Debe proporcionar al menos un criterio de búsqueda válido');
        consoleSpy.mockRestore();
    });

    test('2. cuandoParametroExcedeLongitudPermitidaLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const queryLarga = 'a'.repeat(101);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        console.log("Inicializando Prueba 2.... validando string que excede longitud permitida");

        // 2) Lógica de la Pruebas
        const response = await request(app).get(`/busquedas?nombre_empresa=${queryLarga}`);

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('El parámetro de búsqueda excede la longitud máxima permitida');
        consoleSpy.mockRestore();
    });

    test('3. cuandoParametrosTienenCaracteresPeligrososSanitizarCorrectamente', async () => {
        // 1) Preparación de la Pruebas
        const queryInyeccion = "tech;DROP--"; 
        busquedaModel.buscarEmpresas.mockResolvedValue([]); 
        console.log("Inicializando Prueba 3.... probando remoción de caracteres de inyección SQL");

        // 2) Lógica de la Pruebas
        await request(app).get(`/busquedas?nombre_empresa=${queryInyeccion}`);

        // 3) Verificación del resultado esperado o Assert
        // El controlador parametriza el valor. Extraemos el arreglo de parámetros enviados al modelo:
        const parametrosEjecutados = busquedaModel.buscarEmpresas.mock.calls[0][1];
        
        // Verificamos que el parámetro limpie el ';' y el '--' quedando en el formato de búsqueda esperado
        expect(parametrosEjecutados).toContain('%techDROP%');
    });

    test('4. cuandoCriteriosSonSoloEspaciosLanzarBadRequest', async () => {
        // 1) Preparación de la Pruebas
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        console.log("Inicializando Prueba 4.... validando parámetros compuestos por espacios vacíos");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas?actividad=   ');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Debe proporcionar al menos un criterio de búsqueda válido');
        consoleSpy.mockRestore();
    });

    // ==========================================
    // ESCENARIOS DE RESPUESTA DE LA API (5 al 10)
    // ==========================================

    test('5. cuandoNoCoincideNingunaEmpresaLanzarNotFoundConSugerencia', async () => {
        // 1) Preparación de la Pruebas
        busquedaModel.buscarEmpresas.mockResolvedValue([]); // Base de datos vacía para ese filtro
        console.log("Inicializando Prueba 5.... manejando búsqueda sin resultados coincidentes");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas?nombre_empresa=Inexistente');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('No se encontraron empresas con los criterios proporcionados');
        expect(response.body).toHaveProperty('sugerencia');
    });

    test('6. cuandoBusquedaEsExitosaRetornarEstructuraFormateada', async () => {
        // 1) Preparación de la Pruebas
        const mockEmpresaRaw = [{
            id_empresa: 1,
            nombre_comercial: 'Alimentos S.A.',
            denominacion_social: 'Alimentos Bolivia S.A.',
            fecha_fundacion: '2015-06-20',
            nit: '987654321',
            url: 'http://alimentos.bo',
            direccion_web: 'www.alimentos.bo',
            nombre_actividad: 'Producción',
            nombre_tamanio: 'Mediana',
            items: 'Harina, Fideo',
            ubicaciones: 'La Paz, Murillo, La Paz; El Alto, Murillo, El Alto'
        }];
        busquedaModel.buscarEmpresas.mockResolvedValue(mockEmpresaRaw);
        console.log("Inicializando Prueba 6.... formateando respuesta de búsqueda exitosa");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas?nombre_empresa=Alimentos');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body[0].items).toEqual(['Harina', 'Fideo']); // Verifica el split de items
        expect(response.body[0].ubicaciones).toHaveLength(2);
        expect(response.body[0].ubicaciones[0]).toEqual({
            municipio: 'La Paz',
            ciudad: 'Murillo',
            departamento: 'La Paz'
        });
    });

    test('7. cuandoEmpresaNoTieneItemsNiUbicacionesAsignarArraysVacios', async () => {
        // 1) Preparación de la Pruebas
        const mockEmpresaVacia = [{
            id_empresa: 2,
            nombre_comercial: 'Tech In',
            items: null,
            ubicaciones: null
        }];
        busquedaModel.buscarEmpresas.mockResolvedValue(mockEmpresaVacia);
        console.log("Inicializando Prueba 7.... validando operador Nullish Coalescing (??) para campos nulos");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas?nombre_empresa=Tech');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(200);
        expect(response.body[0].items).toEqual([]);
        expect(response.body[0].ubicaciones).toEqual([]);
    });

    test('8. cuandoSeFiltraSoloPorActividadConstruirQueryCorrecta', async () => {
        // 1) Preparación de la Pruebas
        busquedaModel.buscarEmpresas.mockResolvedValue([]);
        console.log("Inicializando Prueba 8.... verificando concatenación de WHERE para actividad");

        // 2) Lógica de la Pruebas
        await request(app).get('/busquedas?actividad=Software');

        // 3) Verificación del resultado esperado o Assert
        const queryEjecutada = busquedaModel.buscarEmpresas.mock.calls[0][0];
        const paramsEjecutados = busquedaModel.buscarEmpresas.mock.calls[0][1];
        expect(queryEjecutada).toContain('JOIN ACTIVIDADES A');
        expect(paramsEjecutados).toEqual(['%Software%']);
    });

    test('9. cuandoSeFiltraporMultiplesCamposConstruirInterseccion', async () => {
        // 1) Preparación de la Pruebas
        busquedaModel.buscarEmpresas.mockResolvedValue([]);
        console.log("Inicializando Prueba 9.... validando cláusula INTERSECT en queries concurrentes");

        // 2) Lógica de la Pruebas
        await request(app).get('/busquedas?nombre_empresa=Orbis&item=Sistemas');

        // 3) Verificación del resultado esperado o Assert
        const queryEjecutada = busquedaModel.buscarEmpresas.mock.calls[0][0];
        expect(queryEjecutada).toContain('INTERSECT');
    });

    test('10. cuandoFallaModeloDeBusquedaLanzarErrorInterno', async () => {
        // 1) Preparación de la Pruebas
        busquedaModel.buscarEmpresas.mockRejectedValue(new Error('Fallo general en pooler'));
        console.log("Inicializando Prueba 10.... controlando excepción genérica del servidor");

        // 2) Lógica de la Pruebas
        const response = await request(app).get('/busquedas?nombre_empresa=Tech');

        // 3) Verificación del resultado esperado o Assert
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe('Error en la búsqueda');
    });
});