import { Router } from "express";
import { login, logout, register, profile, resetPassword, forgotPassword  } from "../controllers/auth.controller.js";
import {authRequired,isAdmin} from "../middlewares/validateToken.js"


const router = Router();

// Rutas para el registro y login
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/Profile", authRequired, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get('/admin/dashboard', authRequired, isAdmin, (req, res) => {
    res.json({ message: 'Bienvenido al panel de administrador.' });
});

router.get('/admin/profile', authRequired, isAdmin, (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    });
  });

export default router;
