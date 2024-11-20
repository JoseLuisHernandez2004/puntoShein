import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';
import Swal from 'sweetalert2';

const CompanyProfile = () => {
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
    }
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile`, { withCredentials: true });
        const profileData = response.data;

        // Asegúrate de que todos los campos estén inicializados incluso si no vienen en la respuesta
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

    // Manejar campos anidados
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
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${MIS_URL}/api/company-profile`, profile, { withCredentials: true });
      Swal.fire('Éxito', 'Perfil de la empresa actualizado con éxito.', 'success');
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Swal.fire('Error', 'No se pudo actualizar el perfil de la empresa.', 'error');
    }
  };

  if (loading) return <p>Cargando perfil de la empresa...</p>;

  return (
    <div className="p-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Configuración del Perfil de la Empresa</h2>
      {isEditing ? (
        <>
          <input
            type="text"
            name="pageTitle"
            value={profile.pageTitle}
            onChange={handleInputChange}
            placeholder="Título de la Página"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="slogan"
            value={profile.slogan}
            onChange={handleInputChange}
            placeholder="Eslogan"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="contactInfo.address"
            value={profile.contactInfo.address}
            onChange={handleInputChange}
            placeholder="Dirección"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="contactInfo.phone"
            value={profile.contactInfo.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="email"
            name="contactInfo.email"
            value={profile.contactInfo.email}
            onChange={handleInputChange}
            placeholder="Correo Electrónico"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="socialMedia.facebook"
            value={profile.socialMedia.facebook}
            onChange={handleInputChange}
            placeholder="Facebook"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="socialMedia.twitter"
            value={profile.socialMedia.twitter}
            onChange={handleInputChange}
            placeholder="Twitter"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="socialMedia.instagram"
            value={profile.socialMedia.instagram}
            onChange={handleInputChange}
            placeholder="Instagram"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="socialMedia.linkedin"
            value={profile.socialMedia.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn"
            className="p-2 border rounded mb-4 w-full"
          />
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded mr-2">Guardar</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-600 text-white rounded">Cancelar</button>
        </>
      ) : (
        <>
          <p><strong>Título de la Página:</strong> {profile.pageTitle}</p>
          <p><strong>Eslogan:</strong> {profile.slogan}</p>
          <p><strong>Dirección:</strong> {profile.contactInfo?.address}</p>
          <p><strong>Teléfono:</strong> {profile.contactInfo?.phone}</p>
          <p><strong>Correo Electrónico:</strong> {profile.contactInfo?.email}</p>
          <p><strong>Facebook:</strong> {profile.socialMedia?.facebook}</p>
          <p><strong>Twitter:</strong> {profile.socialMedia?.twitter}</p>
          <p><strong>Instagram:</strong> {profile.socialMedia?.instagram}</p>
          <p><strong>LinkedIn:</strong> {profile.socialMedia?.linkedin}</p>
          <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Editar Perfil</button>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
