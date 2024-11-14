import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js'; // Asegúrate de importar el modelo de usuario

// Middleware para requerir autenticación
export const authRequired = async (req, res, next) => {
    const token = req.cookies.token; // Cambié a token directamente desde cookies

    if (!token) {
        return res.status(401).json({ message: "No se encontró un token. Acceso denegado." });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido." });
        }

        // Buscar al usuario por ID decodificado del token
        const user = await User.findById(decoded.id).select('-password'); // Excluir la contraseña

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar si la contraseña fue cambiada después de que el token fue emitido
        if (user.passwordChangedAt && decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
            return res.status(401).json({ message: "Contraseña cambiada recientemente. Por favor, inicia sesión nuevamente." });
        }

        req.user = user; // Agregar el usuario al objeto de solicitud
        next(); // Si todo está correcto, continuar con la siguiente función
    });
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Acceso denegado, necesitas autenticación.' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado, necesitas permisos de administrador.' });
    }

    next(); // Si es administrador, continuar con la siguiente función
};  
export const validateToken = async (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });
  
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user || user.tokenVersion !== decoded.tokenVersion) {
        return res.status(403).json({ message: 'Sesión inválida. Inicia sesión nuevamente.' });
      }
  
      req.user = decoded;
  
      // Renueva el token si está por expirar (opcional)
      const timeToExpire = decoded.exp * 1000 - Date.now();
      if (timeToExpire < 2 * 60 * 1000) { // Si queda menos de 2 minutos
        const newToken = createAccessToken(user); // Usar la función actualizada
        res.cookie('token', newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      }
  
      next();
    } catch (error) {
      res.clearCookie('token');
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  };
  
