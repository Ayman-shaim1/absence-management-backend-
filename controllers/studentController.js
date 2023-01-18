import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Filiere from "../models/filiereModel.js";

// @desc    get all students
// @route   GET /api/students
// @access  private
export const getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  let students = await Student.find()
    // .populate("filiere")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  for (const student of students) {
    const filiere = await Filiere.findById(student.filiere);
    student.filiere = filiere;
  }
  
  // get total documents in the Students collection :
  const count = await Student.count();

  res.json({
    students,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

// @desc    get one student by id
// @route   GET /api/students/:id
// @access  private
export const getStudent = asyncHandler(async (req, res) => {
  let student = await Student.findById(req.params.id);
  const filiere = await Filiere.findById(student.filiere);
  student.filiere = filiere;
  res.json(student);
});

