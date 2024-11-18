import { Router } from "express";
import { login, logout, register, profile, resetPassword, forgotPassword, verifyMfaCode, updateProfile, updateAdminProfile, getAdminProfile } from "../controllers/auth.controller.js";
import { authRequired, isAdmin } from "../middlewares/validateToken.js";
import { getErrors } from '../controllers/error.controller.js'; 
import { getAllUsers } from '../controllers/auth.controller.js';

const router = Router();

// Rutas para el registro y login
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-mfa", verifyMfaCode); // Nueva ruta para verificar el código MFA

// Rutas para administrador
router.get('/admin/dashboard', authRequired, isAdmin, (req, res) => {
    res.json({ message: 'Bienvenido al panel de administrador.' });
});

router.get('/errors', isAdmin, getErrors);
router.get('/users', authRequired, isAdmin, getAllUsers);
router.put("/profile", authRequired, updateProfile);
router.put('/admin/profile', authRequired, isAdmin, updateAdminProfile);
router.get('/admin/profile', authRequired, isAdmin, getAdminProfile);


export default router;
