import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = Router();

// Rutas para el registro y login
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
