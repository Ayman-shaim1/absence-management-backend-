import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Student from "../models/studentModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    get all students
// @route   GET /api/students
// @access  private
export const getStudents = asyncHandler(async (req, res) => {
  const sutudents = await Student.find();
  res.json(sutudents);
});
