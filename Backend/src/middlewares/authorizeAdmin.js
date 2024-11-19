// middlewares/authorizeAdmin.js
export const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: 'Acceso denegado, necesitas autenticación.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado, necesitas permisos de administrador.' });
  }

  next();
};
