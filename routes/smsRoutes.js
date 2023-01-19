import express from "express";
import { sendSms } from "../controllers/smsController.js";

const router = express.Router();
// router.route("/").get(protect, getStudents);
router.route("/:to").post(sendSms);

export default router;
