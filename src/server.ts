import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import routes from "./routes";
import path from "path";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", routes);
// Serve Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions,
  })
);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
