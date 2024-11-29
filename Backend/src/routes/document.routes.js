// routes/document.routes.js
import express from 'express';
import {
  createDocument,
  updateDocument,
  deleteDocument,
  getCurrentVersion,
  getDocumentHistory,
  getDocumentById,
  getLastThreeDocuments // Importar la nueva función del controlador
} from '../controllers/document.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js'; // Importar middlewares

const router = express.Router();

// Rutas para documentos regulatorios, protegidas por autenticación y autorización
router.post('/', authRequired, isAdmin, createDocument); // Crear un nuevo documento
router.put('/:id', authRequired, isAdmin, updateDocument); // Modificar documento (crear nueva versión)
router.delete('/:id', authRequired, isAdmin, deleteDocument); // Marcar como eliminado
router.get('/current', authRequired, getCurrentVersion); // Obtener versión vigente (sin restricción a admin)
router.get('/history/:title', authRequired, getDocumentHistory); // Historial de versiones (sin restricción a admin)
router.get('/last-three', getLastThreeDocuments); // Obtener los tres últimos documentos vigentes
router.get('/:id', authRequired, getDocumentById); // Obtener un documento por ID


export default router;
