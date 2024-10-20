import { Router } from "express";
import { login, logout, register, profile, resetPassword, forgotPassword  } from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js"


const router = Router();

// Rutas para el registro y login
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
