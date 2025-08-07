// Register

import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hasedPassword = await bcryptjs.hash(password, 15);
    const newUser = new User({ userName, email, password: hasedPassword });
    await newUser.save();
    res.status(400).json({ success: true, message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Some Error Occured!" });
  }
};
