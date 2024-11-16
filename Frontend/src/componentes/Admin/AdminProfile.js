import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MIS_URL } from "../MiVariable";
import Swal from 'sweetalert2';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para el modo edición
  const [formData, setFormData] = useState({}); // Estado para el formulario de edición

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${MIS_URL}/api/admin/profile`, { withCredentials: true });
        setAdminData(response.data);
        setFormData(response.data); // Inicializar el estado del formulario con los datos del admin
        setLoading(false);
      } catch (error) {
        setError('Error al obtener los datos del administrador.');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Actualizar el estado del formulario cuando cambia un campo
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${MIS_URL}/api/admin/profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setAdminData(formData); // Actualizar los datos del administrador
        setIsEditing(false); // Salir del modo edición
        Swal.fire('Éxito', 'Perfil actualizado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Perfil de Administrador</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Dirección:</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Rol:</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200"
              />
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {adminData.username}</p>
            <p><strong>Email:</strong> {adminData.email}</p>
            <p><strong>Teléfono:</strong> {adminData.telefono}</p>
            <p><strong>Dirección:</strong> {adminData.direccion}</p>
            <p><strong>Rol:</strong> {adminData.role}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Editar Perfil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
