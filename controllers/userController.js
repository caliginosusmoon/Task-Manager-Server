const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { name, passWord, emailId } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ emailId });
    } catch (error) {
      return console.log(error);
    }

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }
    const hashPassword = bcrypt.hashSync(passWord);
    const newuser = new User({
      name,
      passWord: hashPassword,
      emailId,
    });
    await newuser.save();
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { emailId, passWord } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ emailId });
  } catch (error) {
    return console.log(error);
  }
  console.log("existing: ", existingUser);
  if (!existingUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const validatePassword = bcrypt.compareSync(passWord, existingUser.passWord);
  if (!validatePassword) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }
  return res
    .status(200)
    .json({ message: "Login Successful", user: existingUser });
};
