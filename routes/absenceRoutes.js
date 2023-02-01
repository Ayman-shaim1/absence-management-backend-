import express from "express";
import {
  addAbsence,
  getAbsences,
  removeAbsence,
  getTotalNumberHours
} from "../controllers/absenceController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/student/:id").get(getAbsences).post(addAbsence);
router.route("/:id").delete(removeAbsence);
router.route("/student/:id/totalhours").get(getTotalNumberHours)
export default router;
