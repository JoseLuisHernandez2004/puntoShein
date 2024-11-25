import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MIS_URL } from '../MiVariable';
import { ThemeContext } from '../Style/Tema';

const CompanyProfile = () => {
  const { darkMode } = useContext(ThemeContext); // Obtener el estado del tema
  const [profile, setProfile] = useState({
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    slogan: '',
    logo: '',
    pageTitle: '',
    contactInfo: {
      address: '',
      email: '',
      phone: ''
    },
    identidadEmpresa: {
      mision: '',
      vision: ''
    },
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile`, { withCredentials: true });
        const profileData = response.data;

        setProfile({
          socialMedia: profileData.socialMedia || {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
          },
          slogan: profileData.slogan || '',
          logo: profileData.logo || '',
          pageTitle: profileData.pageTitle || '',
          contactInfo: profileData.contactInfo || {
            address: '',
            email: '',
            phone: ''
          },
          identidadEmpresa: profileData.identidadEmpresa || {
            mision: '',
            vision: ''
          }
        });

        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el perfil de la empresa:', error);
        Swal.fire('Error', 'No se pudo cargar el perfil de la empresa.', 'error');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socialMedia.')) {
      const key = name.split('.')[1];
      setProfile(prevProfile => ({
        ...prevProfile,
        socialMedia: {
          ...prevProfile.socialMedia,
          [key]: value
        }
      }));
    } else if (name.startsWith('contactInfo.')) {
      const key = name.split('.')[1];
      setProfile(prevProfile => ({
        ...prevProfile,
        contactInfo: {
          ...prevProfile.contactInfo,
          [key]: value
        }
      }));
    } else if (name.startsWith('identidadEmpresa.')) {
      const key = name.split('.')[1];
      setProfile(prevProfile => ({
        ...prevProfile,
        identidadEmpresa: {
          ...prevProfile.identidadEmpresa,
          [key]: value
        }
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      // Actualizar los campos del perfil de la empresa
      await axios.put(`${MIS_URL}/api/company-profile`, profile, { withCredentials: true });

      // Si se seleccionó un archivo de logotipo, cargarlo
      if (logoFile) {
        const formData = new FormData();
        formData.append('logo', logoFile);

        await axios.put(`${MIS_URL}/api/company-profile/logo`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      Swal.fire('Éxito', 'Perfil de la empresa actualizado con éxito.', 'success');
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Swal.fire('Error', 'No se pudo actualizar el perfil de la empresa.', 'error');
    }
  };

  if (loading) return <p>Cargando perfil de la empresa...</p>;

  return (
    <div className={`p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-gray-50 to-gray-200'}`}>
      <h2 className={`text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-blue-800'} mb-8`}>Configuración del Perfil de la Empresa</h2>
      {isEditing ? (
        <>
          <label htmlFor="pageTitle" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Título de la empresa</strong>
          </label>
          <input
            type="text"
            name="pageTitle"
            value={profile.pageTitle}
            onChange={handleInputChange}
            placeholder="Título de la Página"
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          {/* Logo Upload */}
          <label htmlFor="logo" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Logotipo</strong>
          </label>
          <input
            type="file"
            name="logo"
            onChange={handleLogoChange}
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          <label htmlFor="slogan" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Slogan</strong>
          </label>
          <input
            type="text"
            name="slogan"
            value={profile.slogan}
            onChange={handleInputChange}
            placeholder="Eslogan"
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          {/* Información de contacto */}
          <label htmlFor="contactInfo.address" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Dirección</strong>
          </label>
          <input
            type="text"
            name="contactInfo.address"
            value={profile.contactInfo.address}
            onChange={handleInputChange}
            placeholder="Dirección"
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          <label htmlFor="contactInfo.phone" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Teléfono</strong>
          </label>
          <input
            type="text"
            name="contactInfo.phone"
            value={profile.contactInfo.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          <label htmlFor="contactInfo.email" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Correo Electrónico</strong>
          </label>
          <input
            type="email"
            name="contactInfo.email"
            value={profile.contactInfo.email}
            onChange={handleInputChange}
            placeholder="Correo Electrónico"
            className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />

          {/* Identidad de la empresa */}
          <label htmlFor="identidadEmpresa.mision" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Misión</strong>
          </label>
          <textarea
            id="identidadEmpresa.mision"
            name="identidadEmpresa.mision"
            value={profile.identidadEmpresa.mision}
            onChange={handleInputChange}
            placeholder="Escribe aquí la misión de la empresa..."
            className={`p-2 border rounded mb-4 w-full h-24 resize-none ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            maxLength={500}
          />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.identidadEmpresa.mision.length}/500 caracteres</p>

          <label htmlFor="identidadEmpresa.vision" className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            <strong>Visión</strong>
          </label>
          <textarea
            id="identidadEmpresa.vision"
            name="identidadEmpresa.vision"
            value={profile.identidadEmpresa.vision}
            onChange={handleInputChange}
            placeholder="Escribe aquí la visión de la empresa..."
            className={`p-2 border rounded mb-4 w-full h-24 resize-none ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            maxLength={500}
          />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{profile.identidadEmpresa.vision.length}/500 caracteres</p>

          {/* Redes Sociales */}
          {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
            <div key={platform}>
              <label htmlFor={`socialMedia.${platform}`} className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}</strong>
              </label>
              <input
                type="text"
                name={`socialMedia.${platform}`}
                value={profile.socialMedia[platform]}
                onChange={handleInputChange}
                placeholder={platform.charAt(0).toUpperCase() + platform.slice(1)}
                className={`p-2 border rounded mb-4 w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
              />
            </div>
          ))}

          <button onClick={handleSave} className={`px-4 py-2 bg-green-600 text-white rounded mr-2 ${darkMode ? 'hover:bg-green-700' : 'hover:bg-green-500'}`}>Guardar</button>
          <button onClick={() => setIsEditing(false)} className={`px-4 py-2 bg-red-600 text-white rounded ${darkMode ? 'hover:bg-red-700' : 'hover:bg-red-500'}`}>Cancelar</button>
        </>
      ) : (
        <>
          {profile.logo && (
            <img
              src={profile.logo}
              alt="Logotipo de la Empresa"
              className="h-20 w-20 object-cover mb-4 rounded-full border"
            />
          )}
          <p><strong>Título de la Página:</strong> {profile.pageTitle}</p>
          <p><strong>Eslogan:</strong> {profile.slogan}</p>
          <p><strong>Dirección:</strong> {profile.contactInfo?.address}</p>
          <p><strong>Teléfono:</strong> {profile.contactInfo?.phone}</p>
          <p><strong>Correo Electrónico:</strong> {profile.contactInfo?.email}</p>
          <p><strong>Misión:</strong> {profile.identidadEmpresa?.mision}</p>
          <p><strong>Visión:</strong> {profile.identidadEmpresa?.vision}</p>
          <p><strong>Facebook:</strong> {profile.socialMedia?.facebook}</p>
          <p><strong>Twitter:</strong> {profile.socialMedia?.twitter}</p>
          <p><strong>Instagram:</strong> {profile.socialMedia?.instagram}</p>
          <p><strong>LinkedIn:</strong> {profile.socialMedia?.linkedin}</p>
          
          <button onClick={() => setIsEditing(true)} className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-500'}`}>Editar Perfil</button>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
