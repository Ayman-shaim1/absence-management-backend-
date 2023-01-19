import Filiere from "../models/filiereModel.js";
import asyncHandler from "express-async-handler";

// @desc    get all filiere
// @route   GET /api/filieres
// @access  private
export const getFilieres = asyncHandler(async (req, res) => {
  const filieres = await Filiere.find();
  res.json(filieres);
});
