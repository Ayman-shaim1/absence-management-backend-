import express from "express";
import { getStudents } from "../controllers/studentController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/").get( getStudents);


export default router;
    