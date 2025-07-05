// npm install swagger-ui-express swagger-jsdoc


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Connexion API',
    version: '1.0.0',
    description: 'API documentation for Connexion application with authentication and product management',
    contact: {
      name: 'API Support',
      email: 'support@connexion.com'
    }
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3000}`,
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      csrfToken: {
        type: 'apiKey',
        in: 'header',
        name: 'X-CSRF-Token'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          },
          username: {
            type: 'string',
            description: 'Username'
          }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Product ID'
          },
          name: {
            type: 'string',
            description: 'Product name'
          },
          price: {
            type: 'number',
            description: 'Product price'
          },
          description: {
            type: 'string',
            description: 'Product description'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message'
          },
          error: {
            type: 'string',
            description: 'Error details'
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js', './index.js'], // Path to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUI };