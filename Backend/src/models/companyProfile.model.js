import mongoose from 'mongoose';

// Funciones de validación
function validateURL(url) {
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/; // Ejemplo: teléfono con 10 dígitos
  return phoneRegex.test(phone);
}

// Definición del esquema de perfil de la empresa
const companyProfileSchema = new mongoose.Schema({
  socialMedia: {
    facebook: { type: String, validate: { validator: validateURL, message: 'URL no válida' }, required: false },
    twitter: { type: String, validate: { validator: validateURL, message: 'URL no válida' }, required: false },
    instagram: { type: String, validate: { validator: validateURL, message: 'URL no válida' }, required: false },
    linkedin: { type: String, validate: { validator: validateURL, message: 'URL no válida' }, required: false },
  },
  slogan: {
    type: String,
    maxlength: 100,
    trim: true,
    required: false,
  },
  logo: {
    type: String, // Ruta del archivo del logo subido
    required: false,
  },
  pageTitle: {
    type: String,
    maxlength: 50,
    trim: true,
    required: false,
  },
  contactInfo: {
    address: { type: String, required: false },
    email: { type: String, validate: { validator: validateEmail, message: 'Correo no válido' }, required: false },
    phone: { type: String, validate: { validator: validatePhone, message: 'Teléfono no válido' }, required: false },
  },
}, {
  timestamps: true,
});

export default mongoose.model('CompanyProfile', companyProfileSchema);
