// routes/companyProfile.routes.js
import express from 'express';
import { getCompanyProfile, updateCompanyProfile, uploadLogo, getPublicCompanyProfile} from '../controllers/companyProfile.controller.js';
import { authorizeAdmin } from '../middlewares/authorizeAdmin.js'; // Middleware para restringir acceso a admin
import { authRequired } from '../middlewares/validateToken.js'; // Middleware para requerir autenticación
import multer from 'multer';

const router = express.Router();

// Configuración de multer para la subida de logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos JPEG o PNG'));
    }
  },
});

// Ruta para obtener la configuración del perfil (disponible solo para administradores)
router.get('/', authRequired, authorizeAdmin, getCompanyProfile);

// Ruta para actualizar la configuración del perfil (disponible solo para administradores)
router.put('/', authRequired, authorizeAdmin, updateCompanyProfile);

// Ruta para subir el logo de la empresa (disponible solo para administradores)
router.put('/logo', authRequired, authorizeAdmin, upload.single('logo'), uploadLogo);
//nueva ruta para obtener el perfil público
router.get('/public', getPublicCompanyProfile);



export default router;
