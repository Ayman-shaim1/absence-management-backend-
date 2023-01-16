import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

// @desc    get all students
// @route   GET /api/students
// @access  private
export const getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const students = await Student.find()
    .populate("filiere")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // get total documents in the Students collection
  const count = await Student.count();

  res.json({
    students,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});
