// user.routes.js
import express from 'express';
import { getUsers, getUserById, updateUserRole, deleteUser, deactivateUser} from '../controllers/user.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js'; // Ruta correcta al middleware
import { updateProfile } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', authRequired, isAdmin, getUsers);

// Ruta para obtener un usuario específico
router.get('/:id', authRequired, isAdmin, getUserById);

// Ruta para actualizar el rol de un usuario específico
router.put('/:id', authRequired, isAdmin, updateUserRole);

// Ruta para eliminar un usuario específico
router.delete('/:id', authRequired, isAdmin, deleteUser);

// Ruta para desactivar un usuario específico
router.put('/:id/deactivate', authRequired, isAdmin, deactivateUser);

//
router.put('/admin/profile', authRequired, isAdmin, updateProfile);




export default router;
