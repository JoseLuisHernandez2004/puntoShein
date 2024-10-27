// error.routes.js
import { Router } from 'express';
import { getErrors } from '../controllers/error.controller.js';
import { isAdmin } from '../middlewares/validateToken.js';  // Importa el middleware para validar si es admin

const router = Router();

// Ruta para obtener los registros de errores, protegida por isAdmin
router.get('/errors', isAdmin, getErrors);

export default router;
