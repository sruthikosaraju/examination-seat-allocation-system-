import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // 🧹 Optional: clear old users
    await User.deleteMany();

    // 🔐 Hash passwords
    const adminPass = await bcrypt.hash("admin123", 10);
    const studentPass = await bcrypt.hash("student123", 10);

    // 👨‍💼 Admin user
    await User.create({
      email: "admin@exam.com",
      password: adminPass,
      role: "admin",
    });

    // 👨‍🎓 Student user
    await User.create({
      email: "student@exam.com",
      password: studentPass,
      role: "student",
    });

    console.log("✅ Admin & Student created successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createUsers();