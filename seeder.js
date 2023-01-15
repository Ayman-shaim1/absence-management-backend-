import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

import User from "./models/userModel.js";

import { users } from "./data/index.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
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
