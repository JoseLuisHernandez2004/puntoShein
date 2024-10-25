import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
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

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p><strong>Nombre:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Rol:</strong> {userData.role}</p>
    </div>
  );
};

export default UserProfile;
