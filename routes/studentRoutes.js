import express from "express";
import { getStudents, getStudent } from "../controllers/studentController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/").get(getStudents);
router.route("/:id").get(getStudent);

export default router;
