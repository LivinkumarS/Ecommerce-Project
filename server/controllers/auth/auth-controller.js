// Register

import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const errors = [];
  if (password.length < 10) {
    errors.push("at least 10 characters");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("at least 1 lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("at least 1 uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("at least 1 number");
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push("at least 1 special character");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Password must contain ${errors.join(", ")}.`,
    });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 15);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully Registered" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        success: false,
        message: `${Object.keys(error.keyValue)[0]} is already taken!`,
      });
    }
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't Exist!" });

    const checkPasswordMatch = await bcryptjs.compare(
      password,
      checkuser.password
    );

    if (!checkPasswordMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Password is not valid!" });
    }

    const token = jwt.sign(
      {
        id: checkuser._id,
        email: checkuser.email,
        role: checkuser.role,
      },
      "Ecommerce_Project_Saala",
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .json({
        success: true,
        message: "Logged in successfully!",
        user: {
          email: checkuser.email,
          role: checkuser.role,
          id: checkuser._id,
        },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Some Error Has Occured" });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(201).json({
      message: "Log in to access this page!",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, "Ecommerce_Project_Saala");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      success: false,
    });
  }
};
