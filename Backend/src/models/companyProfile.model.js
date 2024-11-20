import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
  socialMedia: {
    facebook: { type: String, validate: { validator: validateURL, message: 'URL no válida' } },
    twitter: { type: String, validate: { validator: validateURL, message: 'URL no válida' } },
    instagram: { type: String, validate: { validator: validateURL, message: 'URL no válida' } },
    linkedin: { type: String, validate: { validator: validateURL, message: 'URL no válida' } },
  },
  slogan: {
    type: String,
    maxlength: 100,
    trim: true,
  },
  logo: {
    type: String, // Ruta del archivo del logo subido
  },
  pageTitle: {
    type: String,
    maxlength: 50,
    trim: true,
  },
  contactInfo: {
    address: { type: String },
    email: { type: String, validate: { validator: validateEmail, message: 'Correo no válido' } },
    phone: { type: String, validate: { validator: validatePhone, message: 'Teléfono no válido' } },
  },
}, {
  timestamps: true,
});

function validateURL(url) {
  const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
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

export default mongoose.model('CompanyProfile', companyProfileSchema);
