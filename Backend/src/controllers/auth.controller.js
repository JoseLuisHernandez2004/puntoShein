import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const { email, password, username, nombre, apellidoM, apellidoP, telefono } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
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
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Crear un token de acceso
    const token = await createAccessToken({ id: userFound._id });

    // Configurar una cookie con el token
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Responder con los detalles del usuario
    res.json({
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

    // Usar TOKEN_SECRET para firmar el token
    const resetToken = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: '1h' });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Variables de entorno para email
        pass: process.env.EMAIL_PASS,  
      },
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


export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar la nueva contraseña (ejemplo: longitud mínima)
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    // Hashear la nueva contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    user.password = passwordHash;
    await user.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al restablecer la contraseña: " + error.message });
  }
};