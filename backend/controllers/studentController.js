import Student from "../models/Student.js";

// GET ALL STUDENTS
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// ADD STUDENT
export const addStudent = async (req, res) => {
  const { name, hall, seat } = req.body;

  const student = new Student({ name, hall, seat });
  await student.save();

  res.json(student);
};

// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};