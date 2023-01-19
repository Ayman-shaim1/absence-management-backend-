import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Filiere from "../models/filiereModel.js";

// @desc    get all students
// @route   GET /api/students
// @access  private
export const getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, filiere = "", name = "" } = req.query;
  const where = {};
  if (filiere && filiere !== "") {
    where.filiere = filiere;
  }

  if (name && name !== "") {
    where.name = name;
  }

  let students = await Student.find(where)
    // .populate("filiere")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  for (const student of students) {
    const filiere = await Filiere.findById(student.filiere);
    student.filiere = filiere;
  }

  // get total documents in the Students collection :
  const count = await Student.find(where).count();

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
