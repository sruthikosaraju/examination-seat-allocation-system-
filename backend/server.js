import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js"; // ✅ NEW

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (FIXED)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());

// ✅ Routes (AFTER middleware)
app.use("/api/auth", authRoutes);
app.use("/api/student", studentAuthRoutes); // ✅ NEW (STUDENT LOGIN)
app.use("/api/students", studentRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});