import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Create new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  if (user) {
    res.status(201);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isPrivateAccount: user.isPrivateAccount,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isPrivateAccount: user.isPrivateAccount,

      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});
