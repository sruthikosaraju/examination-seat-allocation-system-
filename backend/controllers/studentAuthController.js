import Student from "../model/student.js";

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);
    console.log("LOGIN PASSWORD:", password);

    const allStudents = await Student.find();
    console.log("ALL STUDENTS:", allStudents);

    const student = await Student.findOne({ email: email });
    console.log("FOUND STUDENT:", student);

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      student,
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};