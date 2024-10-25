import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">¡Bienvenido a tu panel de usuario!</h1>
      <p className="text-lg mt-4">Aquí puedes gestionar tu cuenta, ver pedidos y mucho más.</p>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Información del perfil</h2>
        <p><strong>Nombre:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Rol:</strong> {userData.role}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
