// swagger.ts
import { SwaggerDefinition, SwaggerOptions } from "swagger-ui-express";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API Documentation",
    version: "1.0.0",
    description: "API documentation for your application.",
  },
  servers: [
    {
      url: "http://localhost:5000", // Specify the base URL of your API
    },
  ],
};

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["../routes/*.ts"], // Adjust the path as per your file structure
};

export default swaggerOptions;
