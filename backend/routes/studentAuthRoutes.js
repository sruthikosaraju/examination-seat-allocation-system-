import express from "express";
import { studentLogin } from "../controllers/studentAuthController.js";

const router = express.Router();

router.post("/login", studentLogin);

export default router;