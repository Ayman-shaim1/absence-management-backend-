import express from "express";
import { getFilieres } from "../controllers/filiereController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";

const router = express.Router();

router.route("/").get(getFilieres);

export default router;
