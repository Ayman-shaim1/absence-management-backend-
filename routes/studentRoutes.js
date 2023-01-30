import express from "express";
import {
  getStudents,
  getStudent,
  addStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";
import { upload } from "../middlewares/uploadMidlleware.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/").get(getStudents).post(upload.single("file"), addStudent);

router.route("/:id").get(getStudent).delete(deleteStudent);

export default router;
