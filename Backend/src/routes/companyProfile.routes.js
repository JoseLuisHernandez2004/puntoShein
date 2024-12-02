// routes/companyProfile.routes.js
import express from 'express';
import { getCompanyProfile, updateCompanyProfile, uploadLogo, getPublicCompanyProfile} from '../controllers/companyProfile.controller.js';
import { authRequired, isAdmin } from '../middlewares/validateToken.js'; // Middleware para requerir autenticación
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuración de almacenamiento en Cloudinary para multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'PuntoShein_logos',
      allowed_formats: ['jpeg', 'png'],
    },
  });

  const upload = multer({ storage });

// Ruta para obtener la configuración del perfil (disponible solo para administradores)
router.get('/', authRequired, isAdmin, getCompanyProfile);

// Ruta para actualizar la configuración del perfil (disponible solo para administradores)
router.put('/', authRequired, isAdmin, updateCompanyProfile);

// Ruta para subir el logo de la empresa (disponible solo para administradores)
router.put('/logo', authRequired, isAdmin, upload.single('logo'), uploadLogo);
//nueva ruta para obtener el perfil público
router.get('/public', getPublicCompanyProfile);



export default router;
