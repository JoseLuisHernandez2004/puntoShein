import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
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
        message: (props) => `${props.value} no es un número de teléfono válido. Debe tener 10 dígitos.`,
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
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    mfaCode: {
      type: String,
    },
  }, {
    timestamps: true,
  });
  
  export default mongoose.model('User', userSchema);
  