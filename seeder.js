import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

import User from "./models/userModel.js";
import Absence from "./models/absenceModel.js";
import Student from "./models/studentModel.js";
import Filiere from "./models/filiereModel.js";

import { users, absences, filieres, students } from "./data/index.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Filiere.deleteMany();
    await Student.deleteMany();
    await Absence.deleteMany();

    await User.insertMany(users);

    const createdFilieres = await Filiere.insertMany(filieres);

    const nStudents = students.map(student => {
      const bit = Math.round(Math.random() * 1);
      return {
        ...student,
        filiere: bit === 0 ? createdFilieres[0]._id : createdFilieres[1]._id,
      };
    });

    const createdStudents = await Student.insertMany(nStudents);

    const nAbsences = absences.map(absence => {
      const randomIndex = Math.round(Math.random() * 99);
      return {
        ...absence,
        student: createdStudents[randomIndex],
      };
    });

    await Absence.insertMany(nAbsences);
    console.log(`Data Imported !`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Filiere.deleteMany();
    await Student.deleteMany();
    await Absence.deleteMany();

    console.log(`Data destroyed !`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
