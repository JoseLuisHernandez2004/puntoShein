// routes/document.routes.js
import express from 'express';
import {
   updateSessionConfig,
   getSessionConfig,
} from '../controllers/sessionConfig.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js'; // Importar middlewares

const router = express.Router();


router.put('/actualizarSesion', authRequired, isAdmin, updateSessionConfig); 
router.get('/getDatosSesion', authRequired, isAdmin, getSessionConfig); 

export default router;
