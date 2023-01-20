import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Absence from "../models/absenceModel.js";

import Filiere from "../models/filiereModel.js";

// Accepts the array and key
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    (result[new Date(currentValue[key]).toLocaleDateString()] =
      result[new Date(currentValue[key]).toLocaleDateString()] || []).push({
      nbrHeures: currentValue.nbrHeures,
    });
    return result;
  }, {});
};

// @desc    get all students
// @route   GET /api/dashboard/filieres/nbrheures
// @access  private
export const getNbrHeuresByFilieres = asyncHandler(async (req, res) => {
  const { date1, date2 } = req.query;

  console.log(date1, date2);

  var from = new Date(date1.split("/").reverse().join("-"));
  var to = new Date(date2.split("/").reverse().join("-"));

  const iam = await Filiere.findOne({
    libelle: "Ingénierie des applications mobile",
  });

  const bigData = await Filiere.findOne({ libelle: "Big Data" });

  const resIAM = await (
    await Absence.find().populate("student")
  ).filter(absence => String(absence.student.filiere) === String(iam._id));

  const resBigData = await (
    await Absence.find().populate("student")
  ).filter(absence => String(absence.student.filiere) === String(bigData._id));

  const newResIAM = [];
  const newResBigData = [];

  for (const absence of resIAM) {
    var check = new Date(absence.dateAbsence);
    if (check > from && check < to) {
      absence.student = null;
      newResIAM.push(absence);
    }
  }

  for (const absence of resBigData) {
    var check = new Date(absence.dateAbsence);
    if (check > from && check < to) {
      absence.student = null;
      newResBigData.push(absence);
    }
  }

  newResIAM.sort((a, b) => {
    return a.dateAbsence - b.dateAbsence;
  });
  newResBigData.sort((a, b) => {
    return a.dateAbsence - b.dateAbsence;
  });

  const resIAMValues = Object.values(groupBy(newResIAM, "dateAbsence"));
  const resBigDataValues = Object.values(groupBy(newResBigData, "dateAbsence"));

  const obj = {};
  obj.IAM = [];
  obj.BigData = [];

  for (const value of resIAMValues) {
    let sum = 0;
    for (const nbr of value) {
      sum += nbr.nbrHeures;
    }
    obj.IAM.push(sum);
  }
  for (const value of resBigDataValues) {
    let sum = 0;
    for (const nbr of value) {
      sum += nbr.nbrHeures;
    }
    obj.BigData.push(sum);
  }
  res.json(obj);
});
