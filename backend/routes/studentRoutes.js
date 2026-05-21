import express from "express";
import Student from "../model/student.js";

const router = express.Router();

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("Fetched students:", students); // DEBUG
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// ADD STUDENTS
router.post("/", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // DEBUG

    const students = await Student.insertMany(req.body);

    console.log("Saved:", students); // DEBUG

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving students" });
  }
});

export default router;
