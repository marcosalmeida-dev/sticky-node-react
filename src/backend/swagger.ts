import swaggerAutogen from "swagger-autogen";

const PORT = process.env.PORT || 5000;

const doc = {
  info: {
    version: "v1.0.0",
    title: "Swagger Demo Project",
    description: "Implementation of Swagger with TypeScript",
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: "",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./src/routes/authRoutes.ts", 
    "./src/routes/stickyRoutes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
