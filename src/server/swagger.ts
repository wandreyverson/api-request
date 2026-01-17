import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Goop API',
            version: '1.0.0',
            description: 'API para gerenciamento de pedidos',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Ambiente local',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/router/**/*.ts'],
});
