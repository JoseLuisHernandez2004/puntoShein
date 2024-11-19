// routes/document.routes.js
import express from 'express';
import {
  createDocument,
  updateDocument,
  deleteDocument,
  getCurrentVersion,
  getDocumentHistory
} from '../controllers/document.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js'; // Importar middlewares

const router = express.Router();

// Rutas para documentos regulatorios, protegidas por autenticación y autorización
router.post('/', authRequired, isAdmin, createDocument); // Crear un nuevo documento
router.put('/:id', authRequired, isAdmin, updateDocument); // Modificar documento (crear nueva versión)
router.delete('/:id', authRequired, isAdmin, deleteDocument); // Marcar como eliminado
router.get('/current', authRequired, isAdmin, getCurrentVersion); // Obtener versión vigente
router.get('/history/:title', authRequired, isAdmin, getDocumentHistory); // Historial de versiones

export default router;
