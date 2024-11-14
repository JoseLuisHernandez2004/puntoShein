// middlewares/authorizeAdmin.js
export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
  
  // Uso en las rutas
  import { authorizeAdmin } from '../middlewares/authorizeAdmin.js';
  router.use(authorizeAdmin); // Asegurar que todas las rutas de documentos sean solo para administradores
  