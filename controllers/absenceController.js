import Absence from "../models/absenceModel.js";
import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

// @desc    get all absences of an student
// @route   GET /api/absences/student/:id
// @access  private
export const getAbsences = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    const absences = await Absence.find({ student: String(req.params.id) });
    res.json(absences);
  } else {
    res.status(404);
    throw new Error("Student not found !");
  }
});

// @desc    Add absence for an student
// @route   POST /api/absences/student/:id
// @access  private
export const addAbsence = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    const { nbrHeures, dateAbsence } = req.body;
    if (nbrHeures && dateAbsence) {
      const createdAbsence = await Absence.create({
        nbrHeures,
        dateAbsence,
        student: student._id,
      });
      res.status(201);
      res.json(createdAbsence);
    } else {
      res.status(400);
      throw new Error("please fill in all fields of the form !");
    }
    await Absence.find({ student: String(req.params.id) });
  } else {
    res.status(404);
    throw new Error("Student not found !");
  }
});

// @desc    Remove absence
// @route   DELETE /api/absences/:id
// @access  private
export const removeAbsence = asyncHandler(async (req, res) => {
  const absence = await Absence.findById(req.params.id);
  if (absence) {
    await absence.remove();
    res.json({ message: "done !" });
  } else {
    res.status(404);
    throw new Error("Absence not found !");
  }
});
