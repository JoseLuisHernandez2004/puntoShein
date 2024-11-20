import CompanyProfile from '../models/companyProfile.model.js';

// Obtener la configuración del perfil de la empresa
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

// Actualizar la configuración del perfil de la empresa
export const updateCompanyProfile = async (req, res) => {
  try {
    const { socialMedia, slogan, pageTitle, contactInfo } = req.body;

    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      {},
      { socialMedia, slogan, pageTitle, contactInfo },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error al actualizar el perfil de la empresa:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil de la empresa.' });
  }
};

// Subir el logo de la empresa
export const uploadLogo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha proporcionado un archivo de logo.' });
  }

  try {
    const updatedProfile = await CompanyProfile.findOneAndUpdate(
      {},
      { logo: req.file.path },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error al subir el logo de la empresa:', error);
    res.status(500).json({ message: 'Error al subir el logo de la empresa.' });
  }
};
