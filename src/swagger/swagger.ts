import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Post API",
      version: "1.0.0",
      description: "API for managing Post",
    },
  },
  apis: ["./src/v1/routes/*.ts"],
};

export const swaggerSpecs = swaggerJsdoc(options);
