import mongoose from "mongoose";    

//Esquema de la base de datos de REGISTRO
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    nombre:{
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
          validator: function(v) {
            return /^\d{10}$/.test(v.toString());  // Convierte el número a string y valida que tenga exactamente 10 dígitos
          },
          message: props => `${props.value} no es un número de teléfono válido. Debe tener 10 dígitos.`
        }
    },
    
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, introduce un correo electrónico válido.']
    },
    password: {
        type: String,
        required: true,
    },
    // Campo para registrar la última vez que se cambió la contraseña
    passwordChangedAt: {
        type: Date,
    },

    /* Bloqueo de cuanto por varios intentos */
    loginAttempts: {
        type: Number,
        default: 0, // Inicia en 0
    },
      lockUntil: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Solo puede ser 'user' o 'admin'
        default: 'user', // Por defecto, los nuevos usuarios serán 'user'
    },
    mfaCode: {
        type: String,
    },
},{
    timestamps:true
})


export default mongoose.model('User', userSchema) 