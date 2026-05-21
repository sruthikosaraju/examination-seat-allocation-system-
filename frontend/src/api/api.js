import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= STUDENTS =================

// GET STUDENTS
export const getAllStudents = () => API.get("/students");

// ADD STUDENT
export const createStudent = (data) =>
  API.post("/students", data);

// DELETE STUDENT
export const deleteStudent = (id) =>
  API.delete(`/students/${id}`);

// ================= AUTH =================

// LOGIN USER
export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= STUDENT AUTH =================

// LOGIN STUDENT
export const loginStudent = (data) =>
  API.post("/student/login", data);
