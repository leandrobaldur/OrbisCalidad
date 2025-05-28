import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión Empresarial',
    version: '1.0.0',
    description: 'Documentación completa de la API para el sistema de gestión empresarial',
    contact: {
      name: 'Equipo de Desarrollo',
      email: 'soporte@empresa.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo local'
    }
  ],
  components: {
    responses: {
      NotFound: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'No se encontraron empresas con los criterios proporcionados',
              parametros_usados: {
                nombre_empresa: 'tech',
                nombre_fundador: 'juan',
                item: 'app',
                actividad: 'de'
              }
            }
          }
        }
      },
      BadRequest: {
        description: 'Petición incorrecta',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'Debe proporcionar al menos un criterio de búsqueda',
              ejemplo_valido: '/busquedas?nombre_empresa=tech'
            }
          }
        }
      },
      ServerError: {
        description: 'Error interno del servidor',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse'
            },
            example: {
              error: 'Error en la búsqueda',
              detalle: 'Mensaje detallado del error (solo en desarrollo)'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Búsquedas',
      description: 'Endpoints para búsqueda avanzada de empresas'
    },
    {
      name: 'Empresas',
      description: 'Gestión de empresas'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: [
    './routers/*.js',
    './controllers/*.js' // También puedes documentar directamente en los controladores
  ]
};

const swaggerSpec = swaggerJSDoc(options);

// Configuración adicional de la UI de Swagger
const swaggerUiOptions = {
  explorer: true,
  customSiteTitle: 'Documentación API Empresas',
  customCss: '.swagger-ui .topbar { display: none }',
  customfavIcon: '/favicon.ico'
};

export { swaggerUi, swaggerSpec, swaggerUiOptions };