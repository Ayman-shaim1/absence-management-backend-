import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import Student from "../models/studentModel.js";
import Filiere from "../models/filiereModel.js";
import Absence from "../models/absenceModel.js";

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
    where.name = { $regex: new RegExp("^" + name.toLowerCase(), "i") };
  }

  let students = await Student.find(where)
    // .populate("absence")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  students = JSON.parse(JSON.stringify(students));

  for (const student of students) {
    const absences = await Absence.find({ student: student._id });
    const filiere = await Filiere.findById(student.filiere);
    student.filiere = filiere;
    let cpt = 0;
    for (const absence of absences) {
      cpt += absence.nbrHeures;
    }
    student.nbrheuresabsences = cpt;
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

// @desc    create student
// @route   POST /api/students
// @access  private
export const addStudent = asyncHandler(async (req, res) => {
  try {
    if (req.file && req.file.path) {
      const { phone, name, filiere } = req.body;
      if (phone && name && filiere) {
        const createdStudent = await Student.create({
          phone,
          name,
          filiere,
          image: process.env.SERVER_URL + "/" + req.file.path,
        });

        res.status(201);
        res.json(createdStudent);
      } else {
        res.status(400);
        throw new Error("please fill in all fields of the form !");
      }
    } else {
      res.status(400);
      throw new Error("please add image !");
    }
  } catch (error) {
    if (req.file && req.file.path) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    delete student
// @route   DELETE /api/students/:id
// @access  private
export const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      const splitimage = student.image.split(process.env.SERVER_URL);
      const imagepath = splitimage.length > 1 ? splitimage[1] : "";

      if (imagepath !== "") {
        const __dirname = path.resolve();
        const filepath = path.join(__dirname, imagepath);
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
      await student.remove();
      res.json({ message: "done !" });
    } else {
      res.status(404);
      throw new Error("student not found !");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// @desc    delete student
// @route   PUT /api/students/:id
// @access  private
export const updateStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      const { phone, name, filiere } = req.body;
      const splitimage = student.image.split(process.env.SERVER_URL);
      const imagepath = splitimage.length > 1 ? splitimage[1] : "";
      const __dirname = path.resolve();
      const filepath = path.join(__dirname, imagepath);
      if (req.file && req.file.path) {
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        student.image = process.env.SERVER_URL + "/" + req.file.path;
      }
      student.phone = phone || student.phone;
      student.name = name || student.name;
      student.filiere = filiere || student.filiere;

      await student.save();
      res.json({ message: "done !" });
    } else {
      res.status(404);
      throw new Error("student not found !");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
