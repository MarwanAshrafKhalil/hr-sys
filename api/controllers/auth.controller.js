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
        expires: expiryDate.status(200),
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
