import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js'; // Asegúrate de importar el modelo de usuario

export const authRequired = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No se encontró un token. Acceso denegado." });
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido." });
        }

        // Buscar al usuario por ID decodificado del token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar si la contraseña fue cambiada después de que el token fue emitido
        if (user.passwordChangedAt && decoded.iat < Math.floor(user.passwordChangedAt.getTime() / 1000)) {
            return res.status(401).json({ message: "Contraseña cambiada recientemente. Por favor, inicia sesión nuevamente." });
        }

        req.user = user;
        next(); // Si todo está correcto, continuar con la siguiente función
    });
};