import express from "express";
import { authUser, registerUser } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMidlleware.js";
import User from "../models/userModel.js";
const router = express.Router();

router.route("/login").post(authUser);
router.route("/").post(registerUser);

export default router;
