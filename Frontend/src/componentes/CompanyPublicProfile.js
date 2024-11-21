import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importación de íconos

const CompanyPublicProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error al cargar el perfil de la empresa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="loader"></div> {/* Spinner visual (puedes definir un CSS para el loader) */}
      </div>
    );
  }

  if (!profile) {
    return <p className="text-center text-lg text-red-500 mt-20">No se pudo cargar la información de la empresa.</p>;
  }

  return (
    <div className="container mx-auto mt-16 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg text-gray-800">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-6">{profile.pageTitle}</h2>
        {profile.logo ? (
          <img
            src={`${MIS_URL}/${profile.logo}`}
            alt="Logotipo de la Empresa"
            className="w-40 h-40 md:w-48 md:h-48 object-cover mb-4 rounded-full border-4 border-blue-300 shadow-md transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-300 mb-4 rounded-full border-4 border-gray-200 shadow-md flex items-center justify-center">
            <span className="text-xl text-gray-500">Logo</span>
          </div>
        )}
        <p className="text-2xl font-light italic text-gray-600">"{profile.slogan}"</p>
      </div>

      {/* Información de Contacto */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow-md border-2 border-gray-300">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">Información de Contacto</h3>
        <div className="text-lg text-gray-700 space-y-3">
          <p><strong>Dirección:</strong> {profile.contactInfo?.address || 'No disponible'}</p>
          <p><strong>Teléfono:</strong> {profile.contactInfo?.phone || 'No disponible'}</p>
          <p><strong>Correo Electrónico:</strong> {profile.contactInfo?.email || 'No disponible'}</p>
        </div>
      </div>

      {/* Identidad de la Empresa */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow-md border-2 border-gray-300">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">Identidad de la Empresa</h3>
        <div className="text-lg text-gray-700 space-y-3">
          <p><strong>Misión:</strong> {profile.identidadEmpresa?.mision || 'No disponible'}</p>
          <p><strong>Visión:</strong> {profile.identidadEmpresa?.vision || 'No disponible'}</p>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mb-10 p-6 bg-white rounded-lg shadow-md border-2 border-gray-300">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-6">Síguenos en Redes Sociales</h3>
        {profile.socialMedia ? (
          <div className="flex justify-center flex-wrap gap-8 text-xl">
            {profile.socialMedia.facebook && (
              <a
                href={profile.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <FaFacebook className="text-3xl" />
                <span>Facebook</span>
              </a>
            )}
            {profile.socialMedia.twitter && (
              <a
                href={profile.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition duration-300"
              >
                <FaTwitter className="text-3xl" />
                <span>Twitter</span>
              </a>
            )}
            {profile.socialMedia.instagram && (
              <a
                href={profile.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition duration-300"
              >
                <FaInstagram className="text-3xl" />
                <span>Instagram</span>
              </a>
            )}
            {profile.socialMedia.linkedin && (
              <a
                href={profile.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition duration-300"
              >
                <FaLinkedin className="text-3xl" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay redes sociales disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyPublicProfile;
