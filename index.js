import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// Init dotenv :
dotenv.config();
// Connect Database :
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));

// Make uploads as static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Define Routes :
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Init Error Middlewares :
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
