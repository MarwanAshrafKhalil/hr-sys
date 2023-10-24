import Employee from "../models/Employee.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newEmployee = new Employee({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    // next(errorHandler(300, "something went wrong"));
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validEmployee = await Employee.findOne({ email });
    if (!validEmployee) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(
      password,
      validEmployee.password
    );
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validEmployee._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validEmployee._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1 hour
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee) {
      const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = employee._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newEmployee = new Employee({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newEmployee.save();
      const token = jwt.sign({ id: newEmployee._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newEmployee._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};
