import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MIS_URL } from '../MiVariable';
import Swal from 'sweetalert2';

const CompanyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/company-profile`, { withCredentials: true });
        setProfile(response.data);
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
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
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
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Nombre de la Empresa"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            placeholder="Dirección"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            placeholder="Teléfono"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            placeholder="Correo Electrónico"
            className="p-2 border rounded mb-4 w-full"
          />
          <textarea
            name="description"
            value={profile.description}
            onChange={handleInputChange}
            placeholder="Descripción de la Empresa"
            className="p-2 border rounded mb-4 w-full"
          />
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded mr-2">Guardar</button>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-600 text-white rounded">Cancelar</button>
        </>
      ) : (
        <>
          <p><strong>Nombre:</strong> {profile.name}</p>
          <p><strong>Dirección:</strong> {profile.address}</p>
          <p><strong>Teléfono:</strong> {profile.phone}</p>
          <p><strong>Correo Electrónico:</strong> {profile.email}</p>
          <p><strong>Descripción:</strong> {profile.description}</p>
          <button onClick={() => setIsEditing(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Editar Perfil</button>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
