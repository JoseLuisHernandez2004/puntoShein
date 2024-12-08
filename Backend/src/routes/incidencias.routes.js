import { Router } from 'express';
import {
  getIncidenciasByUser,
  createIncidencia,
  getAllIncidencias,
} from '../controllers/incidencias.controller.js';

const router = Router();

// Ruta para obtener todas las incidencias (opcional, si necesitas ver todas)
router.get('/', getAllIncidencias);

// Ruta para obtener las incidencias de un usuario específico
router.get('/:userId', getIncidenciasByUser);

// Ruta para crear una nueva incidencia manualmente (opcional)
router.post('/', createIncidencia);

export default router;
