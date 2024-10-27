import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";
const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);  // Añadir estado de carga
  const [error, setError] = useState(null);      // Añadir estado de error

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/admin/profile`, { withCredentials: true });
        setAdminData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos del administrador.');
        setLoading(false);
      }
    };

    fetchAdminData();
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
      <h1 className="text-4xl font-bold">Perfil de Administrador</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <p><strong>Nombre:</strong> {adminData.username}</p>
        <p><strong>Email:</strong> {adminData.email}</p>
        <p><strong>Rol:</strong> {adminData.role}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
