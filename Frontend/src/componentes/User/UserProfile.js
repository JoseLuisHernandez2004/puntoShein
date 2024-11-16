import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";
import Swal from 'sweetalert2';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${MIS_URL}/api/profile`,
        {
          nombre: userData.nombre,
          apellidoP: userData.apellidoP,
          apellidoM: userData.apellidoM,
          telefono: userData.telefono,
          direccion: userData.direccion,
          fechaNacimiento: userData.fechaNacimiento,
        },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        Swal.fire('Éxito', 'Perfil actualizado correctamente', 'success');
        setIsEditing(false);
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
    }
  };

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
      <h1 className="text-4xl font-bold text-gray-800">Mi Perfil</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-96">
        {!isEditing ? (
          <>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {userData.apellidoP}</p>
            <p><strong>Apellido Materno:</strong> {userData.apellidoM}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.telefono}</p>
            <p><strong>Dirección:</strong> {userData.direccion}</p>
            <p><strong>Fecha de nacimiento:</strong> {userData.fechaNacimiento}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar Perfil
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={userData.nombre || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Apellido Paterno:</label>
              <input
                type="text"
                name="apellidoP"
                value={userData.apellidoP || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Apellido Materno:</label>
              <input
                type="text"
                name="apellidoM"
                value={userData.apellidoM || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={userData.telefono || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={userData.direccion || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={userData.fechaNacimiento || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-lg"
              />
            </div>
            <button
              onClick={handleSaveChanges}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
