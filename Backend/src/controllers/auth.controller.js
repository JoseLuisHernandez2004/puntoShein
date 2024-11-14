import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { TOKEN_SECRET } from '../config.js';
import axios from 'axios';
import ErrorLog from '../models/errorLog.model.js';


/* Variables para la funcion de bloqueo del numero de intentos de inicio de sesion */
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 2 * 60 * 1000; // 2 minutos
const RECAPTCHA_SECRET = '6LeQ6GoqAAAAAIecNT-3pcgw1yfB49LyRY1eGR4-';

// Función para registrar errores
const logError = async (error, req, type = 'error') => {
  const errorLog = new ErrorLog({
    userEmail: req.body?.email || req.user?.email,
    message: error.message,
    stack: error.stack,
    route: req.originalUrl,
    method: req.method,
    statusCode: res.statusCode || 500,
    type: type, // Nuevo campo para diferenciar el tipo de registro
  });
  await errorLog.save(); // Guarda el registro en la base de datos
};
// Función para validar la fortaleza de la contraseña
function isStrongPassword(password) {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}

export const register = async (req, res) => {
  const { email, password, username, nombre, apellidoM, apellidoP, telefono } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Validar fortaleza de la contraseña
    if (!isStrongPassword(password)) {
      return res.status(400).json({ 
        message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo."
      });
    }

    // Hashear la contraseña usando bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      nombre,
      apellidoP,
      apellidoM,
      email,
      telefono,
      password: passwordHash,
    });

    // Guardar el usuario en la base de datos
    const userSaved = await newUser.save();

    // Crear un token de acceso para el usuario
    const token = await createAccessToken({ id: userSaved._id });

    // Configurar una cookie con el token
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Responder con los detalles del usuario registrado
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      nombre: userSaved.nombre,
      apellidoP: userSaved.apellidoP,
      apellidoM: userSaved.apellidoM,
      telefono: userSaved.telefono,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });

  } catch (error) {
    await errorLog(error, req, res);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, recaptchaToken } = req.body;  // Se recibe el token de reCAPTCHA

  try {
    // Validar el token de reCAPTCHA con Google
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET,  // Asegúrate de que la clave secreta de reCAPTCHA esté en tus variables de entorno
        response: recaptchaToken,
      },
    });

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: "Error en reCAPTCHA. Inténtalo de nuevo." });
    }

    // Buscar al usuario en la base de datos
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Correo o contraseña incorrectos" });

    // Verificar si la cuenta está bloqueada
    if (userFound.lockUntil && userFound.lockUntil > Date.now()) {
      const lockTimeRemaining = Math.ceil((userFound.lockUntil - Date.now()) / 1000);
      return res.status(403).json({ message: `Cuenta bloqueada. Inténtalo de nuevo en ${lockTimeRemaining} segundos.` });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      userFound.loginAttempts += 1;

      // Si alcanza el número máximo de intentos fallidos, bloquea la cuenta por un período determinado
      if (userFound.loginAttempts >= MAX_ATTEMPTS) {
        userFound.lockUntil = Date.now() + LOCK_TIME;
        userFound.loginAttempts = 0;
      }

      await userFound.save();
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Restablecer intentos fallidos después de un inicio de sesión exitoso
    userFound.loginAttempts = 0;
    userFound.lockUntil = null;

    // *** Generar y enviar el código MFA ***
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generar un código MFA de 6 dígitos
    await sendMfaCode(email, mfaCode); // Enviar el código MFA al correo del usuario

    // Guardar el código MFA temporalmente en la base de datos del usuario
    userFound.mfaCode = mfaCode;
    await userFound.save();

    // Responder al cliente indicando que se requiere MFA
    res.status(200).json({ mfaRequired: true });

  } catch (error) {
    await logError(error, req, res);
    res.status(500).json({ message: error.message });
  }
};

export const verifyMfaCode = async (req, res) => {
  const { email, mfaCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.mfaCode !== mfaCode) {
      return res.status(403).json({ success: false, message: 'Código MFA inválido.' });
    }

    // Crear el token de acceso
    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 1000 * 60 * 60 * 24, // Expira en 1 día
    });

    // Limpiar el código MFA
    user.mfaCode = null;
    await user.save();

    res.json({
      success: true,
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role, // Devolver el rol para redirección
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    await logError(error, req);
    res.status(500).json({ message: error.message });
  }
};

export const sendMfaCode = async (email, mfaCode) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'luis2004hdez@gmail.com',
      pass: 'zjdt tnxx bite jdjc',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'puntoShein',
    to: email,
    subject: 'Código de verificación MFA',
    text: `Tu código de verificación es: ${mfaCode}`,
  };

  await transporter.sendMail(mailOptions);
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      nombre: userFound.nombre,
      apellidoP: userFound.apellidoP,
      apellidoM: userFound.apellidoM,
      telefono: userFound.telefono,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    await logError(error, req);
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar token de restablecimiento válido por 15 minutos
    const resetToken = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: '15m' });

    const resetUrl = `https://puntoshein.netlify.app/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'luis2004hdez@gmail.com',
        pass: 'zjdt tnxx bite jdjc',
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const mailOptions = {
      from: 'puntoShein',
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    await logError(error, req);
    res.status(500).json({ message: "Error al procesar la solicitud: " + error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (user.passwordChangedAt && (now - user.passwordChangedAt.getTime()) < oneDay) {
      return res.status(400).json({ message: "Solo puedes cambiar tu contraseña una vez cada 24 horas." });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    user.passwordChangedAt = new Date();
    await user.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    await logError(error, req);
    res.status(500).json({ message: "Error al restablecer la contraseña: " + error.message });
  }
};
