import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import smsRoutes from "./routes/smsRoutes.js";
import filiereRoutes from "./routes/filiereRoutes.js";
import Student from "./models/studentModel.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import Absence from "./models/absenceModel.js";
import generateRandomDate from "./utils/generateRandomDate.js";
import Filiere from "./models/filiereModel.js";

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
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/filieres", filiereRoutes);

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


