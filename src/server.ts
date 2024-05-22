import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pagesRouter from "./routes/pages";
import connectDB from "./config/db";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/pages", pagesRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
