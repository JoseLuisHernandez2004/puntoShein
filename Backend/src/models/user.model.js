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

    /* Bloqueo de cuanto por varios intentos */
    loginAttempts: {
        type: Number,
        default: 0, // Inicia en 0
      },
      lockUntil: {
        type: Date,
      },
    
},{
    timestamps:true
})

export default mongoose.model('user', userSchema) 