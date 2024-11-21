import { v2 as cloudinary } from 'cloudinary';
import CompanyProfile from '../models/companyProfile.model.js';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Obtener la configuración completa del perfil de la empresa (solo para administradores)
export const getCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'No se ha configurado el perfil de la empresa.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error al obtener el perfil de la empresa:', error);
    res.status(500).json({ message: 'Error al obtener el perfil de la empresa.' });
  }
};

// Actualizar la configuración del perfil de la empresa (solo para administradores)
export const updateCompanyProfile = async (req, res) => {
  try {
    const { socialMedia, slogan, pageTitle, contactInfo, identidadEmpresa,logo } = req.body;

    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      {},
      { socialMedia, slogan, pageTitle, contactInfo, identidadEmpresa, logo },
      { new: true, upsert: true } // Crea el documento si no existe
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error al actualizar el perfil de la empresa:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil de la empresa.' });
  }
};

// Subir el logo de la empresa (solo para administradores)
export const uploadLogo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha proporcionado un archivo de logo.' });
  }

  try {
    // Subir el archivo a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log('Archivo recibido:', req.file);

    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      {},
      { logo: result.secure_url }, // Guardar la URL del logo en la base de datos
      { new: true, upsert: true } // Crea el documento si no existe
    );
    

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error al subir el logo de la empresa:', error);
    res.status(500).json({ message: 'Error al subir el logo de la empresa.' });
  }
};

// Obtener la información pública del perfil de la empresa (disponible para todos)
export const getPublicCompanyProfile = async (req, res) => {
  try {
    // Aquí solo devolvemos la información que es pública
    const profile = await CompanyProfile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'No se encontró el perfil de la empresa.' });
    }

    // Filtramos la información para que solo la parte pública sea devuelta
    const publicProfile = {
      pageTitle: profile.pageTitle,
      slogan: profile.slogan,
      contactInfo: profile.contactInfo,
      socialMedia: profile.socialMedia,
      identidadEmpresa: profile.identidadEmpresa,
      logo: profile.logo,
    };

    res.status(200).json(publicProfile);
  } catch (error) {
    console.error('Error al obtener el perfil público de la empresa:', error);
    res.status(500).json({ message: 'Error al obtener el perfil público de la empresa.' });
  }
};
