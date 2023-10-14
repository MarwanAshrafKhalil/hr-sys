import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import employeeRoutes from "./routes/Employee.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use("/api/employee", employeeRoutes);
