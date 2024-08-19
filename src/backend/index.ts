import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import stickyRoutes from "./routes/stickyRoutes";

dotenv.config();

const app: Application = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Enable CORS for all routes
app.use(cors());

// Database Connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes, stickyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger API docs available at http://localhost:${PORT}/docs`);
});

// Export the app for testing
export default app;
