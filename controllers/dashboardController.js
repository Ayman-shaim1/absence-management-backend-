import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Filiere from "../models/filiereModel.js";

// @desc    get all students
// @route   GET /api/dasshboard/filieres/nbrheures
// @access  private
export const getNbrHeuresByFilieres = asyncHandler(async (req, res) => {
  const { date1, date2 } = req.query;

  console.log(new Date(date1 + ":24:00:00"), new Date(date2 + ":24:00:00"));

//   const students = await Student.aggregate([
//     {
//       $group: {
//         _id: "$filiere",
//         total: {
//           $sum: 1,
//         },
//       },
//     },
//   ]);

  //   .find({
  //     "absences.dateAbsence": {
  //       $gte: new Date(date1 + ":24:00:00"),
  //       $lte: new Date(date2 + ":24:00:00"),
  //     },
  //   }).count("absences.nbrHeures");
  res.json(students);
});
