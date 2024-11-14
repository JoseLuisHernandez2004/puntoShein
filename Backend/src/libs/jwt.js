import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export function createAccessToken(user) {
    return new Promise((resolve, reject) => {
        // Incluir `tokenVersion` en el payload del token
        const payload = { id: user._id, tokenVersion: user.tokenVersion };

        jwt.sign(
            payload,
            TOKEN_SECRET, 
            { expiresIn: "1min" }, // Expiración de 1 día
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}
