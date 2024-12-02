import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellidoP: {
      type: String,
      required: true,
      trim: true,
    },
    apellidoM: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v.toString());
        },
        message: (props) => `${props.value} no es un número de teléfono válido.`,
      },
    },
    direccion: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor, introduce un correo electrónico válido.'],
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0, // Contador de intentos fallidos
    },
    lockUntil: {
      type: Date, // Fecha y hora hasta la cual el usuario está temporalmente bloqueado
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    mfaCode: {
      type: String, // Código MFA temporal generado durante el login
    },
    isBlocked: {
      type: Boolean,
      default: false, // Indica si el usuario está bloqueado permanentemente
    },
    mfaCodeExpires: {
      type: Date, // Expiración del código MFA
    },
  },
  {
    timestamps: true, // Para registrar creación y actualizaciones
  }
);

export default mongoose.model('User', userSchema);
