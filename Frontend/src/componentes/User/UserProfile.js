import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadir estado de carga
  const [error, setError] = useState(null);      // Añadir estado de error

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Se corrigió el problema de la URL (se eliminó el espacio en el endpoint
        const response = await axios.get('https://puntoshein.onrender.com/api/profile', { withCredentials: true });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos del usuario.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando perfil...</p>
        <div style={{ marginBottom: '20px' }} /> {/* Espacio adicional */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
        <div style={{ marginBottom: '20px' }} /> {/* Espacio adicional */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Perfil de Usuario</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <p><strong>Nombre:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Rol:</strong> {userData.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;
