import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { TOKEN_SECRET } from '../config.js';
import axios from 'axios';
import ErrorLog from '../models/errorLog.model.js';
import SessionConfig from '../models/sessionConfig.model.js';
import Incidencias from '../models/incidencia.model.js';


/* Variables para la funcion de bloqueo del numero de intentos de inicio de sesion */
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

// Función para registrar errores
const logError = async (error, req, type = 'error') => {
  const errorLog = new ErrorLog({
    userEmail: req.body?.email || req.user?.email,
    message: error.message,
    stack: error.stack,
    route: req.originalUrl,
    method: req.method,
    statusCode: res.statusCode || 1000,
    type: type, // Nuevo campo para diferenciar el tipo de registro
  });
  await errorLog.save(); // Guarda el registro en la base de datos
};
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
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', });
    

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
  const { email, password, recaptchaToken } = req.body; // Se recibe el token de reCAPTCHA

  try {
    // Obtener configuración dinámica de intentos y tiempo de bloqueo
    const sessionConfig = await SessionConfig.findOne() || { maxIntentos: 3, tiempoBloqueo: 1440 }; // Valores predeterminados: 1440 minutos = 24 horas
    const { maxIntentos, tiempoBloqueo } = sessionConfig;

    // Validar el token de reCAPTCHA con Google
    const recaptchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET, // Clave secreta de reCAPTCHA
          response: recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: 'Error en reCAPTCHA. Inténtalo de nuevo.' });
    }

    // Buscar al usuario en la base de datos
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
    }

    // Si el usuario fue desbloqueado manualmente
    if (!userFound.isBlocked && userFound.lockUntil) {
      console.log("Usuario desbloqueado manualmente:", userFound.email);
      userFound.lockUntil = null; // Quitar el bloqueo
      userFound.loginAttempts = 0; // Reiniciar intentos fallidos
      await userFound.save();
    }

    // Verificar si la cuenta está bloqueada permanentemente
    if (userFound.isBlocked && !userFound.lockUntil) {
      return res.status(403).json({ message: 'Tu cuenta está bloqueada. Contacta al administrador.' });
    }

    // Verificar si la cuenta está temporalmente bloqueada
    if (userFound.isBlocked) {
      return res.status(403).json({
        message: 'Tu cuenta está bloqueada. Contacta al administrador.',
      });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      userFound.loginAttempts += 1;
    
      // Registrar el intento fallido como una incidencia
      await loginIncidencias(userFound._id, 'Intento fallido de inicio de sesión.', 'Activo');
    
      // Si alcanza el número máximo de intentos fallidos, bloquear al usuario temporalmente
      if (userFound.loginAttempts >= maxIntentos) {
        userFound.lockUntil = Date.now() + tiempoBloqueo * 60 * 1000; // Bloqueo temporal en milisegundos
        userFound.isBlocked = true; // Reflejar el estado bloqueado
        await userFound.save();
    
        // Registrar la incidencia del bloqueo
        await loginIncidencias(userFound._id, 'Alcanzó el límite de intentos fallidos y fue bloqueado.', 'Bloqueado');
    
        return res.status(403).json({
          message: 'Alcanzaste el límite de intentos fallidos. Tu cuenta está bloqueada.',
        });
      }
    
      await userFound.save();
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
    }
    

    // Restablecer intentos fallidos después de un inicio de sesión exitoso
    userFound.loginAttempts = 0;
    userFound.lockUntil = null;
    userFound.isBlocked = false; // Reflejar que no está bloqueado

    // *** Generar y enviar el código MFA ***
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generar un código MFA de 6 dígitos
    const mfaCodeExpires = Date.now() + 10 * 60 * 1000; // El código expira en 10 minutos

    // Enviar el código MFA al correo del usuario
    await sendMfaCode(userFound.email, mfaCode);

    // Guardar el código MFA temporalmente en la base de datos del usuario
    userFound.mfaCode = mfaCode;
    userFound.mfaCodeExpires = mfaCodeExpires;
    await userFound.save();

    // Responder al cliente indicando que se requiere MFA
    res.status(200).json({ mfaRequired: true, message: 'Código MFA enviado al correo electrónico.' });
  } catch (error) {
    console.error('Error en login:', error);
    await logError(error, req, res); // Función para registrar errores
    res.status(500).json({ message: 'Error interno del servidor.' });
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
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
      tls: {
          rejectUnauthorized: false,
      },
  });

  const mailOptions = {
      from: 'puntoShein <no-reply@puntoshein.com>',
      to: email,
      subject: 'Código de verificación MFA',
      text: `Tu código de verificación es: ${mfaCode}. Este código expirará en 10 minutos.`,
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
    // Encuentra al usuario por ID y excluye la contraseña de la consulta
    const userFound = await User.findById(req.user.id).select('-password');
    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devuelve la información del usuario, incluyendo los campos adicionales solicitados
    return res.json({
      id: userFound._id,
      username: userFound.username,
      nombre: userFound.nombre,
      apellidoP: userFound.apellidoP,
      apellidoM: userFound.apellidoM,
      telefono: userFound.telefono,
      direccion: userFound.direccion, // Añadir dirección
      fechaNacimiento: userFound.fechaNacimiento, // Añadir fecha de nacimiento
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error); // Agrega un registro para depurar errores
    await logError(error, req);
    res.status(500).json({ message: "Error interno del servidor" });
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Excluir la contraseña de la respuesta
    res.status(200).json(users);
  } catch (error) {
    await logError(error, req);
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Asegúrate de que `req.user` contenga el usuario autenticado
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};
export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id; // El ID del admin debería estar en `req.user` tras la autenticación
    console.log(`Actualizando perfil para admin con ID: ${adminId}`);

    // Validar que los campos a actualizar no incluyen campos sensibles como `role` (si no deseas que se puedan actualizar)
    const { role, ...updateFields } = req.body;

    // Opcional: Evitar que el rol sea actualizado si no lo deseas
    // delete updateFields.role;

    const updatedAdmin = await User.findByIdAndUpdate(adminId, updateFields, {
      new: true,
      runValidators: true,
    }).select('-password'); // Excluye la contraseña

    if (!updatedAdmin) {
      console.error("Administrador no encontrado");
      return res.status(404).json({ message: "Administrador no encontrado." });
    }

    console.log("Perfil actualizado correctamente:", updatedAdmin);

    // Formatear la fecha de nacimiento para la respuesta si está presente
    const formattedAdmin = {
      username: updatedAdmin.username,
      email: updatedAdmin.email,
      telefono: updatedAdmin.telefono,
      direccion: updatedAdmin.direccion,
      role: updatedAdmin.role,
      nombre: updatedAdmin.nombre,
      apellidoP: updatedAdmin.apellidoP,
      apellidoM: updatedAdmin.apellidoM,
      fechaNacimiento: updatedAdmin.fechaNacimiento ? updatedAdmin.fechaNacimiento.toISOString().split('T')[0] : '',
    };

    res.status(200).json(formattedAdmin);
  } catch (error) {
    console.error("Error al actualizar el perfil del administrador:", error);
    await logError(error, req);
    res.status(500).json({ message: "Error al actualizar el perfil del administrador" });
  }
};
export const getAdminProfile = async (req, res) => {
  try {
      const adminId = req.user.id;
      const admin = await User.findById(adminId).select('-password'); // Excluye la contraseña

      if (!admin) {
          return res.status(404).json({ message: "Administrador no encontrado." });
      }

      // Formatear la fecha de nacimiento si está presente
      const formattedAdmin = {
          username: admin.username,
          email: admin.email,
          telefono: admin.telefono,
          direccion: admin.direccion,
          role: admin.role,
          nombre: admin.nombre,
          apellidoP: admin.apellidoP,
          apellidoM: admin.apellidoM,
          fechaNacimiento: admin.fechaNacimiento ? admin.fechaNacimiento.toISOString().split('T')[0] : '',
      };

      res.status(200).json(formattedAdmin);
  } catch (error) {
      console.error("Error al obtener el perfil del administrador:", error);
      res.status(500).json({ message: "Error al obtener el perfil del administrador." });
  }
};
export const loginIncidencias = async (userId, message, status = 'Activo') => {
  try {
    // Crear una nueva incidencia en la base de datos
    const incidence = new Incidencias({
      userId,
      message,
      status,
    });

    await incidence.save();
    console.log('Incidencia registrada:', incidence);
  } catch (error) {
    console.error('Error al registrar la incidencia:', error);
    throw new Error('No se pudo registrar la incidencia.');
  }
};
