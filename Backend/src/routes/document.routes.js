// routes/document.routes.js
import express from 'express';
import {
  createDocument,
  updateDocument,
  deleteDocument,
  getCurrentVersion,
  getDocumentHistory
} from '../controllers/document.controller.js';

const router = express.Router();

// Rutas para documentos regulatorios
router.post('/', createDocument); // Crear un nuevo documento
router.put('/:id', updateDocument); // Modificar documento (crear nueva versión)
router.delete('/:id', deleteDocument); // Marcar como eliminado
router.get('/current', getCurrentVersion); // Obtener versión vigente
router.get('/history/:title', getDocumentHistory); // Historial de versiones

export default router;
