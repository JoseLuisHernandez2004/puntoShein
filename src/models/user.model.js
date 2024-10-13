import mongoose from "mongoose";    

//Esquema de la base de datos de REGISTRO
const userSchema = mongoose.Schema({


    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}
)

export default mongoose.model('user', userSchema)