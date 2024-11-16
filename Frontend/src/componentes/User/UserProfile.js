import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/profile`, { withCredentials: true });
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
        <div style={{ marginBottom: '20px' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
        <div style={{ marginBottom: '20px' }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold text-gray-800">Perfil de Usuario</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <p><strong>Nombre:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
