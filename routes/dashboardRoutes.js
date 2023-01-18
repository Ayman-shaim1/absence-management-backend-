import express from "express";
import { getNbrHeuresByFilieres } from "../controllers/dashboardController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/filieres/nbrheures").get(getNbrHeuresByFilieres);

export default router;
