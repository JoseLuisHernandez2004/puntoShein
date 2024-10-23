import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { TOKEN_SECRET } from '../config.js';
import axios from 'axios';


/* Variables para la funcion de bloqueo del numero de intentos de inicio de sesion */
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 1000; // 2 minutos
const RECAPTCHA_SECRET = '6LdxumkqAAAAA1a3g6_M2SFHPb0YJhpV3SkRPjU';

export const register = async (req, res) => {
  const { email, password, username, nombre, apellidoM, apellidoP, telefono } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
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
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;  // Eliminar recaptchaToken de la solicitud

  try {
    // Buscar al usuario por correo electrónico
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Verificar si la cuenta está bloqueada
    if (userFound.lockUntil && userFound.lockUntil > Date.now()) {
      const lockTimeRemaining = Math.ceil((userFound.lockUntil - Date.now()) / 1000); // en segundos
      return res.status(403).json({ message: `Cuenta bloqueada. Inténtalo de nuevo en ${lockTimeRemaining} segundos.` });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      // Incrementar intentos fallidos
      userFound.loginAttempts += 1;

      // Verificar si se alcanzaron los intentos máximos
      if (userFound.loginAttempts >= MAX_ATTEMPTS) {
        userFound.lockUntil = Date.now() + LOCK_TIME; // Bloquear por un tiempo definido (ej. 2 minutos)
        userFound.loginAttempts = 0; // Reiniciar intentos fallidos después del bloqueo
      }

      await userFound.save();
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Si la contraseña es correcta, restablecer intentos fallidos y desbloquear la cuenta
    userFound.loginAttempts = 0;
    userFound.lockUntil = null;
    await userFound.save();

    // Generar el token de acceso
    const token = await createAccessToken({ id: userFound._id });

    // Guardar el token en la cookie de forma segura
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Responder con los detalles del usuario
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
    const userFound = await User.findById(req.user.id); // Encuentra al usuario por su ID

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Devuelve los detalles del usuario
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

    // Generar token de restablecimiento válido por 1 hora
    const resetToken = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: '15m' });

    const resetUrl = `https://puntoshein.netlify.app/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'luis2004hdez@gmail.com', //Mi correo
        pass: 'zjdt tnxx bite jdjc',  // Mi contraseña de aplicaciones
      },
      tls: {
        rejectUnauthorized: false // Ignora el certificado autofirmado
      }
    });

    const mailOptions = {
      from: 'luis2004hdez@gmail.com',
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud: " + error.message });
  }
};

// Controlador para restablecer la contraseña
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si ha pasado menos de 24 horas desde el último cambio de contraseña
    const oneDay = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const now = Date.now();

    if (user.passwordChangedAt && (now - user.passwordChangedAt.getTime()) < oneDay) {
      return res.status(400).json({ message: "Solo puedes cambiar tu contraseña una vez cada 24 horas." });
    }

    // Validar la nueva contraseña
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    // Hashear la nueva contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos y registrar la fecha del cambio
    user.password = passwordHash;
    user.passwordChangedAt = new Date(); // Registrar la fecha y hora del cambio de contraseña
    await user.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al restablecer la contraseña: " + error.message });
  }
};