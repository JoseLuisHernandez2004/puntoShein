import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from './MiVariable';

const CompanyPublicProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile/public`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el perfil de la empresa:', error);
        setLoading(false);
      }
    };
  
    fetchCompanyProfile();
  }, []);
  

  if (loading) return <p>Cargando información de la empresa...</p>;
  if (!profile) return <p>No se pudo cargar la información de la empresa.</p>;

  return (
    <div className="p-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{profile.pageTitle}</h2>
      {profile.logo && (
        <img
          src={`${MIS_URL}/${profile.logo}`} // Ajusta la ruta para acceder correctamente al logo
          alt="Logotipo de la Empresa"
          className="w-32 h-32 object-cover mb-4"
        />
      )}
      <p className="text-xl italic mb-4">"{profile.slogan}"</p>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Información de Contacto</h3>
        <p><strong>Dirección:</strong> {profile.contactInfo?.address || 'No disponible'}</p>
        <p><strong>Teléfono:</strong> {profile.contactInfo?.phone || 'No disponible'}</p>
        <p><strong>Correo Electrónico:</strong> {profile.contactInfo?.email || 'No disponible'}</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Síguenos en Redes Sociales</h3>
        {profile.socialMedia ? (
          <ul className="list-disc pl-6">
            {profile.socialMedia.facebook && <li><a href={profile.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a></li>}
            {profile.socialMedia.twitter && <li><a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a></li>}
            {profile.socialMedia.instagram && <li><a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a></li>}
            {profile.socialMedia.linkedin && <li><a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></li>}
          </ul>
        ) : (
          <p>No hay redes sociales disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyPublicProfile;
