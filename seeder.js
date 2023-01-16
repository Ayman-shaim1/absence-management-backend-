import colors from "colors";
import dotenv from "dotenv";

import User from "./models/userModel.js";
import Student from "./models/studentModel.js";
import Filiere from "./models/filiereModel.js";

import { users, filieres, students } from "./data/index.js";
import generateRandomDate from "./utils/generateRandomDate.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Filiere.deleteMany();
    await Student.deleteMany();
    await User.deleteMany();

    const createdFilieres = await Filiere.insertMany(filieres);

    const nStudents = students.map(student => {
      const bit = Math.round(Math.random() * 1);
      const randomEndLoop = Math.round(Math.random() * 10);
      const absences = [];
      for (let i = 0; i < randomEndLoop; i++) {
        absences.push({
          dateAbsence: generateRandomDate(new Date(2022, 10, 1), new Date()),
          nbrHeures: Math.round(Math.random() * 6),
        });
      }
      return {
        ...student,
        filiere: bit === 0 ? createdFilieres[0]._id : createdFilieres[1]._id,
        absences: absences,
      };
    });

    await Student.insertMany(nStudents);
    await User.insertMany(users);

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
