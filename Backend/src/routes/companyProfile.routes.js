// routes/companyProfile.routes.js
import express from 'express';
import { getCompanyProfile, updateCompanyProfile } from '../controllers/companyProfile.controller.js';
import { isAdmin } from '../middleware/auth.js'; // Middleware para restringir acceso a admin

const router = express.Router();

router.get('/', isAdmin, getCompanyProfile);
router.put('/', isAdmin, updateCompanyProfile);

export default router;
